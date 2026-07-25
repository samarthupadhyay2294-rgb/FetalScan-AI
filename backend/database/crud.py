"""CRUD operations for prediction records."""

import json
from typing import Any

from sqlalchemy.orm import Session

from backend.database.models import PredictionRecord


def create_prediction(db: Session, data: dict[str, Any]) -> PredictionRecord:
    record = PredictionRecord(
        patient_id=data.get("patient_id"),
        image_path=data["image_path"],
        annotated_path=data.get("annotated_path"),
        pdf_path=data.get("pdf_path"),
        bpd_mm=data["bpd_mm"],
        ofd_mm=data["ofd_mm"],
        bpd_pixels=data.get("bpd_pixels"),
        ofd_pixels=data.get("ofd_pixels"),
        cephalic_index=data.get("cephalic_index"),
        confidence=data["confidence"],
        gestational_age=data.get("gestational_age"),
        disease=data["disease"],
        risk_level=data["risk_level"],
        risk_percentage=data["risk_percentage"],
        landmarks_json=json.dumps(data.get("landmarks", {})),
        prediction_json=json.dumps(data.get("full_result", {})),
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def get_prediction(db: Session, record_id: int) -> PredictionRecord | None:
    return db.query(PredictionRecord).filter(PredictionRecord.id == record_id).first()


def list_predictions(db: Session, limit: int = 50, offset: int = 0) -> list[PredictionRecord]:
    return (
        db.query(PredictionRecord)
        .order_by(PredictionRecord.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
