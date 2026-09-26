# DataPilot

### Agentic Data Analysis, Built for the Modern Data Workflow

DataPilot is an **AI-powered data analysis platform** that allows users to explore, analyze, and understand structured datasets using natural language.

Upload a dataset, ask a question, and let DataPilot determine the appropriate analysis, execute the required tools, and present the results through an interactive interface.

<p align="center">

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square\&logo=python\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square\&logo=fastapi\&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=flat-square\&logo=vite\&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-LLM-4285F4?style=flat-square\&logo=google\&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)

</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a>
</p>

---

## About

Data analysis traditionally requires users to work across multiple tools for data manipulation, statistical analysis, visualization, and machine learning.

DataPilot brings these workflows together through an **LLM-powered agent**.

Instead of manually writing analysis code, users can interact with their datasets using natural language.

For example:

> **"Which variables are most strongly associated with 30-day ED visits?"**

DataPilot can determine the appropriate analytical workflow, select the required tools, execute the analysis, and explain the resulting findings.

The core design principle is a separation between **LLM-driven orchestration** and **deterministic computation**.

The LLM determines:

> **What needs to be done?**

Backend tools perform:

> **The actual computation.**

---

## Features

### Dataset Exploration

DataPilot provides tools for exploring structured datasets, including:

* CSV and Excel support
* Dataset inspection
* Column and data-type detection
* Missing-value analysis
* Descriptive statistics
* Unique-value analysis
* Basic data-quality checks

### Natural Language Analysis

Users can ask questions about their data without manually writing Python or SQL.

Examples:

```text
Give me an overview of this dataset.

Which columns contain missing values?

What are the strongest correlations?

Compare ED visit rates across age groups.

Which variables are associated with the target?
```

### LLM Agent

The agent is responsible for understanding the user's request and determining how the request should be handled.

It can:

* Understand natural-language requests
* Determine required analysis
* Select appropriate tools
* Execute multi-step workflows
* Interpret tool results
* Generate a user-facing response

### Data Analysis Tools

The agent interacts with controlled backend tools rather than directly manipulating the environment.

Example tools:

```python
inspect_dataset()

get_column_metadata()

analyze_missing_values()

calculate_statistics()

calculate_correlation()

run_hypothesis_test()

create_visualization()
```

### Visualization

DataPilot can generate visualizations to support analytical results, including:

* Histograms
* Box plots
* Bar charts
* Scatter plots
* Correlation heatmaps

### Machine Learning

The platform is designed to support machine-learning workflows such as:

* Data preprocessing
* Model training
* Model evaluation
* Feature importance
* Classification analysis
* Error analysis

---

## Architecture

DataPilot follows a client-server architecture with an LLM agent responsible for analysis orchestration.

```text
                         ┌─────────────────────┐
                         │      React UI       │
                         │       Vite          │
                         └──────────┬──────────┘
                                    │
                              REST / WebSocket
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       FastAPI       │
                         │       Backend       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      LLM Agent      │
                         │                     │
                         │  Request Analysis   │
                         │  Planning           │
                         │  Tool Selection     │
                         │  Interpretation     │
                         └──────────┬──────────┘
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                         ▼                     ▼
                 ┌───────────────┐     ┌───────────────┐
                 │    Gemini     │     │ Data Analysis │
                 │     LLM       │     │    Tools      │
                 └───────────────┘     └───────┬───────┘
                                               │
                         ┌─────────────────────┼────────────────────┐
                         │                     │                    │
                         ▼                     ▼                    ▼
                     Pandas /              NumPy /              SciPy /
                     Data Tools           Statistics             ML
                         │                     │                    │
                         └─────────────────────┼────────────────────┘
                                               │
                                               ▼
                                      Analysis Results
                                               │
                                               ▼
                                         React UI
```

### Agent Workflow

A typical request follows this process:

```text
User Question
      │
      ▼
LLM Agent
      │
      ▼
Understand Request
      │
      ▼
Create Analysis Plan
      │
      ▼
Select Tool(s)
      │
      ▼
Execute Tool(s)
      │
      ▼
Receive Results
      │
      ▼
Interpret Results
      │
      ▼
Present Findings
```

The LLM is not treated as the source of truth for numerical calculations. Where possible, calculations are performed by deterministic backend tools.

---

## Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Frontend         | React, Vite             |
| Backend          | Python 3.11, FastAPI    |
| AI               | Gemini                  |
| Agent Layer      | LLM Agent, Tool Calling |
| Data Processing  | Pandas, NumPy           |
| Statistics       | SciPy                   |
| Machine Learning | Scikit-learn            |
| Excel Processing | OpenPyXL                |
| Visualization    | Plotly                  |

The agent layer is intentionally kept **framework-independent** at this stage. A specific agent orchestration framework can be introduced if the complexity of the workflow justifies it.

---

## Project Structure

```text
datapilot/
│
├── backend/
│   └── app/
│       ├── main.py
│       ├── api/
│       ├── agents/
│       ├── tools/
│       ├── models/
│       └── services/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

## Installation

### Prerequisites

Make sure the following are installed:

* Python 3.11+
* Node.js 24+
* npm
* Git

### Clone the Repository

```bash
git clone <repository-url>
cd datapilot
```

### Backend

Create a virtual environment:

```bash
cd backend

python -m venv venv
```

Activate the environment.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

### Frontend

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## Configuration

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Keep credentials and environment-specific configuration outside the source code.

**Do not commit `.env` files or API keys to the repository.**

---

## Usage

Once the backend and frontend are running:

1. Open the DataPilot web interface.
2. Upload a supported dataset.
3. DataPilot inspects the dataset.
4. Ask a question using natural language.
5. The LLM agent determines the required analysis.
6. The agent selects and invokes the appropriate tools.
7. The tools perform the actual computation.
8. Results are returned to the agent.
9. The results are interpreted and presented through the interface.

Example:

```text
User:

"What are the strongest predictors of ED visits?"
```

A possible agent workflow:

```text
Dataset Inspection
        ↓
Target Identification
        ↓
Feature Analysis
        ↓
Statistical Analysis
        ↓
Model Analysis
        ↓
Visualization
        ↓
Result Interpretation
```

---

## Development Principles

DataPilot is being developed around the following principles.

### Deterministic Computation

Numerical and statistical operations should be performed using deterministic Python tools rather than relying on the LLM to calculate results.

### Controlled Tool Execution

The agent should interact with the system through explicitly defined tools instead of unrestricted code or system access.

### Separation of Responsibilities

The system separates:

```text
LLM
↓
Planning & Orchestration

Tools
↓
Computation & Execution

Frontend
↓
Interaction & Presentation
```

### Extensibility

The agent and tool layers are designed so that new analysis capabilities can be added without restructuring the entire application.

### Verifiability

Where possible, generated insights should be backed by the actual results produced by the underlying analysis tools.

---

## License

License information will be added before the first public release.
