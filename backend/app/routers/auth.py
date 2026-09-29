from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, StudentProfile
from ..schemas import UserCreate, UserLogin, Token, UserOut
from ..services.auth_service import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists.")

    hashed_pw = get_password_hash(user_in.password)
    user = User(
        email=user_in.email,
        hashed_password=hashed_pw,
        full_name=user_in.full_name,
        role=user_in.role
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Automatically initialize default student profile if role is student
    if user.role == "student":
        profile = StudentProfile(
            user_id=user.id,
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

    token = create_access_token(data={"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.post("/login", response_model=Token)
def login(login_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_in.email).first()
    if not user or not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    token = create_access_token(data={"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.get("/me", response_model=UserOut)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user
