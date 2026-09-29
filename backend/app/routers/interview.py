import json
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, StudentProfile, MockInterviewSession
from ..schemas import InterviewQuestionOut, InterviewEvaluateRequest, InterviewEvaluationOut
from ..services.auth_service import get_current_user
from ..services.interview_service import interview_service

router = APIRouter(prefix="/interview", tags=["Mock Interview & Interview Readiness"])

@router.get("/questions")
def get_questions(
    role: str = Query("Software Developer"),
    current_user: User = Depends(get_current_user)
):
    questions = interview_service.get_questions_for_role(role)
    return questions

@router.post("/evaluate", response_model=InterviewEvaluationOut)
def evaluate_interview_response(
    req: InterviewEvaluateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    eval_result = interview_service.evaluate_answer(
        question_id=req.question_id,
        user_answer=req.user_answer,
        role=req.role
    )

    # Save interview attempt in database
    session_record = MockInterviewSession(
        user_id=current_user.id,
        role=req.role,
        question_text=f"Question #{req.question_id}",
        user_answer=req.user_answer,
        clarity_score=eval_result["clarity_score"],
        completeness_score=eval_result["completeness_score"],
        star_alignment_score=eval_result["star_alignment_score"],
        overall_score=eval_result["overall_score"],
        feedback=eval_result["feedback"],
        strong_points_json=json.dumps(eval_result["strong_points"]),
        missing_concepts_json=json.dumps(eval_result["missing_concepts"])
    )
    db.add(session_record)

    # Update communication score in student profile
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if profile:
        profile.communication_score = int((profile.communication_score * 0.7) + (eval_result["overall_score"] * 0.3))

    db.commit()

    return eval_result
