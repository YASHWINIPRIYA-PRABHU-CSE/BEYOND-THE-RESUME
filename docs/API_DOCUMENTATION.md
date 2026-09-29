# API Endpoint Reference Manual

All endpoints are hosted at `http://127.0.0.1:8000/api`. Interactive Swagger UI is accessible at `http://127.0.0.1:8000/docs`.

---

## 1. Authentication Domain (`/api/auth`)

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `POST` | `/auth/register` | `UserCreate` (email, password, full_name, role) | Registers new account, initializes student profile, returns JWT token. |
| `POST` | `/auth/login` | `UserLogin` (email, password) | Validates credentials using Bcrypt, returns JWT access token. |
| `GET` | `/auth/me` | *Header: Bearer Token* | Returns currently authenticated user session. |

---

## 2. Student Profile Domain (`/api/profile`)

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/profile` | *Header: Bearer Token* | Fetches student profile, academic metrics, skills, and completion score. |
| `PUT` | `/profile` | `ProfileUpdate` | Updates CGPA, skills, projects, and recalculates integrity percentage. |

---

## 3. Resume Intelligence & NLP (`/api/resume`)

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `POST` | `/resume/upload` | `multipart/form-data` (file, target_role) | Extracts text (PDF/DOCX/TXT), performs NLP taxonomy audit, returns score. |
| `GET` | `/resume/latest` | *Header: Bearer Token* | Retrieves latest analyzed resume report for authenticated user. |
| `POST` | `/resume/match-jd` | `JobMatchRequest` (job_description, target_role) | Computes TF-IDF cosine similarity, missing skills, and tailoring advice. |

---

## 4. Machine Learning & Career Readiness (`/api/predictions`)

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/predictions/overview` | *Header: Bearer Token* | Consolidated overview: placement probability, salary, and readiness DNA. |
| `POST` | `/predictions/placement`| `PredictionRequest` | Live inference across Random Forest, Logistic Reg, or Neural Net. |
| `POST` | `/predictions/salary` | `PredictionRequest` | Regressor inference yielding central LPA estimate and confidence range. |
| `GET` | `/predictions/cluster` | *Header: Bearer Token* | Assigns unsupervised K-Means talent archetype and 2D PCA coordinates. |

---

## 5. Career Recommendations & Roadmap (`/api/career`)

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/career/recommendations`| *Header: Bearer Token* | Returns ranked career paths with match scores and capstone blueprints. |
| `GET` | `/career/skill-gap` | `target_role` (Query param) | Returns detailed competency gap matrix and radar chart vectors. |
| `GET` | `/career/next-three-moves`| *Header: Bearer Token* | Returns 3 algorithmically prioritized next actions for immediate impact. |
| `GET` | `/career/roadmap` | *Header: Bearer Token* | Returns 5-stage personalized roadmap with milestone completion status. |
| `POST` | `/career/roadmap/toggle/{id}` | *Path parameter: item_id* | Toggles completion of roadmap milestone, recalculates progress percentage. |

---

## 6. Assessments & Mock Interview (`/api/assessments`, `/api/interview`)

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/assessments` | None | Lists available quiz categories (DSA, SQL, Programming, ML). |
| `GET` | `/assessments/{id}` | *Path parameter: id* | Fetches questions for assessment without revealing answer keys. |
| `POST` | `/assessments/submit` | `SubmitQuizRequest` | Grades quiz, updates profile benchmarks, generates Evidence vs Confidence. |
| `GET` | `/interview/questions` | `role` (Query param) | Returns role-specific technical and behavioral questions. |
| `POST` | `/interview/evaluate` | `InterviewEvaluateRequest` | Evaluates response on clarity, completeness, and STAR alignment. |

---

## 7. Enterprise & Institutions (`/api/recruiter`, `/api/institution`)

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/recruiter/candidates` | Query params (role, dept, readiness, cgpa) | Anonymized candidate search across 25,000 registry without PII exposure. |
| `POST` | `/recruiter/compare` | `candidate_ids` (List of strings) | Side-by-side comparative analysis of up to 3 candidate profiles. |
| `GET` | `/institution/analytics`| *Header: Bearer Token* | Aggregated cohort placement rates, department benchmarks, at-risk registry. |

---

## 8. ML Insights & Syllabus Domain (`/api/ml-insights`)

| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/ml-insights/metrics` | None | Exports test metrics, confusion matrices, and feature importances. |
| `GET` | `/ml-insights/syllabus/unit1-regression` | `degree` (1, 2, or 3) | Interactive polynomial regression simulation with MSE, RMSE, R². |
| `GET` | `/ml-insights/syllabus/unit3-activation` | None | Returns numerical data curves for Sigmoid, Tanh, ReLU, and Leaky ReLU. |
| `GET` | `/ml-insights/syllabus/unit5-gradient-descent` | `learning_rate`, `iterations` | Simulates weight convergence on convex loss surface J(w). |
| `GET` | `/ml-insights/syllabus/unit5-qlearning` | None | Returns Q-Learning Q-table simulation for career trajectory optimization. |
| `GET` | `/ml-insights/responsible-ai` | None | Exports ethical governance charter and departmental parity audit stats. |
