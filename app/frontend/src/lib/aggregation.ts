/**
 * Dynamic data aggregation engine to power dashboards.
 */

export interface ChartConfig {
  x_column: string;
  y_column: string;
  aggregation: "sum" | "avg" | "count" | "max" | "min";
  [key: string]: any;
}

export interface KpiConfig {
  column: string;
  aggregation: "sum" | "avg" | "max" | "min" | "count";
  format?: string;
  [key: string]: any;
}

export function aggregateData(
  rawRows: any[][],
  columns: string[],
  config: ChartConfig,
  activeFilters: Record<string, string>
) {
  // 1. Filter rows
  const filteredRows = applyFilters(rawRows, columns, activeFilters);

  // 2. Map indices
  const xIndex = columns.indexOf(config.x_column);
  const yIndex = columns.indexOf(config.y_column);

  if (xIndex === -1 && config.aggregation !== "count") return [];
  
  // If count, and no yIndex found, we might still count rows by xIndex
  if (xIndex === -1) return [];

  // 3. Group and aggregate
  const groups: Record<string, number[]> = {};

  for (const row of filteredRows) {
    const xVal = row[xIndex] ?? "Unknown";
    const xKey = String(xVal).trim() === "" ? "Unknown" : String(xVal);
    
    let yVal = 1;
    if (yIndex !== -1 && config.aggregation !== "count") {
      yVal = Number(row[yIndex]);
      if (isNaN(yVal)) continue; // Skip invalid numbers for sum/avg/max/min
    }
    
    if (!groups[xKey]) {
      groups[xKey] = [];
    }
    
    groups[xKey].push(yVal);
  }

  // 4. Reduce
  const result = Object.entries(groups).map(([name, values]) => {
    let value = 0;
    if (values.length > 0) {
      if (config.aggregation === "sum") value = values.reduce((a, b) => a + b, 0);
      if (config.aggregation === "avg") value = values.reduce((a, b) => a + b, 0) / values.length;
      if (config.aggregation === "max") value = Math.max(...values);
      if (config.aggregation === "min") value = Math.min(...values);
      if (config.aggregation === "count") value = values.length;
    }

    return { name, value: Number(value.toFixed(2)) };
  });

  return result;
}

export function computeKpi(
  rawRows: any[][],
  columns: string[],
  config: KpiConfig,
  activeFilters: Record<string, string>
) {
  const filteredRows = applyFilters(rawRows, columns, activeFilters);
  const colIndex = columns.indexOf(config.column);

  if (colIndex === -1 && config.aggregation !== "count") return 0;

  const values: number[] = [];
  for (const row of filteredRows) {
    let val = 1;
    if (colIndex !== -1 && config.aggregation !== "count") {
      val = Number(row[colIndex]);
      if (isNaN(val)) continue;
    }
    values.push(val);
  }

  if (values.length === 0) return 0;

  let value = 0;
  if (config.aggregation === "sum") value = values.reduce((a, b) => a + b, 0);
  if (config.aggregation === "avg") value = values.reduce((a, b) => a + b, 0) / values.length;
  if (config.aggregation === "max") value = Math.max(...values);
  if (config.aggregation === "min") value = Math.min(...values);
  if (config.aggregation === "count") value = values.length;

  return Number(value.toFixed(2));
}

export function applyFilters(rawRows: any[][], columns: string[], activeFilters: Record<string, string>) {
  if (!activeFilters || Object.keys(activeFilters).length === 0) return rawRows;

  return rawRows.filter(row => {
    for (const [colName, expectedVal] of Object.entries(activeFilters)) {
      if (expectedVal === "all" || !expectedVal) continue;
      const colIdx = columns.indexOf(colName);
      if (colIdx === -1) continue;
      
      const val = row[colIdx];
      if (String(val) !== String(expectedVal)) {
        return false;
      }
    }
    return true;
  });
}
