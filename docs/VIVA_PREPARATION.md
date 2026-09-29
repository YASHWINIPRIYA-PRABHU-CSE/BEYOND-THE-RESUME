# Viva Voce Defense & Project Presentation Guide

## Top 10 Viva Voce Questions & Definitive Answers

### Q1: What makes "Beyond The Resume" different from existing resume parsers or placement score predictors?
> **Answer**: Most existing student tools are either simple keyword count ATS checkers or binary placement calculators. Beyond The Resume integrates five core pillars:
> 1. Multi-factor student readiness assessment across 14 academic, coding, and project parameters.
> 2. Explainable ML inference using both ensemble and linear models with feature impact attributions.
> 3. NLP resume structural parsing with before-and-after bullet rewrites and active verb suggestions.
> 4. Dynamic personalized learning roadmaps with toggleable task milestones and "Your Next 3 Moves".
> 5. Anonymized recruiter discovery and institutional cohort analytics with early-warning intervention flags.

---

### Q2: What dataset did you use, and how did you prevent data leakage?
> **Answer**: We synthesized a 25,000-sample dataset calibrated strictly to empirical higher education placement distributions. Data leakage was avoided by:
> 1. Splitting the dataset into 80% Train (20,000) and 20% Test (5,000) using stratified sampling *before* scaling.
> 2. Fitting the `StandardScaler` strictly on `X_train` and applying `scaler.transform()` to `X_test`.
> 3. Evaluating models through 5-Fold Stratified Cross-Validation on training folds only.

---

### Q3: Why is your classification accuracy ~75-76% and not 95% or 99%?
> **Answer**: In real-world campus hiring, interview day performance carries irreducible stochastic variance: situational anxiety, interviewer bias, behavioral chemistry, and candidate state. If a tabular model claimed 99% placement prediction accuracy, it would indicate severe target leakage or trivial overfitting. An accuracy of 75.8% with an F1-score of 0.8213 is realistic, honest, and statistically robust.

---

### Q4: Explain the mathematical objective and metrics for your Salary Estimation Regressor.
> **Answer**: The regression task estimates starting compensation in Lakhs Per Annum (LPA). We trained Ordinary Least Squares (OLS) Linear Regression, Ridge ($L_2$ penalty), and Gradient Boosting Regressors.
> - **Metrics**:
>   - $R^2 = 0.9647$: Indicates that 96.47% of variance in compensation is explained by candidate technical competencies, CGPA, projects, and internships.
>   - $\text{RMSE} = 0.4555\text{ LPA}$: Average root mean square residual error is under ₹46,000 INR.
>   - $\text{MAE} = 0.3602\text{ LPA}$.

---

### Q5: How did you implement Unsupervised Learning (Unit 4)?
> **Answer**: We implemented $K$-Means clustering ($k=5$) with $k$-means++ initialization on normalized 14-dimensional talent vectors, yielding a Silhouette Score of 0.0913. Centroid statistics revealed five authentic talent archetypes:
> 1. *Technically Strong*
> 2. *Academically Focused*
> 3. *Balanced Career Ready*
> 4. *Emerging Learner*
> 5. *Needs Structured Development*
> We also applied Principal Component Analysis (PCA) to reduce the 14 features into 2 orthogonal axes for 2D visualization, explaining 28.4% of total profile variance.

---

### Q6: How does the Multi-Layer Perceptron (Unit 3) work in your project?
> **Answer**: We trained an MLPClassifier with two hidden layers of $(64, 32)$ neurons utilizing Rectified Linear Unit (ReLU) activations, Adam optimizer, and early stopping. It achieved 74.98% accuracy on the test set, demonstrating that neural networks can learn competitive non-linear decision boundaries on structured candidate profiles.

---

### Q7: Explain how the Resume NLP pipeline works.
> **Answer**:
> 1. Extracts binary streams using `pypdf` (PDF) and `docx.Document` (DOCX).
> 2. Tokenizes and lowercases text streams.
> 3. Scans for structural section headers via regex (`Education`, `Technical Skills`, `Experience`, `Projects`, `Certifications`).
> 4. Matches skills against an enterprise dictionary of 180+ technical concepts.
> 5. Computes TF-IDF vectorization and cosine similarity against target role requirements.
> 6. Flags passive phrasing ('worked on', 'helped') and recommends active power verbs ('architected', 'optimized').

---

### Q8: What is the "STAR" method in your Mock Interview module?
> **Answer**: STAR stands for **Situation, Task, Action, Result**. Our mock interview evaluator checks candidate written/verbal responses for situational context, defined challenges, specific engineering actions taken, and quantified results (e.g. latency reduced by 30%).

---

### Q9: What security and privacy measures protect candidates in the recruiter portal?
> **Answer**: Candidates in the recruiter search portal are completely anonymized (e.g. `Talent-BTR-10291`). Personal identifiable information (PII) including names, phone numbers, and emails are scrubbed from search views to eliminate unconscious hiring bias. Recruiters can request connections, and candidate PII is only shared upon explicit consent.

---

### Q10: How does the platform address Responsible AI and fairness?
> **Answer**: We audit model predictions across academic streams (CS, IT, AI/ML, Data Science, ECE, EE) to ensure non-CS students who demonstrate software competencies are not disproportionately penalized. Every prediction includes feature importance vectors explaining *why* the result was reached and *how* to improve.
