# Feature-to-Syllabus Unit Mapping

This document provides explicit mapping between the features of **Beyond The Resume** and all five units of the standard Machine Learning and Data Science curriculum.

---

## 📘 Unit 1: Introduction to Machine Learning & Regression
| Syllabus Requirement | Platform Feature Implementation | File / Component Reference |
|---|---|---|
| **Supervised vs Unsupervised Learning** | Implemented both: Placement & Salary (Supervised) vs Talent Archetype Clustering (Unsupervised). | `ml/train_models.py`, `routers/predictions.py` |
| **Train/Test Data Separation** | 80% Train (20,000 samples) and 20% Test (5,000 samples) with random state = 42. | `ml/train_models.py` |
| **Feature Scaling & Preprocessing** | `StandardScaler` fitted strictly on training data and serialized to `scaler.joblib`. | `ml/model_artifacts/scaler.joblib` |
| **Linear Regression** | Ordinary Least Squares regression for compensation estimation ($R^2 = 0.9647$). | `pages/SalaryEstimationPage.jsx` |
| **Polynomial Regression** | Interactive simulator demonstrating Degree 1, 2, and 3 curve fits on candidate data. | `pages/ModelInsightsPage.jsx` (Unit 1 Tab) |
| **Evaluation Metrics** | Mean Squared Error (MSE), Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), $R^2$. | `ml/model_artifacts/model_metrics.json` |

---

## 📗 Unit 2: Supervised Learning & Ensembles
| Syllabus Requirement | Platform Feature Implementation | File / Component Reference |
|---|---|---|
| **Logistic Regression** | Trained probabilistic classifier yielding odds ratios for placement readiness. | `ml/model_artifacts/placement_lr.joblib` |
| **Decision Trees** | Pruned decision tree classifier (`max_depth=8`, `min_samples_leaf=4`). | `ml/model_artifacts/placement_dt.joblib` |
| **Random Forest & Bagging** | 100-tree ensemble reducing variance and outputting Gini impurity feature importances. | `ml/model_artifacts/placement_rf.joblib` |
| **K-Nearest Neighbors (KNN)** | Instance-based classifier evaluated with $k=11$ nearest neighbors. | `ml/train_models.py` |
| **Support Vector Machines (SVM)** | Margin-based classifier trained using log_loss stochastic gradient descent. | `ml/train_models.py` |
| **Cross-Validation** | 5-Fold Stratified Cross Validation with mean accuracy and standard deviation metrics. | `pages/PlacementPredictionPage.jsx` |
| **Confusion Matrix & Reports** | Full confusion matrices and classification reports calculated for every model. | `pages/ModelInsightsPage.jsx` (Unit 2 Tab) |

---

## 📕 Unit 3: Neural Networks & Deep Learning
| Syllabus Requirement | Platform Feature Implementation | File / Component Reference |
|---|---|---|
| **Multi-Layer Perceptron (ANN)** | Fully connected neural network (64x32 hidden layers, ReLU activations) evaluated on test cohort. | `ml/model_artifacts/placement_mlp.joblib` |
| **Activation Functions Visualizer** | Interactive visualizer comparing mathematical curves of Sigmoid, Tanh, ReLU, and Leaky ReLU. | `pages/ModelInsightsPage.jsx` (Unit 3 Tab) |
| **Backpropagation & Deep Learning** | Conceptual educational guide covering Backpropagation, CNN, RNN, LSTM, and Transformers/BERT. | `ml/syllabus_explorations.py` |

---

## 📙 Unit 4: Unsupervised Learning & Dimensionality Reduction
| Syllabus Requirement | Platform Feature Implementation | File / Component Reference |
|---|---|---|
| **K-Means Clustering** | Unsupervised clustering ($k=5$) discovering 5 distinct talent archetypes. | `ml/model_artifacts/kmeans_clusterer.joblib` |
| **Cluster Evaluation (Silhouette)**| Silhouette score of 0.0913 calculated across normalized candidate profiles. | `ml/model_artifacts/model_metrics.json` |
| **Principal Component Analysis (PCA)**| Dimensionality reduction from 14 features to 2 orthogonal principal components for 2D plotting. | `ml/model_artifacts/pca_transformer.joblib` |
| **Cluster Centroid Profiling** | Quantitative centroid analysis mapping clusters to actionable interventions. | `pages/ModelInsightsPage.jsx` (Unit 4 Tab) |

---

## 📓 Unit 5: Optimization, Reinforcement Learning & Responsible AI
| Syllabus Requirement | Platform Feature Implementation | File / Component Reference |
|---|---|---|
| **Gradient Descent Optimization** | Interactive simulator with live learning rate and step controls demonstrating weight decay on $J(w)$. | `pages/ModelInsightsPage.jsx` (Unit 5 Tab) |
| **Reinforcement Learning (Q-Learning)**| Interactive educational MDP playground demonstrating optimal career action selection via Q-table. | `pages/ModelInsightsPage.jsx` (Unit 5 Tab) |
| **Explainable AI (XAI)** | Individual feature contribution vectors showing positive and negative placement drivers. | `pages/StudentDashboard.jsx`, `routers/predictions.py` |
| **Fairness & Bias Auditing** | Departmental parity monitoring auditing placement distribution across non-CS streams. | `pages/ResponsibleAIPage.jsx` |
| **Data Privacy & Anonymization** | PII scrubbing and anonymized candidate tags in recruiter search workflows. | `pages/RecruiterPage.jsx` |
