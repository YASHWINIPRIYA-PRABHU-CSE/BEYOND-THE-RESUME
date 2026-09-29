import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, StudentProfile, PredictionLog
from ..schemas import PredictionRequest, PlacementPredictionOut, SalaryPredictionOut
from ..services.auth_service import get_current_user
from ..services.ml_service import ml_service

router = APIRouter(prefix="/predictions", tags=["ML Predictions & Career Readiness"])

def _extract_user_features(user: User, db: Session, req: PredictionRequest = None) -> dict:
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == user.id).first()
    
    # Defaults or profile values
    cgpa = profile.cgpa if profile else 7.8
    backlogs = profile.backlogs if profile else 0
    coding = profile.coding_score if profile else 68
    aptitude = profile.aptitude_score if profile else 72
    comm = profile.communication_score if profile else 70
    resume = profile.resume_score if profile else 74

    # Count projects & internships
    projects_count = 2
    internships_count = 1
    certs_count = 1
    if profile:
        try:
            projects_count = len(json.loads(profile.projects_json or "[]"))
        except Exception:
            projects_count = 2
        try:
            internships_count = len(json.loads(profile.internships_json or "[]"))
        except Exception:
            internships_count = 1
        try:
            certs_count = len(json.loads(profile.certifications_json or "[]"))
        except Exception:
            certs_count = 1

    # Override if explicitly requested in form
    if req:
        if req.cgpa is not None: cgpa = req.cgpa
        if req.backlogs is not None: backlogs = req.backlogs
        if req.coding_score is not None: coding = req.coding_score
        if req.aptitude_score is not None: aptitude = req.aptitude_score
        if req.communication_score is not None: comm = req.communication_score
        if req.resume_score is not None: resume = req.resume_score
        if req.projects_count is not None: projects_count = req.projects_count
        if req.internships_count is not None: internships_count = req.internships_count
        if req.certifications_count is not None: certs_count = req.certifications_count

    return {
        "cgpa": cgpa,
        "backlogs": backlogs,
        "projects_count": projects_count,
        "internships_count": internships_count,
        "certifications_count": certs_count,
        "coding_score": coding,
        "aptitude_score": aptitude,
        "communication_score": comm,
        "resume_score": resume
    }

@router.post("/placement", response_model=PlacementPredictionOut)
def predict_placement_endpoint(
    req: PredictionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    features = _extract_user_features(current_user, db, req)
    model_choice = req.model_choice or "Random Forest"
    result = ml_service.predict_placement(features, model_choice=model_choice)
    return result

@router.post("/salary", response_model=SalaryPredictionOut)
def predict_salary_endpoint(
    req: PredictionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    features = _extract_user_features(current_user, db, req)
    result = ml_service.predict_salary(features)
    return result

@router.get("/cluster")
def get_talent_cluster_endpoint(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    features = _extract_user_features(current_user, db)
    result = ml_service.predict_cluster(features)

    # Persist cluster in student profile
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if profile:
        profile.cluster_id = result["cluster_id"]
        profile.cluster_label = result["archetype"]
        db.commit()

    return result

@router.get("/overview")
def get_comprehensive_overview(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    features = _extract_user_features(current_user, db)
    placement_res = ml_service.predict_placement(features, model_choice="Random Forest")
    salary_res = ml_service.predict_salary(features)
    cluster_res = ml_service.predict_cluster(features)

    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()

    return {
        "placement": placement_res,
        "salary": salary_res,
        "cluster": cluster_res,
        "profile_completion": profile.completion_percentage if profile else 85,
        "preferred_role": profile.preferred_role if profile else "Full Stack Developer",
        "scores": {
            "career_readiness": int(sum(placement_res["readiness_dna"].values()) / len(placement_res["readiness_dna"])),
            "coding_score": features["coding_score"],
            "aptitude_score": features["aptitude_score"],
            "communication_score": features["communication_score"],
            "resume_score": features["resume_score"]
        }
    }
