"""Prediction history service."""

from sqlalchemy.orm import Session
from backend.database import crud


def get_history(db: Session, limit: int = 50, offset: int = 0) -> dict:
    records = crud.list_predictions(db, limit=limit, offset=offset)
    items = [
        {
            "id": r.id,
            "patient_id": r.patient_id,
            "bpd_mm": r.bpd_mm,
            "ofd_mm": r.ofd_mm,
            "cephalic_index": r.cephalic_index,
            "gestational_age": r.gestational_age,
            "confidence": r.confidence,
            "disease": r.disease,
            "risk_level": r.risk_level,
            "risk_percentage": r.risk_percentage,
            "created_at": r.created_at.isoformat() if r.created_at else None,
            "report_url": f"/report/{r.id}",
            "download_url": f"/download/{r.id}",
        }
        for r in records
    ]
    return {"total": len(items), "items": items, "limit": limit, "offset": offset}
