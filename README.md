# Power AI – Intelligent Business Intelligence Suite

Power AI (formerly DataLeap Suite) is a high-performance, AI-driven business intelligence platform that transforms raw data into actionable insights instantly. By leveraging advanced Machine Learning and Large Language Models, Power AI automates the complex process of data schema analysis, KPI identification, and interactive dashboard generation.

---

## Technical Architecture

The platform is designed as a modular monorepo, separating core concerns into a high-performance backend and a pixel-perfect frontend.

- **Frontend**: A high-fidelity React application built with Vite and Tailwind CSS. It features a custom-built dashboard engine capable of rendering real-time KPIs, Bar Charts, Line Graphs, and Pie Charts with dynamic filtering.
- **Backend**: A robust Express.js server that acts as the intelligence hub, coordinating requests between the OpenAI API and the client-side application.
- **Data Persistence**: Fully integrated with Supabase for secure multi-tenant authentication and dashboard configuration persistence.

---

## Core Features

### 1. Zero-Config Data Ingestion
Drop any CSV or Excel file into the platform. Power AI handles the heavy lifting of parsing, cleaning, and extracting your data's DNA—even with complex, multi-sheet workbooks.

### 2. Autonomous Schema Analysis
The backend executes deep-context analysis of your data's cardinality, data types, and statistical properties. It doesn't just read columns; it understands the *relationships* between your business metrics.

### 3. AI-Driven Dashboard Synthesis
Instead of building charts manually, Power AI's "Synthesis Engine" generates optimal visualization layouts based on your data's unique structure. It identifies the most relevant KPIs and chooses the best chart types to represent your trends.

### 4. Interactive Intelligence
Once a dashboard is generated, it's fully interactive. Filter by region, category, or time-frame, and watch the entire AI-generated landscape react in real-time.

---

## Technology Stack

### Frontend Essentials
- **React 18 & Vite**: For ultra-fast development and optimized production bundles.
- **Tailwind CSS**: For a refined, modern design system using variable-based tokens.
- **Lucide React**: For high-clarity, crisp iconography.
- **Recharts / Custom Charting**: For high-performance data visualization.

### Backend Intelligence
- **Node.js & Express**: Handling the orchestration layer.
- **OpenAI GPT-4**: Powering the schema analysis and layout configuration logic.
- **Supabase SDK**: Managing authentication and Postgres-based configuration storage.
- **SheetJS (XLSX)**: For robust client-side and server-side workbook parsing.

---

## Infrastructure & Environment

To run this platform, you must configure the following environmental variables:

### Frontend (`/app/frontend/.env`)
- `VITE_SUPABASE_URL`: Your Supabase Project URL.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase Anonymous Key.
- `VITE_API_BASE_URL`: Pointer to the Intelligence Backend (default `http://localhost:5000`).

### Backend (`/app/backend/.env`)
- `OPENAI_API_KEY`: Required for schema analysis and AI layout generation.
- `SUPABASE_URL`: For backend database synchronization.
- `SUPABASE_ANON_KEY`: For backend-side database access.

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Build & Installation
Install all dependencies across the monorepo using the master script:
```bash
cd app
npm run install:all
```

### 2. Launch Development Suite
Run both the frontend and the intelligence backend concurrently:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## Project Structure

```text
PowerBI/
├── app/
│   ├── frontend/             # High-fidelity React application
│   │   ├── src/components/   # Modular UI architecture
│   │   └── src/pages/        # Dashboard and Auth views
│   ├── backend/              # Intelligence orchestration server
│   │   ├── routes/           # AI and Data endpoints
│   │   └── services/         # OpenAI and Supabase integrations
│   └── package.json          # Master monorepo configuration
│
└── .gitignore                # Optimized repository exclusion list
```

---

## Security & Reliability

Power AI implements enterprise-grade security through **Supabase Auth**, ensuring that every dashboard is private and tied to a unique user session. All AI-driven analysis is handled via secure API gateways with strict validation of input data to ensure integrity and performance.
