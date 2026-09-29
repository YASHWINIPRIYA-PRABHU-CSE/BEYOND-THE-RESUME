from typing import Optional, List
from fastapi import APIRouter, Depends, Query, Body
from ..models import User
from ..services.auth_service import get_current_user
from ..services.recruiter_service import recruiter_service

router = APIRouter(prefix="/recruiter", tags=["Recruiter Talent Search"])

@router.get("/candidates")
def search_candidates(
    skill: Optional[str] = Query(None),
    role: Optional[str] = Query(None),
    min_readiness: int = Query(50),
    min_cgpa: float = Query(6.0),
    department: Optional[str] = Query(None),
    limit: int = Query(25),
    current_user: User = Depends(get_current_user)
):
    results = recruiter_service.search_candidates(
        skill_query=skill,
        role=role,
        min_readiness=min_readiness,
        min_cgpa=min_cgpa,
        department=department,
        limit=limit
    )
    return results

@router.post("/compare")
def compare_candidates(
    candidate_ids: List[str] = Body(..., embed=True),
    current_user: User = Depends(get_current_user)
):
    results = recruiter_service.compare_candidates(candidate_ids)
    return {"candidates": results}
