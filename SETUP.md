# Setup and Execution Instructions

## Prerequisites
- **Python**: Version 3.10 to 3.13
- **Node.js**: Version 18 or above (LTS recommended)
- **Package Managers**: `pip` and `npm`

---

## Step 1: Environment & Dataset Preparation

1. Navigate to the project backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   python -m pip install -r requirements.txt
   ```

3. (Optional) Regenerate the 25,000-record dataset:
   ```bash
   python data/generate_dataset.py
   ```

4. (Optional) Retrain all Machine Learning models and export artifacts:
   ```bash
   python ml/train_models.py
   ```
   *Note: Pre-trained artifacts and model metrics are already provided in `ml/model_artifacts/`.*

---

## Step 2: Running the FastAPI Backend Server

Run the Uvicorn server:
```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
- Health Check: `http://127.0.0.1:8000/api/health`
- Interactive OpenAPI Docs: `http://127.0.0.1:8000/docs`

---

## Step 3: Running the React Frontend Client

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://127.0.0.1:5173/
   ```

---

## Step 4: Testing & Verification Workflow

1. **Landing Page**: View value proposition, contrast table, and interactive preview cards.
2. **One-Click Role Switcher**: Click the **Student**, **Recruiter**, **Institution**, or **Admin** pill in the top navigation bar to seamlessly test all portals.
3. **Student Dashboard**: Inspect the 10 unique sections, including the **Readiness DNA Multi-Axis Radar**, **Career Compass**, and **Your Next 3 Moves**.
4. **Resume Analyzer**: Upload a sample `.pdf`, `.docx`, or `.txt` resume to view the ATS scoring, skill cloud, and before-and-after bullet rewrites.
5. **Placement & Salary ML Predictors**: Dynamically adjust candidate CGPA, coding benchmarks, and projects to see real-time inference across Random Forest, Logistic Regression, and Neural Networks.
6. **Model Insights**: Explore Units 1 to 5 interactively, including polynomial degree curves, neural network activation functions, and gradient descent convergence.
