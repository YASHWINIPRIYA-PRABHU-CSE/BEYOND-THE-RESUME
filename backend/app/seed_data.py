import json
from sqlalchemy.orm import Session
from .database import engine, SessionLocal, Base
from .models import User, StudentProfile, ResumeUpload
from .services.auth_service import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(User).filter(User.email == "student@beyondtheresume.ai").first():
            print("Database already contains seed users.")
            return

        print("Seeding initial demo users and profiles for all 4 roles...")

        # 1. Student Demo User
        student_user = User(
            email="student@beyondtheresume.ai",
            hashed_password=get_password_hash("Student@123"),
            full_name="Aarav Sharma",
            role="student"
        )
        db.add(student_user)
        db.commit()
        db.refresh(student_user)

        sample_projects = [
            {
                "title": "Cloud-Native Task Orchestrator",
                "tech": "React, FastAPI, Docker, PostgreSQL",
                "desc": "Architected distributed asynchronous task worker pipeline with Redis queue; decreased execution latency by 32%."
            },
            {
                "title": "Predictive Customer Churn Classifier",
                "tech": "Python, Scikit-Learn, Streamlit, SHAP",
                "desc": "Trained Random Forest model achieving 84% ROC-AUC; built interactive interpretability dashboard."
            },
            {
                "title": "Real-Time Collaborative Code Editor",
                "tech": "TypeScript, WebSockets, Node.js",
                "desc": "Built operational transformation engine supporting 50+ concurrent users with zero race conditions."
            }
        ]

        sample_internships = [
            {
                "company": "Cognizant Technology Solutions",
                "role": "Software Engineering Intern",
                "duration": "June 2025 - August 2025",
                "desc": "Optimized microservice API response times from 420ms to 180ms through database query indexing and Redis caching."
            }
        ]

        sample_certs = [
            {"title": "AWS Certified Solutions Architect - Associate", "issuer": "Amazon Web Services", "year": "2025"},
            {"title": "Deep Learning Specialization", "issuer": "DeepLearning.AI", "year": "2024"}
        ]

        student_profile = StudentProfile(
            user_id=student_user.id,
            department="Computer Science",
            year_of_study="Final Year",
            cgpa=8.45,
            backlogs=0,
            technical_skills="Python, JavaScript, TypeScript, SQL, Data Structures, Algorithms, Git, Linux",
            frameworks="React, FastAPI, Node.js, Express, Tailwind CSS",
            databases="PostgreSQL, MongoDB, Redis, SQLite",
            cloud_tools="AWS, Docker, GitHub Actions, Linux",
            soft_skills="Technical Communication, Problem Solving, Agile Leadership, STAR Interviewing",
            projects_json=json.dumps(sample_projects),
            internships_json=json.dumps(sample_internships),
            certifications_json=json.dumps(sample_certs),
            coding_score=82,
            aptitude_score=78,
            communication_score=80,
            resume_score=84,
            preferred_role="Full Stack Developer",
            preferred_industry="Enterprise SaaS & Fintech",
            target_companies="Microsoft, Stripe, Razorpay, Atlassian, Google",
            completion_percentage=95,
            cluster_id=0,
            cluster_label="Technically Strong"
        )
        db.add(student_profile)

        # 2. Recruiter Demo User
        recruiter_user = User(
            email="recruiter@techhire.com",
            hashed_password=get_password_hash("Recruiter@123"),
            full_name="Sarah Jenkins",
            role="recruiter"
        )
        db.add(recruiter_user)

        # 3. Institution / Placement Cell Demo User
        institution_user = User(
            email="placement@university.edu",
            hashed_password=get_password_hash("Admin@123"),
            full_name="Dr. Rajesh Raman (Dean of Placements)",
            role="institution"
        )
        db.add(institution_user)

        # 4. Platform Admin Demo User
        admin_user = User(
            email="admin@beyondtheresume.ai",
            hashed_password=get_password_hash("Admin@123"),
            full_name="System Administrator",
            role="admin"
        )
        db.add(admin_user)

        db.commit()
        print("Database successfully seeded with demo credentials for all roles!")

    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
