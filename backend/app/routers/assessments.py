import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, StudentProfile, QuizAttempt
from ..schemas import AssessmentOut, SubmitQuizRequest, QuizResultOut
from ..services.auth_service import get_current_user
from ..services.assessment_service import assessment_service

router = APIRouter(prefix="/assessments", tags=["Skill Assessments & Quizzes"])

@router.get("")
def list_assessments():
    return assessment_service.list_assessments()

@router.get("/{assessment_id}", response_model=AssessmentOut)
def get_assessment(assessment_id: int):
    return assessment_service.get_assessment(assessment_id)

@router.post("/submit", response_model=QuizResultOut)
def submit_assessment(
    req: SubmitQuizRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    claimed_skills = []
    if profile:
        claimed_skills = [s.strip() for s in (profile.technical_skills or "").split(",") if s.strip()]

    result = assessment_service.grade_assessment(
        req.assessment_id,
        user_answers=req.answers,
        claimed_skills=claimed_skills
    )

    # Save attempt in database
    attempt = QuizAttempt(
        user_id=current_user.id,
        assessment_id=req.assessment_id,
        score=result["score"],
        total=result["total"],
        percentage=result["percentage"],
        category=result["category"],
        category_breakdown_json=json.dumps(result["detailed_feedback"])
    )
    db.add(attempt)

    # Update student profile score according to quiz category
    if profile:
        if "Programming" in result["category"] or "DSA" in result["category"]:
            profile.coding_score = int((profile.coding_score * 0.4) + (result["percentage"] * 0.6))
        elif "Aptitude" in result["category"]:
            profile.aptitude_score = int((profile.aptitude_score * 0.4) + (result["percentage"] * 0.6))

    db.commit()
    db.refresh(attempt)

    return {
        "attempt_id": attempt.id,
        "score": result["score"],
        "total": result["total"],
        "percentage": result["percentage"],
        "category": result["category"],
        "skill_confidence_vs_evidence": result["skill_confidence_vs_evidence"],
        "detailed_feedback": result["detailed_feedback"]
    }
