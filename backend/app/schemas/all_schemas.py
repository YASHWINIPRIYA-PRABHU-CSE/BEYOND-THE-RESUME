from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

# ================= AUTH SCHEMAS =================
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str
    role: str = "student" # student, recruiter, institution, admin

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

# ================= PROFILE SCHEMAS =================
class ProfileUpdate(BaseModel):
    department: Optional[str] = None
    year_of_study: Optional[str] = None
    cgpa: Optional[float] = None
    backlogs: Optional[int] = None
    technical_skills: Optional[str] = None
    frameworks: Optional[str] = None
    databases: Optional[str] = None
    cloud_tools: Optional[str] = None
    soft_skills: Optional[str] = None
    projects_json: Optional[str] = None
    internships_json: Optional[str] = None
    certifications_json: Optional[str] = None
    coding_score: Optional[int] = None
    aptitude_score: Optional[int] = None
    communication_score: Optional[int] = None
    preferred_role: Optional[str] = None
    preferred_industry: Optional[str] = None
    target_companies: Optional[str] = None

class ProfileOut(BaseModel):
    id: int
    user_id: int
    department: str
    year_of_study: str
    cgpa: float
    backlogs: int
    technical_skills: str
    frameworks: str
    databases: str
    cloud_tools: str
    soft_skills: str
    projects_json: str
    internships_json: str
    certifications_json: str
    coding_score: int
    aptitude_score: int
    communication_score: int
    resume_score: int
    preferred_role: str
    preferred_industry: str
    target_companies: str
    completion_percentage: int
    cluster_id: int
    cluster_label: str

    class Config:
        from_attributes = True

# ================= RESUME & NLP SCHEMAS =================
class ResumeAnalysisOut(BaseModel):
    filename: str
    file_type: str
    score: int
    extracted_skills: List[str]
    detected_sections: Dict[str, bool]
    section_completeness: Dict[str, int]
    suggested_improvements: List[str]
    missing_keywords: List[str]
    summary: str

class JobMatchRequest(BaseModel):
    target_role: Optional[str] = None
    job_description: str

class JobMatchOut(BaseModel):
    match_percentage: float
    matching_skills: List[str]
    missing_skills: List[str]
    role_keywords_found: List[str]
    recommended_improvements: List[str]
    verdict: str

# ================= ML PREDICTION SCHEMAS =================
class PredictionRequest(BaseModel):
    cgpa: Optional[float] = None
    backlogs: Optional[int] = None
    projects_count: Optional[int] = None
    internships_count: Optional[int] = None
    certifications_count: Optional[int] = None
    coding_score: Optional[int] = None
    aptitude_score: Optional[int] = None
    communication_score: Optional[int] = None
    resume_score: Optional[int] = None
    model_choice: Optional[str] = "Random Forest" # "Logistic Regression", "Random Forest", "Neural Network"

class PlacementPredictionOut(BaseModel):
    placement_status: int # 1 = Placed / High Readiness, 0 = Needs Structured Preparation
    placement_label: str
    placement_probability: float
    model_used: str
    confidence: str
    readiness_dna: Dict[str, int]
    contributing_factors: List[Dict[str, Any]]
    explanation: str

class SalaryPredictionOut(BaseModel):
    estimated_salary_lpa: float
    salary_range_low: float
    salary_range_high: float
    primary_influencing_factors: List[Dict[str, Any]]
    model_r2_score: float
    disclaimer: str

# ================= CAREER & ROADMAP SCHEMAS =================
class CareerRecommendationItem(BaseModel):
    role_name: str
    match_score: int
    readiness_level: str
    why_recommended: str
    matching_skills: List[str]
    missing_skills: List[str]
    suggested_projects: List[str]
    typical_salary_range: str
    industry_demand: str

class NextThreeMovesOut(BaseModel):
    moves: List[Dict[str, Any]]

class SkillGapItem(BaseModel):
    skill_name: str
    category: str
    importance: str # High, Critical, Medium
    current_status: str # Missing, Developing, Mastered
    recommended_action: str
    learning_resource: str

class SkillGapOut(BaseModel):
    target_role: str
    overall_gap_percentage: int
    skills: List[SkillGapItem]
    radar_data: List[Dict[str, Any]]

class RoadmapMilestone(BaseModel):
    id: int
    stage: str
    stage_index: int
    title: str
    description: str
    skills: List[str]
    project_recommendation: str
    effort_hours: int
    is_completed: bool

class RoadmapOut(BaseModel):
    target_role: str
    current_stage: str
    progress_percentage: int
    milestones: List[RoadmapMilestone]

# ================= INTERVIEW SCHEMAS =================
class InterviewQuestionOut(BaseModel):
    id: int
    category: str
    role: str
    question: str
    star_guidance: str
    expected_keywords: List[str]

class InterviewEvaluateRequest(BaseModel):
    question_id: int
    role: str
    user_answer: str

class InterviewEvaluationOut(BaseModel):
    overall_score: int
    clarity_score: int
    completeness_score: int
    star_alignment_score: int
    feedback: str
    strong_points: List[str]
    missing_concepts: List[str]
    improvement_plan: str

# ================= ASSESSMENT SCHEMAS =================
class QuestionOut(BaseModel):
    id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    difficulty: str

class AssessmentOut(BaseModel):
    id: int
    category: str
    title: str
    description: str
    time_limit_minutes: int
    total_questions: int
    questions: List[QuestionOut]

class SubmitQuizRequest(BaseModel):
    assessment_id: int
    answers: Dict[int, str] # question_id -> chosen option ("A", "B", "C", "D")

class QuizResultOut(BaseModel):
    attempt_id: int
    score: int
    total: int
    percentage: float
    category: str
    skill_confidence_vs_evidence: Dict[str, Any]
    detailed_feedback: List[Dict[str, Any]]
