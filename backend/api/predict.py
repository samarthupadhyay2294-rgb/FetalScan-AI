"""Prediction endpoint for Fetal Biometrics & Cephalic Index Screening."""

from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.services.prediction_service import predict_from_bytes, predict_from_path
from backend.utils.logger import logger

router = APIRouter(prefix="/predict", tags=["Predict"])


@router.post("")
async def predict(
    file: UploadFile = File(...),
    patient_id: Optional[str] = Form(default=None),
    gestational_age: Optional[float] = Form(default=None, alias="ga"),
    db: Session = Depends(get_db),
):
    """Run HRNet landmark detection, compute BPD, OFD, CI, and evaluate cranial shape classification."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Empty file")

    try:
        result = predict_from_bytes(
            db=db,
            image_bytes=content,
            filename=file.filename,
            patient_id=patient_id,
            gestational_age_weeks=gestational_age,
        )
        return {"success": True, "data": result}
    except Exception as exc:
        logger.error("Prediction processing error: %s", exc, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(exc)}")


@router.post("/from-path")
async def predict_from_saved_path(
    image_path: str = Form(...),
    patient_id: Optional[str] = Form(default=None),
    gestational_age: Optional[float] = Form(default=None, alias="ga"),
    db: Session = Depends(get_db),
):
    """Run prediction on an already uploaded server file path."""
    path = Path(image_path)
    if not path.exists():
        raise HTTPException(status_code=404, detail="Image path not found")

    try:
        result = predict_from_path(
            db=db,
            image_path=path,
            patient_id=patient_id,
            gestational_age_weeks=gestational_age,
        )
        return {"success": True, "data": result}
    except Exception as exc:
        logger.error("Prediction path processing error: %s", exc, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(exc)}")
