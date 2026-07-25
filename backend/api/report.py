"""Report retrieval endpoint."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.services.report_service import get_report

router = APIRouter(prefix="/report", tags=["Report"])


@router.get("/{record_id}")
def fetch_report(record_id: int, db: Session = Depends(get_db)):
    return {"success": True, "data": get_report(db, record_id)}
