"""Report service for generating and retrieving screening reports."""

import json
from pathlib import Path
from fastapi import HTTPException
from sqlalchemy.orm import Session

from backend.database import crud
from backend.reports.pdf_generator import generate_pdf_report


def generate_report_file(
    report_id: int,
    patient_id: str | None,
    result: dict,
    original_path: Path,
    annotated_path: Path,
    output_path: Path,
) -> Path:
    """Generate PDF report document."""
    return generate_pdf_report(
        report_id, patient_id, result, original_path, annotated_path, output_path
    )


def get_report(db: Session, record_id: int) -> dict:
    """Retrieve detailed prediction report by ID."""
    record = crud.get_prediction(db, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Report not found")

    full = {}
    if record.prediction_json:
        try:
            full = json.loads(record.prediction_json)
        except json.JSONDecodeError:
            full = {}

    ci_val = record.cephalic_index or (full.get("ci"))
    ga_val = record.gestational_age or full.get("ga") or 20

    # Ensure CI details are fully populated
    bpd_mm = record.bpd_mm
    ofd_mm = record.ofd_mm
    ref_lower = full.get("reference_lower", 75)
    ref_upper = full.get("reference_upper", 85)
    classification = record.disease or full.get("classification", "Normal")
    recommendation = full.get("recommendation", "Routine fetal follow-up")
    interpretation = full.get("interpretation", "Cephalic Index is within the expected reference range.")
    disclaimer = full.get(
        "disclaimer",
        "This tool is intended for research and screening purposes only. It is not a diagnostic device and should not replace clinical judgment.",
    )

    return {
        "id": record.id,
        "patient_id": record.patient_id,
        "created_at": record.created_at.isoformat() if record.created_at else None,
        "bpd": bpd_mm,
        "ofd": ofd_mm,
        "ci": ci_val,
        "ga": ga_val,
        "reference_lower": ref_lower,
        "reference_upper": ref_upper,
        "reference_range_str": f"{int(ref_lower)}–{int(ref_upper)}",
        "classification": classification,
        "screening_result": record.risk_level or full.get("screening_result", "Within expected range"),
        "interpretation": interpretation,
        "recommendation": recommendation,
        "disclaimer": disclaimer,
        "confidence": record.confidence,
        "bpd_mm": bpd_mm,
        "ofd_mm": ofd_mm,
        "cephalic_index": ci_val,
        "gestational_age_weeks": ga_val,
        "disease": classification,
        "landmarks": json.loads(record.landmarks_json) if record.landmarks_json else {},
        "image_url": f"/outputs/uploads/{Path(record.image_path).name}" if record.image_path else None,
        "annotated_url": f"/outputs/annotated/{Path(record.annotated_path).name}" if record.annotated_path else None,
        "pdf_url": f"/download/{record.id}",
        "details": full,
    }
