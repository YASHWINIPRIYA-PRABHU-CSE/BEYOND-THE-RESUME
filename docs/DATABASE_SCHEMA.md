# Database Schema & Entity Relationship Architecture

## 1. Storage Engine
Beyond The Resume utilizes **SQLAlchemy 2.0 ORM** with **SQLite embedded storage** (`beyond_the_resume.db`). It enforces referential integrity via foreign key constraints, indexed email Lookups, and serialised JSON columns for complex multi-attribute project structures.

---

## 2. Entity Relationship Diagram (ERD)

```
       +---------------------------------------------+
       |                   USERS                     |
       +---------------------------------------------+
       | PK  id: Integer                             |
       |     email: String(255) [UNIQUE, INDEX]      |
       |     hashed_password: String(255)            |
       |     full_name: String(255)                  |
       |     role: String(50) [student/recruiter...] |
       |     created_at: DateTime                    |
       +-------+---------+--------+--------+---------+
               |         |        |        |         |
      1:1      |     1:N |    1:N |    1:N |     1:N |     1:N
      +--------+     +---+    +---+    +---+     +---+     +---+
      |              |        |        |         |             |
      v              v        v        v         v             v
+-----------+  +--------+ +------+ +-------+ +----------+ +-----------+
| STUDENT_  |  | RESUME_| | QUIZ_| |ROADMAP| | MOCK_    | |PREDICTION_|
| PROFILES  |  | UPLOADS| |ATTMPT| | ITEMS | | INTERVIEW| | LOGS      |
+-----------+  +--------+ +------+ +-------+ +----------+ +-----------+
| PK id     |  | PK id  | | PK id| | PK id | | PK id    | | PK id     |
| FK user_id|  | FK user| | FK us| | FK us | | FK user  | | FK user   |
| department|  | score  | | score| | stage | | role     | | prob      |
| cgpa      |  | skills | | total| | is_don| | clarity  | | salary_lpa|
| skills    |  | text   | | break| | effort| | feedback | | factors   |
+-----------+  +--------+ +------+ +-------+ +----------+ +-----------+
```

---

## 3. Relational Table Specifications

### A. `users`
- Stores authentication credentials and system role.
- Roles: `student`, `recruiter`, `institution`, `admin`.

### B. `student_profiles`
- Stores candidate academic trajectory (`cgpa`, `backlogs`, `department`, `year_of_study`).
- Stores normalized technical skills, frameworks, databases, and cloud tools.
- Stores nested JSON records for projects, internships, and certifications.
- Tracks `completion_percentage` and assigned `cluster_id` / `cluster_label`.

### C. `resume_uploads`
- Archives raw text streams and filename metadata.
- Stores ATS structural audit score, extracted skill lists, detected sections, and suggested bullet rewrites.

### D. `quiz_attempts` & `assessments`
- `assessments`: Defines categories (Programming, DSA, SQL, ML) and time limits.
- `assessment_questions`: Contains MCQ options, correct keys, explanations, and difficulty ratings.
- `quiz_attempts`: Logs user score, percentage, and detailed question-by-question breakdown.

### E. `roadmap_items`
- Represents milestone progression across the 5 learning stages.
- Flags task completion status (`is_completed`) and estimated effort in hours.

### F. `mock_interviews`
- Logs user-submitted answers for technical and behavioral questions.
- Records scores for Clarity, Completeness, and STAR Alignment along with constructive NLP feedback.

### G. `prediction_logs`
- Historical audit trail of placement readiness predictions and salary estimations with contributing factors.
