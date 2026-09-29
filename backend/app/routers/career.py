import json
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, StudentProfile, RoadmapItem
from ..schemas import CareerRecommendationItem, SkillGapOut, NextThreeMovesOut, RoadmapOut
from ..services.auth_service import get_current_user
from ..services.career_engine import career_engine

router = APIRouter(prefix="/career", tags=["Career Intelligence & Roadmaps"])

DEFAULT_ROADMAP_STAGES = [
    {
        "stage": "Stage 1: Engineering Foundations",
        "stage_index": 1,
        "title": "Data Structures & Computational Problem Solving",
        "description": "Master Arrays, Two-Pointer technique, Hash Maps, and Binary Search with 25 solved problems.",
        "skills": ["Algorithms", "Data Structures", "Big-O Analysis"],
        "project_recommendation": "Algorithmic Complexity & Benchmark Visualizer CLI tool",
        "effort_hours": 20
    },
    {
        "stage": "Stage 2: Core Development Stack",
        "stage_index": 2,
        "title": "Backend Architecture & RESTful API Design",
        "description": "Build high-throughput CRUD microservices with database indexing, JWT authentication, and pagination.",
        "skills": ["Python / Node.js", "SQL & Database Indexing", "FastAPI / Express", "Git"],
        "project_recommendation": "Authentication & Rate-Limited API Gateway with Redis",
        "effort_hours": 30
    },
    {
        "stage": "Stage 3: Practical Capstone Projects",
        "stage_index": 3,
        "title": "Full-Stack Production Application Deployment",
        "description": "Develop and deploy an end-to-end multi-tenant application with client-side state and cloud database.",
        "skills": ["React / Frontend", "PostgreSQL", "Docker", "Tailwind CSS"],
        "project_recommendation": "Collaborative Real-Time Workspace with WebSocket Sync",
        "effort_hours": 35
    },
    {
        "stage": "Stage 4: Advanced Specialization & Cloud",
        "stage_index": 4,
        "title": "Cloud Infrastructure & CI/CD Automation",
        "description": "Containerize services using Docker, configure automated GitHub Actions pipelines, and deploy on AWS / Cloud.",
        "skills": ["Docker", "AWS / Cloud", "GitHub Actions CI/CD", "Linux"],
        "project_recommendation": "Automated Multi-Stage CI/CD Deployment with Container Health Checks",
        "effort_hours": 25
    },
    {
        "stage": "Stage 5: Interview Readiness & Portfolio Polish",
        "stage_index": 5,
        "title": "System Design & Mock Technical Interviews",
        "description": "Practice architectural system design interviews, polish STAR-method responses, and optimize GitHub documentation.",
        "skills": ["System Design", "Behavioral Interviews", "STAR Method", "Resume Optimization"],
        "project_recommendation": "Public Technical Blog & Open-Source Pull Request contribution",
        "effort_hours": 15
    }
]

@router.get("/recommendations")
def get_recommendations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    user_skills = []
    preferred_role = ""
    if profile:
        raw_skills = f"{profile.technical_skills}, {profile.frameworks}, {profile.databases}, {profile.cloud_tools}"
        user_skills = [s.strip() for s in raw_skills.split(",") if s.strip()]
        preferred_role = profile.preferred_role or ""

    recs = career_engine.get_recommendations(user_skills, preferred_role=preferred_role)
    return recs

@router.get("/skill-gap", response_model=SkillGapOut)
def get_skill_gap(
    target_role: str = Query("Full Stack Developer"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    user_skills = []
    if profile:
        raw_skills = f"{profile.technical_skills}, {profile.frameworks}, {profile.databases}, {profile.cloud_tools}"
        user_skills = [s.strip() for s in raw_skills.split(",") if s.strip()]

    gap_data = career_engine.analyze_skill_gap(target_role, user_skills)
    return gap_data

@router.get("/next-three-moves", response_model=NextThreeMovesOut)
def get_next_three_moves(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    user_data = {
        "coding_score": profile.coding_score if profile else 68,
        "resume_score": profile.resume_score if profile else 74,
        "projects_count": 2,
        "preferred_role": profile.preferred_role if profile else "Full Stack Developer"
    }
    moves = career_engine.get_next_three_moves(user_data)
    return {"moves": moves}

@router.get("/roadmap", response_model=RoadmapOut)
def get_learning_roadmap(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    role = profile.preferred_role if profile else "Full Stack Developer"

    # Query existing roadmap items for user or initialize
    existing_items = db.query(RoadmapItem).filter(RoadmapItem.user_id == current_user.id).order_by(RoadmapItem.stage_index).all()
    if not existing_items:
        for idx, stage in enumerate(DEFAULT_ROADMAP_STAGES):
            item = RoadmapItem(
                user_id=current_user.id,
                stage_index=stage["stage_index"],
                stage_name=stage["stage"],
                title=stage["title"],
                description=stage["description"],
                skills_json=json.dumps(stage["skills"]),
                project_recommendation=stage["project_recommendation"],
                effort_hours=stage["effort_hours"],
                is_completed=(idx == 0) # first stage complete by default
            )
            db.add(item)
        db.commit()
        existing_items = db.query(RoadmapItem).filter(RoadmapItem.user_id == current_user.id).order_by(RoadmapItem.stage_index).all()

    completed_count = sum(1 for item in existing_items if item.is_completed)
    total_count = len(existing_items)
    progress_pct = int((completed_count / max(1, total_count)) * 100)

    milestones = []
    for item in existing_items:
        milestones.append({
            "id": item.id,
            "stage": item.stage_name,
            "stage_index": item.stage_index,
            "title": item.title,
            "description": item.description,
            "skills": json.loads(item.skills_json or "[]"),
            "project_recommendation": item.project_recommendation,
            "effort_hours": item.effort_hours,
            "is_completed": item.is_completed
        })

    current_stage = "Stage 2: Core Development Stack" if completed_count == 1 else "Stage 3: Practical Capstone Projects"

    return {
        "target_role": role,
        "current_stage": current_stage,
        "progress_percentage": progress_pct,
        "milestones": milestones
    }

@router.post("/roadmap/toggle/{item_id}")
def toggle_roadmap_milestone(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    item = db.query(RoadmapItem).filter(RoadmapItem.id == item_id, RoadmapItem.user_id == current_user.id).first()
    if item:
        item.is_completed = not item.is_completed
        db.commit()
    return {"success": True, "is_completed": item.is_completed if item else False}
