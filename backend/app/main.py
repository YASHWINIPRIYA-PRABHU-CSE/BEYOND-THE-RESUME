from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base
from .seed_data import seed_database
from .routers import (
    auth, profile, resume, predictions,
    career, assessments, interview,
    recruiter, institution, ml_insights
)

# Initialize Database tables and Seed Data
Base.metadata.create_all(bind=engine)
try:
    seed_database()
except Exception as e:
    print(f"Warning during seed: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-Powered Career Intelligence and Talent Readiness Platform",
    version=settings.VERSION
)

# Enable CORS for frontend Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all API routers under API_PREFIX (/api)
app.include_router(auth.router, prefix=settings.API_PREFIX)
app.include_router(profile.router, prefix=settings.API_PREFIX)
app.include_router(resume.router, prefix=settings.API_PREFIX)
app.include_router(predictions.router, prefix=settings.API_PREFIX)
app.include_router(career.router, prefix=settings.API_PREFIX)
app.include_router(assessments.router, prefix=settings.API_PREFIX)
app.include_router(interview.router, prefix=settings.API_PREFIX)
app.include_router(recruiter.router, prefix=settings.API_PREFIX)
app.include_router(institution.router, prefix=settings.API_PREFIX)
app.include_router(ml_insights.router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "platform": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "version": settings.VERSION,
        "status": "Operational",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "Beyond The Resume API"}
