# Dataset Methodology & Statistical Architecture

## 1. Overview
The **Beyond The Resume** dataset comprises **25,000 synthetic candidate records** engineered to replicate real-world academic and campus placement distributions without compromising sensitive student PII.

```
Total Records: 25,000
Train Partition: 20,000 records (80.0%)
Test Partition: 5,000 records (20.0%)
Validation Strategy: 5-Fold Stratified Cross Validation
Target 1 (Classification): Placement Outcome (0 = Needs Preparation, 1 = Placed / High Readiness)
Target 2 (Regression): Annual Starting Compensation (LPA - Lakhs Per Annum)
```

---

## 2. Feature Specification & Distributions

| Feature | Type | Range / Domain | Mean / Distribution | Correlation Rationale |
|---|---|---|---|---|
| `cgpa` | Float | 5.00 – 9.80 | $\mu=7.40, \sigma=0.95$ | Correlated with foundational aptitude and academic consistency. |
| `backlogs` | Integer | 0 – 3 | Negatively correlated with CGPA | Acts as an institutional filter for campus recruitment drives. |
| `projects_count` | Integer | 0 – 6 | $\mu=2.4$ | Critical indicator of hands-on software development competence. |
| `internships_count` | Integer | 0 – 3 | Mode = 1 | High-signal real-world industry exposure. |
| `certifications_count` | Integer | 0 – 5 | Poisson ($\lambda=1.5$) | External validation of specialized technical focus. |
| `coding_score` | Integer | 20 – 98 | $\mu=64.2, \sigma=14.8$ | Algorithmic and problem-solving benchmark (LeetCode style). |
| `aptitude_score` | Integer | 25 – 98 | $\mu=65.1, \sigma=13.2$ | Logical, quantitative, and analytical reasoning score. |
| `communication_score` | Integer | 30 – 98 | $\mu=66.8, \sigma=12.5$ | Soft skills and technical articulation in interview settings. |
| `resume_score` | Integer | 30 – 95 | $\mu=68.4, \sigma=11.1$ | ATS structural completeness, formatting, and keyword density. |
| `dsa_level` | Categorical | 0 – 3 | None, Beg, Int, Adv | Derived from coding score and algorithmic assessment. |
| `web_dev_level` | Categorical | 0 – 3 | None, Beg, Int, Adv | Practical proficiency in client/server frameworks. |
| `ml_ai_level` | Categorical | 0 – 3 | None, Beg, Int, Adv | Practical experience in data pipelines and model training. |
| `cloud_devops_level`| Categorical | 0 – 3 | None, Beg, Int, Adv | Containerization, CI/CD, and Linux fundamentals. |
| `db_sql_level` | Categorical | 0 – 3 | None, Beg, Int, Adv | Relational database schema design and query optimization. |

---

## 3. Placement Outcome Calibration

Placement outcome $y \in \{0, 1\}$ is determined through an underlying non-linear logistic sigmoid calibrated to yield a realistic **63.9% placed vs. 36.1% preparation-needed** distribution:

$$P(\text{Placed}) = \sigma(0.038(C - 55) + 0.028(A - 52) + 0.022(S - 54) + 0.42(\text{CGPA} - 7.2) + 0.28(P - 2) + 0.45(I - 0.7) - 0.70 B + 0.45)$$

Where $C$ = Coding Score, $A$ = Aptitude, $S$ = Communication, $P$ = Projects, $I$ = Internships, $B$ = Backlogs.

A Gaussian noise factor ($\epsilon \sim \mathcal{N}(0, 0.45)$) is injected to simulate authentic interview day variance (interviewer subjectivity, behavioral chemistry, and anxiety).

---

## 4. Salary Compensation Model

Annual compensation is modeled continuously in Lakhs Per Annum (LPA) bounded between **3.2 LPA** (entry service baseline) and **22.5 LPA** (tier-1 product engineering compensation). The central distribution peaks at **11.7 LPA** with standard deviation **2.39 LPA**.

---

## 5. Dataset Ethics & Non-Disclosure Notice
All records are programmatically synthesized. No student privacy, personal identification, or confidential university data was accessed or harvested.
