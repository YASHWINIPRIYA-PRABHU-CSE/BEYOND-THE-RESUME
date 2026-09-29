import json
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, ResumeUpload, StudentProfile
from ..schemas import JobMatchRequest, JobMatchOut
from ..services.auth_service import get_current_user
from ..services.resume_parser import resume_parser

router = APIRouter(prefix="/resume", tags=["Resume Intelligence"])

ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"]
MAX_FILE_SIZE = 10 * 1024 * 1024 # 10MB

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    target_role: str = Form("Software Developer"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    filename = file.filename or "resume.txt"
    ext = "." + filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format. Please upload {', '.join(ALLOWED_EXTENSIONS)}."
        )

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds the 10MB limit."
        )

    # Extract text using robust parser
    raw_text = resume_parser.extract_text_from_bytes(content, filename)
    if not raw_text or len(raw_text.strip()) < 30:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not extract readable text from the document. Please ensure it is not scanned/empty."
        )

    # Perform comprehensive NLP analysis
    analysis = resume_parser.analyze_resume(raw_text, target_role=target_role)

    # Save to database
    resume_record = ResumeUpload(
        user_id=current_user.id,
        filename=filename,
        file_type=ext.replace(".", "").upper(),
        raw_text=raw_text[:5000], # store clean snippet
        score=analysis["score"],
        extracted_skills_json=json.dumps(analysis["extracted_skills"]),
        detected_sections_json=json.dumps(analysis["detected_sections"]),
        section_completeness_json=json.dumps(analysis["section_completeness"]),
        suggested_improvements_json=json.dumps(analysis["suggested_improvements"]),
        missing_keywords_json=json.dumps(analysis["missing_role_skills"])
    )
    db.add(resume_record)

    # Also update student profile resume score
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if profile:
        profile.resume_score = analysis["score"]

    db.commit()
    db.refresh(resume_record)

    return {
        "id": resume_record.id,
        "filename": filename,
        "file_type": resume_record.file_type,
        "target_role": target_role,
        "analysis": analysis
    }

@router.get("/latest")
def get_latest_resume(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    latest = db.query(ResumeUpload).filter(ResumeUpload.user_id == current_user.id).order_by(ResumeUpload.id.desc()).first()
    if not latest:
        # Generate default sample analysis
        sample_text = """
        John Doe | Software Engineer | Email: john@example.com | GitHub: github.com/johndoe
        Education: B.Tech in Computer Science, CGPA: 8.2 (2022 - 2026)
        Technical Skills: Python, JavaScript, TypeScript, React, Node.js, FastAPI, PostgreSQL, Docker, Git, REST APIs, Data Structures
        Experience & Internships: Software Engineering Intern at TechCorp. Built microservices in FastAPI and optimized database queries by 30%.
        Projects: Real-time Chat App with WebSockets & React; ML Churn Classifier with Scikit-Learn.
        Certifications: AWS Certified Cloud Practitioner
        """
        analysis = resume_parser.analyze_resume(sample_text, target_role="Full Stack Developer")
        return {
            "id": 0,
            "filename": "Sample_Candidate_Profile.pdf",
            "file_type": "PDF",
            "target_role": "Full Stack Developer",
            "analysis": analysis
        }

    analysis = {
        "score": latest.score,
        "role_match_percentage": 78.5,
        "extracted_skills": json.loads(latest.extracted_skills_json or "[]"),
        "detected_sections": json.loads(latest.detected_sections_json or "{}"),
        "section_completeness": json.loads(latest.section_completeness_json or "{}"),
        "suggested_improvements": json.loads(latest.suggested_improvements_json or "[]"),
        "missing_role_skills": json.loads(latest.missing_keywords_json or "[]"),
        "summary": f"Analyzed resume '{latest.filename}'. Structural score: {latest.score}/100."
    }
    return {
        "id": latest.id,
        "filename": latest.filename,
        "file_type": latest.file_type,
        "target_role": "Software Developer",
        "analysis": analysis
    }

@router.post("/match-jd", response_model=JobMatchOut)
def match_job_description(
    req: JobMatchRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    user_skills = []
    if profile:
        raw_skills = f"{profile.technical_skills}, {profile.frameworks}, {profile.databases}, {profile.cloud_tools}"
        user_skills = [s.strip() for s in raw_skills.split(",") if s.strip()]

    result = resume_parser.match_job_description(
        req.job_description,
        user_skills=user_skills,
        target_role=req.target_role or "Software Developer"
    )
    return result
