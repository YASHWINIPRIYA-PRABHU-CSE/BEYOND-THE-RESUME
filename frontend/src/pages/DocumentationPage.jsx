import React, { useState } from 'react';
import { 
  BookOpen, HelpCircle, Code, Layers, ShieldCheck, 
  Terminal, Database, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState('viva');

  const vivaQuestions = [
    {
      q: "1. Why didn't you just build a resume keyword matching tool or simple placement score predictor?",
      a: "Traditional resume screeners rely solely on lexical keyword matching, penalizing candidates for wording omissions regardless of practical problem-solving capability. Beyond The Resume evaluates a multi-dimensional talent readiness model: combining academic trajectory, verified DSA assessments, GitHub capstones, soft skill indicators, and ATS structural audits into an explainable career intelligence system with guided roadmaps."
    },
    {
      q: "2. What is the nature and size of your dataset? Is it real student data?",
      a: "We maintain rigorous data integrity. The dataset consists of 25,000 synthetic student records generated with empirical distributions based on standard university placement patterns (e.g. CGPA ~7.4 ± 0.95, realistic non-linear correlations, realistic ~64% placement outcome, and realistic fresher salary bands). We explicitly document it as a high-fidelity synthetic benchmark rather than claiming private student records."
    },
    {
      q: "3. How are all five units of the Machine Learning syllabus mapped in your application?",
      a: "Unit 1: Supervised/Unsupervised split, StandardScaler, Train-Test (80/20), Linear & Polynomial Regression for salary estimation with MSE, RMSE, R².\nUnit 2: Supervised classification comparing Logistic Regression, Decision Tree, Random Forest (100 trees), KNN, and SVM with 5-Fold Cross Validation and confusion matrices.\nUnit 3: Multi-Layer Perceptron (ANN: 64x32 hidden layers with ReLU) plus interactive activation function visualizer (Sigmoid, Tanh, ReLU, LeakyReLU).\nUnit 4: Unsupervised K-Means clustering (k=5) identifying natural talent archetypes, Silhouette score calculation, and 2D PCA dimensionality reduction.\nUnit 5: Gradient Descent optimization simulation with live learning rate/iteration tuning, Q-Learning reinforcement learning career navigation playground, and Responsible AI bias auditing."
    },
    {
      q: "4. Why does Random Forest or Logistic Regression yield ~75% accuracy rather than 99%?",
      a: "In real-world talent hiring, interview outcomes carry genuine stochastic noise (situational nerves, interviewer variance, behavioral chemistry). Forcing an artificial 99% accuracy on tabular candidate records indicates severe data leakage or overfitting. A cross-validated accuracy of 75-76% with balanced precision and recall reflects realistic predictive power on human career outcomes."
    },
    {
      q: "5. How does the Resume NLP parser operate?",
      a: "The parser extracts text from PDF (pypdf), DOCX (python-docx), and TXT formats. It tokenizes content, matches section headers (Education, Projects, Skills, Experience), maps terms against an enterprise taxonomy of 180+ skills, flags weak passive phrasing, and performs TF-IDF vectorization with cosine similarity against target job role requirement vectors."
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-2 border border-slate-200">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Project Reference & Viva Defense Manual</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            System Architecture, Syllabus Mapping & Viva Guide
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Complete architectural documentation suitable for college project evaluation, technical reports, and viva voce defense.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('viva')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'viva' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Viva Voce Defense Questions (Top 5)
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'architecture' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          System Architecture & Tech Stack
        </button>
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'syllabus' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Feature-to-Syllabus Unit Mapping
        </button>
      </div>

      {/* VIVA TAB */}
      {activeTab === 'viva' && (
        <div className="space-y-4">
          {vivaQuestions.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <h3 className="text-sm font-extrabold text-slate-900">{item.q}</h3>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-emerald-500">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ARCHITECTURE TAB */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">Full-Stack Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-extrabold text-emerald-700 block">Frontend Client</span>
                <p className="text-slate-700">React 19 + Vite 8</p>
                <p className="text-slate-700">Tailwind CSS (Curated Light Theme)</p>
                <p className="text-slate-700">Recharts (Radar, Line, Bar, Scatter)</p>
                <p className="text-slate-700">Lucide React Icons</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-extrabold text-indigo-700 block">Backend Server</span>
                <p className="text-slate-700">Python 3.13 + FastAPI 0.141</p>
                <p className="text-slate-700">SQLAlchemy 2.0 ORM</p>
                <p className="text-slate-700">SQLite (Single-file embedded persistence)</p>
                <p className="text-slate-700">PyJWT & Bcrypt Authentication</p>
                <p className="text-slate-700">PyPDF & Python-docx Parsers</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-extrabold text-purple-700 block">Machine Learning Core</span>
                <p className="text-slate-700">Scikit-Learn 1.9.0 & Joblib</p>
                <p className="text-slate-700">Pandas & NumPy & SciPy</p>
                <p className="text-slate-700">Random Forest, Logistic Reg, MLP</p>
                <p className="text-slate-700">Linear, Ridge & Gradient Boosting</p>
                <p className="text-slate-700">K-Means (k=5) & 2D PCA</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-slate-900 text-base">Key API Endpoints</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Method</th>
                    <th className="p-2.5">Endpoint</th>
                    <th className="p-2.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  <tr><td className="p-2 font-bold text-emerald-700">POST</td><td className="p-2">/api/auth/login</td><td className="p-2 font-sans">Bcrypt auth, returns JWT token</td></tr>
                  <tr><td className="p-2 font-bold text-blue-700">GET</td><td className="p-2">/api/predictions/overview</td><td className="p-2 font-sans">Consolidated student dashboard metrics</td></tr>
                  <tr><td className="p-2 font-bold text-emerald-700">POST</td><td className="p-2">/api/predictions/placement</td><td className="p-2 font-sans">Live multi-model classification</td></tr>
                  <tr><td className="p-2 font-bold text-emerald-700">POST</td><td className="p-2">/api/predictions/salary</td><td className="p-2 font-sans">Regression LPA salary projection</td></tr>
                  <tr><td className="p-2 font-bold text-emerald-700">POST</td><td className="p-2">/api/resume/upload</td><td className="p-2 font-sans">PDF/DOCX/TXT text extraction & NLP audit</td></tr>
                  <tr><td className="p-2 font-bold text-emerald-700">POST</td><td className="p-2">/api/interview/evaluate</td><td className="p-2 font-sans">STAR answer evaluation & feedback</td></tr>
                  <tr><td className="p-2 font-bold text-blue-700">GET</td><td className="p-2">/api/recruiter/candidates</td><td className="p-2 font-sans">Anonymized candidate pool filter</td></tr>
                  <tr><td className="p-2 font-bold text-blue-700">GET</td><td className="p-2">/api/institution/analytics</td><td className="p-2 font-sans">Aggregated cohort placement analytics</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SYLLABUS MAPPING TAB */}
      {activeTab === 'syllabus' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Comprehensive Mapping to All 5 Syllabus Units</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-extrabold text-slate-900 block">Unit 1: Introduction to Machine Learning & Regression</span>
              <p className="text-slate-700 mt-1">Supervised vs Unsupervised foundations, 80/20 Train-Test split, StandardScaler feature normalization, Linear Regression & Polynomial degree simulations, MSE, RMSE, R² scores, Accuracy, Precision, Recall, F1.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-extrabold text-slate-900 block">Unit 2: Supervised Learning & Ensembles</span>
              <p className="text-slate-700 mt-1">Logistic Regression (interpretable odds ratios), Decision Trees (pruning), Random Forest (100 trees, bagging, Gini impurity importances), K-Nearest Neighbors (k=11), Support Vector Machines, 5-Fold Cross Validation.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-extrabold text-slate-900 block">Unit 3: Neural Networks and Deep Learning</span>
              <p className="text-slate-700 mt-1">Multi-Layer Perceptron (MLPClassifier with 64x32 hidden layers, ReLU activations), interactive Activation Function visualizer (Sigmoid, Tanh, ReLU, LeakyReLU), educational guide covering Backpropagation, CNN, RNN, LSTM, and Transformers/BERT.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-extrabold text-slate-900 block">Unit 4: Unsupervised Learning & Dimensionality Reduction</span>
              <p className="text-slate-700 mt-1">K-Means clustering (k=5) identifying natural talent archetypes ('Technically Strong', 'Academically Focused', etc.), Silhouette analysis, Principal Component Analysis (PCA) projecting 14 features into 2D orthogonal axes.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-extrabold text-slate-900 block">Unit 5: Optimization, Reinforcement Learning & Responsible AI</span>
              <p className="text-slate-700 mt-1">Interactive Gradient Descent optimizer with live learning rate and step controls, Q-Learning RL career trajectory playground, Responsible AI charter, synthetic dataset disclosure, and departmental bias auditing.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
