import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="student", nullable=False) # student, recruiter, institution, admin
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    profile = relationship("StudentProfile", back_populates="user", uselist=False)
    resumes = relationship("ResumeUpload", back_populates="user")
    quiz_attempts = relationship("QuizAttempt", back_populates="user")
    roadmaps = relationship("RoadmapItem", back_populates="user")
    interviews = relationship("MockInterviewSession", back_populates="user")
    predictions = relationship("PredictionLog", back_populates="user")

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    department = Column(String(100), default="Computer Science")
    year_of_study = Column(String(20), default="Final Year")
    cgpa = Column(Float, default=7.8)
    backlogs = Column(Integer, default=0)
    
    # Skills stored as comma-separated or JSON string
    technical_skills = Column(Text, default="Python, JavaScript, SQL, Git")
    frameworks = Column(Text, default="React, FastAPI, Node.js")
    databases = Column(Text, default="PostgreSQL, MongoDB, MySQL")
    cloud_tools = Column(Text, default="Docker, AWS, Linux")
    soft_skills = Column(Text, default="Problem Solving, Communication, Teamwork")
    
    # Practical records (JSON texts)
    projects_json = Column(Text, default='[{"title":"Smart Task Manager","tech":"React, FastAPI, SQLite","desc":"Full-stack productivity tool with state persistence."}]')
    internships_json = Column(Text, default='[]')
    certifications_json = Column(Text, default='[{"title":"AWS Cloud Foundations","issuer":"AWS","year":"2025"}]')
    
    # Scores & Estimates
    coding_score = Column(Integer, default=65)
    aptitude_score = Column(Integer, default=70)
    communication_score = Column(Integer, default=68)
    resume_score = Column(Integer, default=72)
    
    preferred_role = Column(String(100), default="Full Stack Developer")
    preferred_industry = Column(String(100), default="Fintech & SaaS")
    target_companies = Column(String(255), default="Stripe, Razorpay, Google, Microsoft")
    
    completion_percentage = Column(Integer, default=85)
    cluster_id = Column(Integer, default=0)
    cluster_label = Column(String(100), default="Technically Strong")

    user = relationship("User", back_populates="profile")

class ResumeUpload(Base):
    __tablename__ = "resume_uploads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    raw_text = Column(Text, nullable=False)
    score = Column(Integer, default=70)
    extracted_skills_json = Column(Text, default="[]")
    detected_sections_json = Column(Text, default="{}")
    section_completeness_json = Column(Text, default="{}")
    suggested_improvements_json = Column(Text, default="[]")
    missing_keywords_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="resumes")

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False) # Programming, DSA, SQL, ML, Aptitude, Communication
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    time_limit_minutes = Column(Integer, default=15)
    total_questions = Column(Integer, default=10)

    questions = relationship("AssessmentQuestion", back_populates="assessment")
    attempts = relationship("QuizAttempt", back_populates="assessment")

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    question_text = Column(Text, nullable=False)
    option_a = Column(String(255), nullable=False)
    option_b = Column(String(255), nullable=False)
    option_c = Column(String(255), nullable=False)
    option_d = Column(String(255), nullable=False)
    correct_option = Column(String(10), nullable=False) # "A", "B", "C", "D"
    explanation = Column(Text, nullable=False)
    difficulty = Column(String(20), default="Medium")

    assessment = relationship("Assessment", back_populates="questions")

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    score = Column(Integer, nullable=False)
    total = Column(Integer, nullable=False)
    percentage = Column(Float, nullable=False)
    category = Column(String(100), default="General")
    category_breakdown_json = Column(Text, default="{}")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="quiz_attempts")
    assessment = relationship("Assessment", back_populates="attempts")

class RoadmapItem(Base):
    __tablename__ = "roadmap_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    stage_index = Column(Integer, default=1)
    stage_name = Column(String(100), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    skills_json = Column(Text, default="[]")
    project_recommendation = Column(Text, default="")
    effort_hours = Column(Integer, default=20)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="roadmaps")

class MockInterviewSession(Base):
    __tablename__ = "mock_interviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    role = Column(String(100), nullable=False)
    question_text = Column(Text, nullable=False)
    user_answer = Column(Text, nullable=False)
    clarity_score = Column(Integer, default=70)
    completeness_score = Column(Integer, default=75)
    star_alignment_score = Column(Integer, default=80)
    overall_score = Column(Integer, default=75)
    feedback = Column(Text, nullable=False)
    strong_points_json = Column(Text, default="[]")
    missing_concepts_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="interviews")

class PredictionLog(Base):
    __tablename__ = "prediction_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    model_name = Column(String(100), default="Random Forest Classifier")
    placement_probability = Column(Float, nullable=False)
    placement_status = Column(Integer, nullable=False)
    salary_estimate_lpa = Column(Float, nullable=False)
    salary_range_low = Column(Float, nullable=False)
    salary_range_high = Column(Float, nullable=False)
    readiness_score = Column(Integer, default=70)
    contributing_factors_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="predictions")
