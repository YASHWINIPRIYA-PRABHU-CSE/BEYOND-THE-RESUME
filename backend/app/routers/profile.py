from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, StudentProfile
from ..schemas import ProfileOut, ProfileUpdate
from ..services.auth_service import get_current_user

router = APIRouter(prefix="/profile", tags=["Student Profile"])

@router.get("", response_model=ProfileOut)
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        # Create default profile
        profile = StudentProfile(
            user_id=current_user.id,
            department="Computer Science",
            year_of_study="Final Year",
            cgpa=7.8,
            coding_score=68,
            aptitude_score=72,
            communication_score=70,
            resume_score=74,
            preferred_role="Full Stack Developer",
            preferred_industry="SaaS & Product Tech",
            technical_skills="Python, JavaScript, React, SQL, Git",
            completion_percentage=85,
            cluster_id=0,
            cluster_label="Technically Strong"
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("", response_model=ProfileOut)
def update_profile(
    profile_in: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)

    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)

    # Recalculate completion percentage
    filled_fields = sum(1 for v in [
        profile.department, profile.cgpa, profile.technical_skills,
        profile.frameworks, profile.databases, profile.projects_json,
        profile.preferred_role, profile.target_companies
    ] if v)
    profile.completion_percentage = min(100, int((filled_fields / 8.0) * 100))

    db.commit()
    db.refresh(profile)
    return profile
