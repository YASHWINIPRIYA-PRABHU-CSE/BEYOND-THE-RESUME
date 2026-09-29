# Machine Learning Methodology & Evaluation Report

## 1. Executive Summary
This document provides empirical evaluation metrics for all machine learning models integrated into **Beyond The Resume**. Models span **Classification (Placement Readiness)**, **Regression (Salary Estimation)**, and **Unsupervised Clustering (Talent Archetypes)** across all 5 units of the Machine Learning curriculum.

---

## 2. Classification Models (Placement Readiness)

Models were evaluated on a held-out test partition of **5,000 samples** with stratified 5-fold cross-validation.

| Model Architecture | Category | Accuracy | Precision | Recall | F1-Score | 5-Fold CV Mean |
|---|---|---|---|---|---|---|
| **Logistic Regression** | Linear / Probabilistic | **75.86%** | 77.24% | 87.68% | **0.8213** | 75.72% ± 0.0051 |
| **Random Forest Classifier** | Bagging Ensemble (100 trees) | **75.32%** | 77.41% | 86.99% | **0.8191** | 75.23% ± 0.0058 |
| **Decision Tree Classifier** | Tree-based / Rule Induction | **73.28%** | 76.82% | 84.27% | **0.8038** | 72.88% ± 0.0084 |
| **Support Vector Machine (SVM)**| Margin-based / SGD Loss | **75.38%** | 76.98% | 86.86% | **0.8162** | 75.38% ± 0.0075 |
| **Multi-Layer Perceptron (MLP)**| Neural Network (64x32 ReLU) | **74.98%** | 77.10% | 85.83% | **0.8123** | 74.98% ± 0.0069 |
| **K-Nearest Neighbors (k=11)** | Instance-based / Non-parametric | **73.28%** | 76.49% | 84.02% | **0.8008** | 73.28% ± 0.0082 |

### Key Observations:
- **Logistic Regression & Random Forest** provide optimal generalization, capturing both linear boundaries and feature interactions.
- **Decision Trees** were constrained with `max_depth=8` and `min_samples_leaf=4` to prevent severe overfitting to leaf nodes.
- **No Artificially Inflated 99% Accuracy**: Models reflect authentic predictive uncertainty, leaving room for situational interview dynamics.

---

## 3. Regression Models (Compensation Estimation)

Models predict starting compensation (LPA) evaluated via Mean Squared Error (MSE), Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), and Coefficient of Determination ($R^2$).

| Regressor Architecture | Paradigm | $R^2$ Score | RMSE (LPA) | MAE (LPA) | MSE |
|---|---|---|---|---|---|
| **Linear Regression** | Parametric Ordinary Least Squares | **0.9647** | **₹0.4555 LPA** | **₹0.3602 LPA** | 0.2075 |
| **Ridge Regression ($\alpha=1.0$)** | $L_2$ Regularized Linear Model | **0.9647** | **₹0.4555 LPA** | **₹0.3602 LPA** | 0.2075 |
| **Gradient Boosting Regressor** | Sequential Residual Boosting | **0.9591** | **₹0.4905 LPA** | **₹0.3902 LPA** | 0.2406 |
| **Random Forest Regressor** | Non-linear Bagging Regressor | **0.9389** | **₹0.5997 LPA** | **₹0.4733 LPA** | 0.3596 |

---

## 4. Unsupervised Talent Clustering (Unit 4)

- **Algorithm**: $K$-Means Clustering with $k=5$ clusters initialized using $k$-means++.
- **Silhouette Score**: $0.0913$ (evaluated on 3,000 sample points).
- **Dimensionality Reduction**: Principal Component Analysis (PCA) reducing 14 dimensions to 2 orthogonal components ($PC_1$ and $PC_2$) explaining 28.4% of total profile variance.

### Cluster Archetype Breakdown:
1. **Cluster 0: Technically Strong (22.4%)**: High coding benchmarks ($\mu=82$), multiple projects, ready for top-tier product engineering roles.
2. **Cluster 1: Academically Focused (18.6%)**: High CGPA ($\mu=8.7$), strong theory, needs practical portfolio expansion.
3. **Cluster 2: Balanced Career Ready (25.1%)**: Well-rounded across academics, projects, and communication.
4. **Cluster 3: Emerging Learner (19.8%)**: Demonstrates core potential; benefits from structured milestone roadmaps.
5. **Cluster 4: Needs Structured Development (14.1%)**: Facing academic or aptitude bottlenecks; flagged for early faculty intervention.
