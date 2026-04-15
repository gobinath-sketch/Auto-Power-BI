const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAiInsight(question, dataContext) {
  const systemPrompt = `You are an expert data analyst assistant for Power AI, a data analytics platform. 
You analyze data and provide clear, structured, professional insights.

When answering:
- Be concise and direct
- Use bullet points for clarity
- Provide specific numbers from the data
- Explain WHY patterns exist
- Suggest actionable next steps
- Never use emojis or decorative symbols
- Keep responses under 200 words

Data context provided by the user will include column names, sample data, and statistics.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Here is the data context:\n${dataContext}\n\nUser question: ${question}` },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
}

async function analyzeSchema(schemaPayload) {
  const systemPrompt = `You are a data analysis expert. Given column names, data types, and sample rows from a dataset, return a JSON object with exactly these fields:

{
  "domain": "string — what kind of data this is (e.g. sales, HR, inventory, finance, marketing, logistics)",
  "time_column": "string or null — the column that represents time or date, if any",
  "kpi_columns": ["array of numeric column names worth showing as top-level KPI cards"],
  "dimensions": ["array of categorical column names good for grouping and filtering"],
  "chart_recommendations": [
    {
      "chart_type": "bar | line | donut | area | scatter | funnel | horizontal_bar",
      "x_column": "column name",
      "y_column": "column name",
      "title": "human readable chart title",
      "reasoning": "one sentence why this chart fits this data"
    }
  ],
  "filter_columns": ["columns that should appear as global filter buttons"],
  "summary": "2-3 sentence plain English summary of what this dataset contains"
}

Return JSON only. No markdown. No explanation outside the JSON.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // using gpt-4o for better schema understanding
      response_format: { type: "json_object" },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(schemaPayload, null, 2) }
      ],
      max_tokens: 1500,
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error('analyzeSchema error:', err);
    throw err;
  }
}

async function generateDashboardConfig(schemaAnalysis) {
  const systemPrompt = `You are a dashboard design expert. Given this schema analysis JSON, generate a dashboard layout config.

Return a JSON object with exactly these fields:

{
  "kpis": [
    {
      "label": "human readable label",
      "column": "source column name",
      "aggregation": "sum | avg | max | min | count",
      "format": "currency | percentage | number"
    }
  ],
  "charts": [
    {
      "id": "unique string id",
      "type": "bar | line | donut | area | scatter | funnel | horizontal_bar",
      "title": "chart title",
      "x_column": "column name",
      "y_column": "column name",
      "aggregation": "sum | avg | count | max | min",
      "color_scheme": "emerald | neutral | warm",
      "width": "half | full",
      "height": "small | medium"
    }
  ],
  "filters": [
    {
      "column": "column name",
      "type": "time | category",
      "label": "display label"
    }
  ]
}

Rules:
- Maximum 4 KPI cards
- Maximum 6 charts
- All charts must fit in a single screen with no vertical scrolling
- Assign width and height so charts fill the grid perfectly
- Use the actual column names from the schema, never invent column names
- Return JSON only. No markdown. No explanation.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // using gpt-4o for complex JSON output structure
      response_format: { type: "json_object" },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(schemaAnalysis, null, 2) }
      ],
      max_tokens: 1500,
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error('generateDashboardConfig error:', err);
    throw err;
  }
}

module.exports = {
  getAiInsight,
  analyzeSchema,
  generateDashboardConfig
};
