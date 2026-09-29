# System Limitations & Known Constraints

## 1. Machine Learning & Predictive Limitations

### A. Situational Interview Variance
- Machine learning models trained on tabular profiles cannot capture real-time interview day dynamics, such as interview panel subjectivity, interpersonal chemistry, acute test anxiety, or spontaneous problem-solving breakthroughs.
- The 75.8% test accuracy intentionally models this natural uncertainty rather than creating an artificial 99% fit.

### B. Synthetic Benchmark Domain Boundaries
- While the 25,000-sample dataset models empirical multi-variate distributions with high fidelity, extreme macroeconomic anomalies (e.g., sudden hiring freezes or sudden tech sector lay-offs) will cause temporal distribution drift in starting salary bands.

---

## 2. Natural Language Processing (NLP) Constraints

### A. Document Layout Parsing
- The resume extractor performs text stream tokenization via `pypdf` and `python-docx`. Complex non-linear multi-column tables, scanned image-only PDFs without OCR text layers, or graphical infographic resumes may suffer text stream fragmentation.
- Candidates are advised to utilize clean, standard single-column ATS templates.

### B. Automated Interview Feedback
- Automated mock interview scoring evaluates terminology density, structural markers (STAR framework indicators), and response length. It approximates technical completeness but does not evaluate vocal tone, body language, or facial micro-expressions.

---

## 3. Scope Boundaries (Honest Academic Disclosure)
- **Scraping**: The platform does not scrape commercial job boards (e.g. LinkedIn, Indeed) to adhere to Terms of Service and legal standards. It utilizes sample job profiles and user-pasted job descriptions for TF-IDF matching.
- **Reinforcement Learning**: Reinforcement learning (Q-Learning) is presented in an educational simulation module (Unit 5) to demonstrate MDP concepts and is not falsely claimed as the primary career classifier.
