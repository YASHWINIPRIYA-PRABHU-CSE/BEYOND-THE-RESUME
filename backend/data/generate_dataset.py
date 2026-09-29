"""
Beyond The Resume - Dataset Generation Script
Generates 25,000 realistic synthetic records for Career Intelligence & Talent Readiness Modeling.
All distributions and correlations are based on empirical patterns observed in higher education & placement data.
"""

import os
import numpy as np
import pandas as pd

def generate_career_dataset(num_records=25000, seed=42):
    np.random.seed(seed)
    print(f"Generating {num_records} realistic talent records with balanced, realistic placement distributions...")

    student_ids = [f"BTR-{10000 + i}" for i in range(num_records)]
    
    departments = np.random.choice(
        ["Computer Science", "Information Technology", "AI & Machine Learning", "Data Science", "Electronics & Comm", "Electrical Engineering"],
        size=num_records,
        p=[0.35, 0.25, 0.15, 0.10, 0.10, 0.05]
    )

    # Academic metrics
    # CGPA centered around 7.4 with standard deviation 0.95, clipped [5.0, 9.8]
    cgpa = np.clip(np.random.normal(7.4, 0.95, num_records), 5.0, 9.8)
    cgpa = np.round(cgpa, 2)

    # Backlogs (correlated negatively with CGPA)
    backlog_prob = np.clip(0.40 - (cgpa - 5.0) * 0.08, 0.03, 0.50)
    has_backlogs = np.random.binomial(1, backlog_prob)
    backlogs = np.where(has_backlogs == 1, np.random.choice([1, 2, 3], size=num_records, p=[0.65, 0.25, 0.10]), 0)

    # Practical experience metrics
    # Projects: correlated with CGPA and department
    cs_boost = np.isin(departments, ["Computer Science", "Information Technology", "AI & Machine Learning", "Data Science"]).astype(int)
    projects_base = (cgpa / 3.0) + (cs_boost * 0.7) + np.random.normal(0, 0.9, num_records)
    projects_count = np.clip(np.round(projects_base), 0, 6).astype(int)

    # Internships: 0 to 3
    internship_prob = np.clip(0.10 + (cgpa - 6.5) * 0.15 + (projects_count * 0.08), 0.04, 0.75)
    internships_count = np.random.binomial(3, internship_prob / 3.0)

    # Certifications: 0 to 5
    cert_base = np.random.poisson(1.5, num_records)
    certifications_count = np.clip(cert_base, 0, 5)

    # Assessment & Skill Scores [0 to 100]
    coding_base = 32 + (projects_count * 5.5) + (cs_boost * 8) + ((cgpa - 6.0) * 4.5) + np.random.normal(0, 9, num_records)
    coding_score = np.clip(np.round(coding_base), 20, 98).astype(int)

    aptitude_base = 38 + ((cgpa - 6.0) * 7.5) + np.random.normal(0, 10, num_records)
    aptitude_score = np.clip(np.round(aptitude_base), 25, 98).astype(int)

    comm_base = 40 + np.random.normal(18, 12, num_records) + ((cgpa - 7.0) * 1.8)
    communication_score = np.clip(np.round(comm_base), 30, 98).astype(int)

    resume_base = 32 + (projects_count * 4.5) + (internships_count * 5.0) + (certifications_count * 2.5) + np.random.normal(0, 7, num_records)
    resume_score = np.clip(np.round(resume_base), 30, 95).astype(int)

    # Specific technical competencies (scale 0-3: None=0, Beginner=1, Intermediate=2, Advanced=3)
    dsa_level = np.clip(np.round((coding_score - 25) / 24), 0, 3).astype(int)
    web_dev_level = np.clip(np.round(np.random.normal(1.2, 0.9, num_records) + (cs_boost * 0.3)), 0, 3).astype(int)
    ml_ai_level = np.clip(np.round(np.random.normal(0.8, 0.8, num_records) + (departments == "AI & Machine Learning") * 1.1), 0, 3).astype(int)
    cloud_devops_level = np.clip(np.round(np.random.normal(0.7, 0.8, num_records) + (internships_count * 0.3)), 0, 3).astype(int)
    db_sql_level = np.clip(np.round((coding_score / 38) + np.random.normal(0, 0.5, num_records)), 0, 3).astype(int)

    # Preferred career roles
    role_choices = [
        "Software Developer", "Full Stack Developer", "Data Scientist", 
        "Machine Learning Engineer", "Cloud & DevOps Engineer", 
        "Cybersecurity Analyst", "Data Analyst", "QA & Test Automation"
    ]
    preferred_role = np.random.choice(role_choices, size=num_records, p=[0.24, 0.20, 0.12, 0.12, 0.10, 0.08, 0.09, 0.05])

    # Career Readiness Score (Composite 0-100)
    readiness_composite = (
        0.22 * coding_score +
        0.18 * aptitude_score +
        0.14 * communication_score +
        0.12 * resume_score +
        0.10 * (cgpa * 9.5) +
        0.10 * (projects_count * 9) +
        0.08 * (internships_count * 12) +
        0.06 * (certifications_count * 6) -
        (backlogs * 5.0)
    )
    career_readiness_score = np.clip(np.round(readiness_composite), 15, 98).astype(int)

    # Placement Outcome Calibration: target ~67% placed, ~33% not placed
    # Standardize factors to mean 0
    logit = (
        0.038 * (coding_score - 55) +
        0.028 * (aptitude_score - 52) +
        0.022 * (communication_score - 54) +
        0.42 * (cgpa - 7.2) +
        0.28 * (projects_count - 2) +
        0.45 * (internships_count - 0.7) +
        0.015 * (resume_score - 52) -
        0.70 * backlogs +
        0.45 # Intercept tuning
    )
    placement_prob = 1.0 / (1.0 + np.exp(-logit))
    # Add minor randomness for realistic boundary cases
    placement_status = np.random.binomial(1, placement_prob)

    # Salary Estimation (in LPA - Lakhs Per Annum)
    # Base 3.5 LPA. Median entry package ~6.8 LPA, top ~18-22 LPA.
    salary_raw = (
        3.5 +
        ((coding_score - 20) / 78.0) * 4.2 +
        ((cgpa - 5.0) / 4.8) * 2.2 +
        (internships_count * 1.4) +
        (projects_count * 0.5) +
        ((aptitude_score - 25) / 73.0) * 1.2 +
        ((communication_score - 30) / 68.0) * 1.0 +
        (dsa_level * 0.7) +
        (ml_ai_level * 0.5) +
        (cloud_devops_level * 0.5) -
        (backlogs * 0.4) +
        np.random.normal(0, 0.45, num_records)
    )
    salary_lpa = np.clip(np.round(salary_raw, 2), 3.2, 22.5)

    df = pd.DataFrame({
        "student_id": student_ids,
        "department": departments,
        "cgpa": cgpa,
        "backlogs": backlogs,
        "projects_count": projects_count,
        "internships_count": internships_count,
        "certifications_count": certifications_count,
        "coding_score": coding_score,
        "aptitude_score": aptitude_score,
        "communication_score": communication_score,
        "resume_score": resume_score,
        "dsa_level": dsa_level,
        "web_dev_level": web_dev_level,
        "ml_ai_level": ml_ai_level,
        "cloud_devops_level": cloud_devops_level,
        "db_sql_level": db_sql_level,
        "preferred_role": preferred_role,
        "career_readiness_score": career_readiness_score,
        "placement_status": placement_status,
        "salary_lpa": salary_lpa
    })

    output_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(output_dir, "career_intelligence_25k.csv")
    df.to_csv(output_path, index=False)
    print(f"Successfully generated dataset at: {output_path}")
    print(f"Dataset shape: {df.shape}")
    print(f"Placement balance:\n{df['placement_status'].value_counts(normalize=True)}")
    print(f"Salary stats (LPA):\n{df['salary_lpa'].describe()}")
    return output_path

if __name__ == "__main__":
    generate_career_dataset(25000)
