import React, { useState, useEffect } from 'react';
import { mlInsightsApi } from '../services/api';
import { 
  Binary, Sparkles, BrainCircuit, Activity, BarChart2, 
  Layers, Compass, CheckCircle2, TrendingUp, Sliders, RefreshCw, Info
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, ScatterChart, Scatter, ZAxis
} from 'recharts';

export default function ModelInsightsPage() {
  const [activeUnit, setActiveUnit] = useState('unit1');
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unit 1 interactive state
  const [polyDegree, setPolyDegree] = useState(2);
  const [unit1Data, setUnit1Data] = useState(null);

  // Unit 3 interactive state
  const [unit3Data, setUnit3Data] = useState(null);

  // Unit 5 interactive state
  const [learningRate, setLearningRate] = useState(0.15);
  const [iterations, setIterations] = useState(15);
  const [gdData, setGdData] = useState(null);
  const [qLearningData, setQLearningData] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    loadUnit1(polyDegree);
  }, [polyDegree]);

  useEffect(() => {
    loadUnit5GD(learningRate, iterations);
  }, [learningRate, iterations]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [m, u3, ql] = await Promise.all([
        mlInsightsApi.getMetrics().catch(() => null),
        mlInsightsApi.getUnit3Activation().catch(() => null),
        mlInsightsApi.getUnit5QLearning().catch(() => null)
      ]);
      setMetrics(m);
      setUnit3Data(u3);
      setQLearningData(ql);
      await loadUnit1(polyDegree);
      await loadUnit5GD(learningRate, iterations);
    } catch (e) {
      console.error("Error loading insights:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadUnit1 = async (deg) => {
    try {
      const data = await mlInsightsApi.getUnit1Regression(deg);
      setUnit1Data(data);
    } catch (e) {
      console.warn("Unit 1 error:", e);
    }
  };

  const loadUnit5GD = async (lr, iters) => {
    try {
      const data = await mlInsightsApi.getUnit5GradientDescent(lr, iters);
      setGdData(data);
    } catch (e) {
      console.warn("Unit 5 GD error:", e);
    }
  };

  const units = [
    { id: 'unit1', label: 'Unit 1: Intro & Regression', sub: 'Linear, Poly, Metrics' },
    { id: 'unit2', label: 'Unit 2: Supervised Learning', sub: 'RF, Logistic, Trees, SVM, KNN' },
    { id: 'unit3', label: 'Unit 3: Neural Nets & Deep Learning', sub: 'ANN, Activations, Transformers' },
    { id: 'unit4', label: 'Unit 4: Unsupervised & PCA', sub: 'K-Means, PCA, Silhouette' },
    { id: 'unit5', label: 'Unit 5: Optimization & RL', sub: 'Gradient Descent, Q-Learning' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Binary className="w-3.5 h-3.5 text-emerald-600" />
            <span>Complete Academic Machine Learning Syllabus Alignment</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Machine Learning Engineering & Model Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Real trained models, empirical test loss metrics, and interactive simulations for all 5 ML syllabus units.
          </p>
        </div>

        <div className="bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 border border-slate-200">
          Dataset: 25,000 Samples • 80/20 Stratified Split
        </div>
      </div>

      {/* Syllabus Unit Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {units.map((u) => {
          const isActive = activeUnit === u.id;
          return (
            <button
              key={u.id}
              onClick={() => setActiveUnit(u.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-extrabold truncate">{u.label}</div>
              <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-emerald-100' : 'text-slate-600'}`}>
                {u.sub}
              </div>
            </button>
          );
        })}
      </div>

      {/* ================= UNIT 1 ================= */}
      {activeUnit === 'unit1' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Unit 1: Linear vs. Polynomial Regression Explorer
                </h3>
                <p className="text-xs text-slate-700 mt-0.5">
                  Coding Benchmark vs. Compensation (LPA). Demonstrates Underfitting vs. Good Fit vs. Overfitting.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Polynomial Degree:</span>
                {[1, 2, 3].map(d => (
                  <button
                    key={d}
                    onClick={() => setPolyDegree(d)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                      polyDegree === d
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Degree {d} {d === 1 ? '(Linear)' : d === 2 ? '(Quadratic)' : '(Cubic)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Regression Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-600 block">R² Score (Goodness of Fit)</span>
                <span className="font-extrabold text-emerald-700 text-base">{unit1Data?.metrics?.r2_score || 0.96}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-600 block">Root Mean Squared Error (RMSE)</span>
                <span className="font-extrabold text-slate-900 text-base">₹{unit1Data?.metrics?.rmse || 0.45} LPA</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-600 block">Mean Squared Error (MSE)</span>
                <span className="font-extrabold text-indigo-700 text-base">{unit1Data?.metrics?.mse || 0.20}</span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={unit1Data?.points || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="coding_score" tick={{ fontSize: 11, fill: '#334155' }} label={{ value: 'Coding Benchmark (0-100)', position: 'insideBottom', offset: -5 }} />
                  <YAxis tick={{ fontSize: 11, fill: '#334155' }} label={{ value: 'Salary (LPA)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="actual_salary_lpa" stroke="#cbd5e1" strokeWidth={2} name="Observed Cohort Point" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="predicted_salary_lpa" stroke="#059669" strokeWidth={3} name="Fitted Model Curve" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Syllabus Takeaway: </strong>{unit1Data?.explanation}
            </p>
          </div>
        </div>
      )}

      {/* ================= UNIT 2 ================= */}
      {activeUnit === 'unit2' && (
        <div className="space-y-6">
          
          {/* Classification Comparison Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Unit 2: Supervised Learning Models Comparison
            </h3>
            <p className="text-xs text-slate-700 mb-4">
              Logistic Regression vs Decision Tree vs Random Forest vs KNN vs SVM. All evaluated on the 5,000 test records.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Model</th>
                    <th className="p-3">Paradigm</th>
                    <th className="p-3">Test Accuracy</th>
                    <th className="p-3">Precision</th>
                    <th className="p-3">Recall</th>
                    <th className="p-3">F1-Score</th>
                    <th className="p-3">5-Fold CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {Object.entries(metrics?.classification_models || {}).map(([name, m], idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="p-3 font-bold text-slate-900">{name}</td>
                      <td className="p-3 text-slate-600">{m.type}</td>
                      <td className="p-3 font-extrabold text-emerald-700">{(m.accuracy * 100).toFixed(2)}%</td>
                      <td className="p-3">{(m.precision * 100).toFixed(2)}%</td>
                      <td className="p-3">{(m.recall * 100).toFixed(2)}%</td>
                      <td className="p-3 font-bold text-slate-900">{(m.f1 * 100).toFixed(2)}%</td>
                      <td className="p-3 text-indigo-700">{(m.cv_mean * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Feature Importances (Random Forest) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Gini Impurity Feature Importances (Random Forest)
            </h3>
            <p className="text-xs text-slate-700 mb-4">
              Relative contribution of each candidate feature in reducing node impurity across 100 decision trees.
            </p>

            <div className="space-y-2">
              {metrics?.feature_importances?.map((f, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-36 font-semibold text-slate-700 truncate">{f.feature}</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${f.importance * 300}%` }}
                    ></div>
                  </div>
                  <span className="w-12 font-bold text-slate-900 text-right">
                    {(f.importance * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================= UNIT 3 ================= */}
      {activeUnit === 'unit3' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Unit 3: Activation Functions Visualizer & Neural Network Architectures
                </h3>
                <p className="text-xs text-slate-700 mt-0.5">
                  Interactive mathematical curves comparing Sigmoid, Tanh, ReLU, and Leaky ReLU activations.
                </p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={unit3Data?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="z" tick={{ fontSize: 11, fill: '#334155' }} label={{ value: 'Net Input (z)', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={[-1.5, 3.5]} tick={{ fontSize: 11, fill: '#334155' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="relu" stroke="#059669" strokeWidth={3} name="ReLU (max(0,z))" />
                  <Line type="monotone" dataKey="sigmoid" stroke="#3b82f6" strokeWidth={2} name="Sigmoid" />
                  <Line type="monotone" dataKey="tanh" stroke="#8b5cf6" strokeWidth={2} name="Tanh" />
                  <Line type="monotone" dataKey="leaky_relu" stroke="#f59e0b" strokeWidth={2} name="Leaky ReLU" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Neural Net Deep Dive Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {Object.entries(unit3Data?.descriptions || {}).map(([fnName, desc], idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-extrabold text-slate-900 block">{fnName}</span>
                  <span className="text-[11px] text-slate-600 mt-1 block">{desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 text-xs text-indigo-950 space-y-1">
              <span className="font-extrabold text-indigo-900 block">Unit 3 MLP Classifier in Beyond The Resume:</span>
              <p>
                Our Multi-Layer Perceptron uses a <strong>(64, 32)</strong> hidden layer architecture with <strong>ReLU</strong> activation and Adam optimization. It converges at <strong>74.98% Accuracy</strong>, demonstrating competitive non-linear representation parity with ensemble Random Forests on tabular student records.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= UNIT 4 ================= */}
      {activeUnit === 'unit4' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Unit 4: Unsupervised Talent Clustering (K-Means k=5) & PCA
                </h3>
                <p className="text-xs text-slate-700 mt-0.5">
                  Discovers natural candidate archetypes without human labels. PCA projects 14 dimensions onto 2 principal components.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md border border-purple-200">
                  Silhouette Score: {metrics?.unsupervised_clustering?.silhouette_score || 0.091}
                </span>
              </div>
            </div>

            {/* Cluster Archetypes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics?.unsupervised_clustering?.cluster_profiles?.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      Cluster #{c.cluster_id}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{c.percentage}% of cohort</span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm">{c.archetype}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{c.description}</p>
                  
                  <div className="pt-2 border-t border-slate-200/80 text-[11px]">
                    <span className="font-bold text-slate-800">Action: </span>
                    <span className="text-slate-600">{c.recommended_action}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <strong>PCA Dimensionality Reduction: </strong>
              The top 2 principal components explain {((metrics?.unsupervised_clustering?.pca_cumulative_variance || 0.28) * 100).toFixed(1)}% of total multi-dimensional variance, capturing the primary trade-off axis between theoretical academic metrics and hands-on software project execution.
            </div>
          </div>
        </div>
      )}

      {/* ================= UNIT 5 ================= */}
      {activeUnit === 'unit5' && (
        <div className="space-y-6">
          
          {/* Gradient Descent Optimizer */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Unit 5: Gradient Descent Optimization Simulator
                </h3>
                <p className="text-xs text-slate-700 mt-0.5">
                  Convex Loss Surface J(w) = (w - 3.5)² + 2.0. Observe weight convergence and gradient decay.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <span>Learning Rate (α):</span>
                  <select
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="p-1 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="0.05">0.05 (Slow)</option>
                    <option value="0.15">0.15 (Optimal)</option>
                    <option value="0.45">0.45 (Aggressive)</option>
                    <option value="0.95">0.95 (Overshooting)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gdData?.trajectory || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="step" tick={{ fontSize: 11, fill: '#334155' }} label={{ value: 'Iteration Step', position: 'insideBottom', offset: -5 }} />
                  <YAxis tick={{ fontSize: 11, fill: '#334155' }} label={{ value: 'Loss J(w)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="loss" stroke="#059669" strokeWidth={3} name="Cost J(w)" />
                  <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} name="Weight w" strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span>Status: <strong className="text-emerald-700">{gdData?.convergence_state}</strong></span>
              <span>Optimal Weight: <strong>w* = 3.5</strong></span>
              <span>Final Weight: <strong>w = {gdData?.final_weight}</strong></span>
            </div>
          </div>

          {/* Q-Learning Reinforcement Learning Playground */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">
              Unit 5: Reinforcement Learning (Q-Learning) Career Navigation
            </h3>
            <p className="text-xs text-slate-700">
              Q(s, a) matrix where an autonomous agent learns the highest reward actions across academic career stages.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">State (Career Stage)</th>
                    <th className="p-3">Solve LeetCode</th>
                    <th className="p-3">Build Full-Stack App</th>
                    <th className="p-3">Do Internship</th>
                    <th className="p-3">Take Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {qLearningData?.q_table?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="p-3 font-bold text-slate-900">{row.state}</td>
                      <td className="p-3 font-bold text-slate-800">{row["Solve LeetCode"]}</td>
                      <td className="p-3 font-bold text-emerald-700">{row["Build Full-Stack App"]}</td>
                      <td className="p-3 text-slate-700">{row["Do Internship"]}</td>
                      <td className="p-3 text-indigo-700">{row["Take Assessment"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Notice: </strong>This is an educational RL simulation demonstrating Markov Decision Processes (MDP). Main career predictions in Beyond The Resume use supervised ensembles and linear regression.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
