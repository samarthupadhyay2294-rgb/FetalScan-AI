"""Prediction history endpoint."""

from fastapi import APIRouter, Depends, Query
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from backend.database import crud
from backend.database.database import get_db
from backend.services.history_service import get_history

router = APIRouter(tags=["History"])


@router.get("/history")
def history(
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    return {"success": True, "data": get_history(db, limit, offset)}


@router.get("/download/{record_id}")
def download_report(record_id: int, db: Session = Depends(get_db)):
    record = crud.get_prediction(db, record_id)
    if not record or not record.pdf_path:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="PDF report not found")
    return FileResponse(
        record.pdf_path,
        media_type="application/pdf",
        filename=f"fetalscan_report_{record_id}.pdf",
    )
