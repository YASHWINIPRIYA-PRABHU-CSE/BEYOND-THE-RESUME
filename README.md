# BEYOND THE RESUME: AI-Powered Career Intelligence and Talent Readiness Platform

> **“Your resume shows where you are. Your potential shows where you can go.”**

Beyond The Resume is a production-grade career intelligence and talent readiness platform engineered to move beyond shallow keyword filtering. Built for students, academic placement cells, corporate recruiters, and talent development teams, it evaluates academic velocity, practical capstone experience, verified problem-solving benchmarks, and ATS structural integrity.

---

## 🌟 Key Highlights & Differentiators

- **Beyond Keyword Matching**: Employs holistic multi-dimensional talent profiling across 14 academic and practical indicators.
- **Explainable Machine Learning (Units 1–5)**:
  - **Unit 1 (Introduction & Regression)**: Linear and Polynomial regression for compensation forecasting ($R^2 = 0.9647$, RMSE = 0.45 LPA).
  - **Unit 2 (Supervised Learning & Ensembles)**: Placement readiness classification comparing Random Forest (100 trees), Logistic Regression, Decision Trees, KNN, and SVM with 5-Fold Cross Validation.
  - **Unit 3 (Neural Networks & Deep Learning)**: Multi-Layer Perceptron (ANN: 64x32 hidden layers, ReLU activations) evaluated against classical ensembles + interactive activation function explorer.
  - **Unit 4 (Unsupervised Learning & Dimensionality Reduction)**: K-Means clustering ($k=5$) discovering natural talent archetypes ('Technically Strong', 'Academically Focused', etc.) with Silhouette scoring and 2D PCA projection.
  - **Unit 5 (Optimization, Reinforcement Learning & Responsible AI)**: Interactive Gradient Descent simulator, Q-Learning career trajectory playground, and demographic parity bias auditing.
- **Resume NLP Intelligence**: Parses PDF, DOCX, and TXT files, extracts 180+ technical skills via domain taxonomies, flags passive verbs, calculates TF-IDF cosine similarity against target roles, and provides actionable before-and-after improvements.
- **Personalized Career Roadmaps**: 5-stage milestone progression with interactive completion check-offs, capstone project deliverables, and estimated effort tracking.
- **Interactive Mock Interview**: Role-specific questions evaluated in real time against the STAR framework (Situation, Task, Action, Result) with constructive NLP feedback.
- **Enterprise Multi-Role Portals**: Dedicated workspaces for Students, Recruiters (anonymized candidate discovery and side-by-side comparison), Institutions (cohort placement analytics and early-intervention registry), and Platform Admins.
- **100% Light Theme SaaS Design System**: Modern ivory and slate-50 canvas, emerald/teal accents, deep navy typography, subtle glassmorphic panels, and zero dark-theme clutter.

---

## 📂 Project Architecture

```
beyond-the-resume/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI application entrypoint with CORS
│   │   ├── config.py                # App configuration, JWT secret, directory paths
│   │   ├── database.py              # SQLAlchemy DB engine & declarative base
│   │   ├── models/                  # SQLAlchemy ORM models (Users, Profiles, Resumes, etc.)
│   │   ├── schemas/                 # Pydantic validation schemas
│   │   ├── services/                # ML inference, resume NLP, career engine, auth
│   │   ├── routers/                 # 10 dedicated API routers
│   │   └── seed_data.py             # Pre-seeded demo credentials for all 4 roles
│   ├── data/
│   │   ├── generate_dataset.py      # Dataset generator (25,000 realistic records)
│   │   └── career_intelligence_25k.csv
│   ├── ml/
│   │   ├── train_models.py          # Complete ML training pipeline
│   │   └── model_artifacts/         # Serialized .joblib models & model_metrics.json
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/              # Navbar, Sidebar, modals
│   │   ├── context/                 # AuthContext with 1-click role switcher
│   │   ├── pages/                   # 19 rich light-theme page views
│   │   ├── services/                # API client with token management
│   │   ├── App.jsx                  # Main router and layout
│   │   └── index.css                # Typography & custom light design tokens
│   ├── package.json
│   └── tailwind.config.js
└── docs/                            # In-depth architectural & academic viva guides
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
API Documentation will be live at: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access the application at: `http://127.0.0.1:5173/`

---

## 🔑 Demo Access Credentials

The platform features an instant **1-Click Role Switcher** in the top navigation bar. You can also log in manually using:

| Role | Email | Password | Primary Features |
|---|---|---|---|
| **Student** | `student@beyondtheresume.ai` | `Student@123` | Dashboard, Readiness Radar, Resume Analyzer, Roadmap, Mock Interview |
| **Recruiter** | `recruiter@techhire.com` | `Recruiter@123` | Anonymized Talent Pool, Multi-attribute Filter, Candidate Comparison |
| **Institution** | `placement@university.edu` | `Admin@123` | Cohort Placement Distribution, Department Benchmarks, At-Risk Registry |
| **Platform Admin** | `admin@beyondtheresume.ai` | `Admin@123` | Model Versioning, ML Insights, Governance & Audit |

---

## 📜 Academic Integrity & Dataset Disclosure

The models are trained on a high-fidelity synthetic dataset of 25,000 student records generated strictly according to empirical academic distributions. We uphold complete transparency: synthetic benchmarks are explicitly labeled as educational decision-support tools and are never represented as private student records.
