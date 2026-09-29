from fastapi import APIRouter, Depends
from ..models import User
from ..services.auth_service import get_current_user
from ..services.institution_service import institution_service

router = APIRouter(prefix="/institution", tags=["Institution & Placement Analytics"])

@router.get("/analytics")
def get_analytics(current_user: User = Depends(get_current_user)):
    return institution_service.get_institutional_analytics()
