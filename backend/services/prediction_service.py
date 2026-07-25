"""Prediction orchestration service incorporating Cephalic Index screening."""

from pathlib import Path
from sqlalchemy.orm import Session

from backend.config import get_settings
from backend.database import crud
from backend.services.ci_service import evaluate_cephalic_index
from backend.services.hrnet_service import detect_landmarks_from_path
from backend.services.report_service import generate_report_file
from backend.disease_prediction.disease_classifier import classify_disease
from backend.disease_prediction.gestational_age import estimate_gestational_age
from backend.utils.helpers import generate_id
from backend.utils.logger import logger


def predict_from_path(
    db: Session,
    image_path: Path,
    patient_id: str | None = None,
    gestational_age_weeks: float | int | None = None,
) -> dict:
    """Run prediction pipeline from image file path, evaluate CI, and save record."""
    settings = get_settings()
    settings.annotated_dir.mkdir(parents=True, exist_ok=True)
    settings.reports_dir.mkdir(parents=True, exist_ok=True)

    pred_id = generate_id("PR")
    annotated_path = settings.annotated_dir / f"{pred_id}_annotated.png"

    logger.info("Running HRNet inference on %s", image_path)
    result = detect_landmarks_from_path(image_path, annotated_path)

    m = result["measurements"]
    bpd_mm = m["bpd_mm"]
    ofd_mm = m["ofd_mm"]

    # Determine Gestational Age (use user-provided GA, or estimate from BPD)
    ga = gestational_age_weeks
    if ga is None or float(ga) <= 0:
        ga = estimate_gestational_age(bpd_mm)

    # Evaluate Cephalic Index and Cranial Shape Classification
    ci_analysis = evaluate_cephalic_index(bpd_mm, ofd_mm, ga)

    # Legacy disease classification support for existing UI components
    disease_screening = classify_disease(bpd_mm, ofd_mm, ci_analysis["ci"])

    pdf_path = settings.reports_dir / f"{pred_id}_report.pdf"

    # Save to database
    record = crud.create_prediction(db, {
        "patient_id": patient_id,
        "image_path": str(image_path),
        "annotated_path": str(annotated_path),
        "pdf_path": str(pdf_path),
        "bpd_mm": bpd_mm,
        "ofd_mm": ofd_mm,
        "bpd_pixels": m["bpd_pixels"],
        "ofd_pixels": m["ofd_pixels"],
        "cephalic_index": ci_analysis["ci"],
        "confidence": result["confidence"],
        "gestational_age": ci_analysis["ga"],
        "disease": ci_analysis["classification"],
        "risk_level": ci_analysis["screening_result"],
        "risk_percentage": 0.0,
        "landmarks": result["landmarks"],
        "full_result": {
            "landmarks": result["landmarks"],
            "landmark_confidence": result["landmark_confidence"],
            "confidence": result["confidence"],
            "measurements": m,
            "ci_analysis": ci_analysis,
            "disease_screening": disease_screening,
        },
    })

    # Prepare complete response payload containing exact keys requested
    response_payload = {
        # Core requested fields
        "bpd": ci_analysis["bpd"],
        "ofd": ci_analysis["ofd"],
        "ci": ci_analysis["ci"],
        "ga": ci_analysis["ga"],
        "reference_lower": ci_analysis["reference_lower"],
        "reference_upper": ci_analysis["reference_upper"],
        "reference_range_str": ci_analysis["reference_range_str"],
        "classification": ci_analysis["classification"],
        "screening_result": ci_analysis["screening_result"],
        "recommendation": ci_analysis["recommendation"],
        "interpretation": ci_analysis["interpretation"],
        "disclaimer": ci_analysis["disclaimer"],
        "badge_status": ci_analysis["badge_status"],
        "risk_description": ci_analysis["risk_description"],

        # Extended report & metadata fields
        "id": record.id,
        "patient_id": patient_id,
        "confidence": result["confidence"],
        "landmarks": result["landmarks"],
        "landmark_confidence": result["landmark_confidence"],
        "measurements": m,
        "disease_screening": disease_screening,
        "gestational_age_weeks": ci_analysis["ga"],
        "recommendations": [ci_analysis["recommendation"]],
        "image_url": f"/outputs/uploads/{Path(image_path).name}",
        "annotated_url": f"/outputs/annotated/{Path(annotated_path).name}",
        "pdf_url": f"/download/{record.id}",
        "report_url": f"/report/{record.id}",
    }

    # Generate PDF Report
    generate_report_file(
        record.id,
        patient_id,
        response_payload,
        image_path,
        annotated_path,
        pdf_path,
    )

    return response_payload


def predict_from_bytes(
    db: Session,
    image_bytes: bytes,
    filename: str,
    patient_id: str | None = None,
    gestational_age_weeks: float | int | None = None,
) -> dict:
    """Run prediction pipeline from image bytes."""
    settings = get_settings()
    settings.uploads_dir.mkdir(parents=True, exist_ok=True)
    upload_id = generate_id("UP")
    ext = Path(filename).suffix or ".png"
    image_path = settings.uploads_dir / f"{upload_id}{ext}"
    image_path.write_bytes(image_bytes)
    return predict_from_path(db, image_path, patient_id, gestational_age_weeks)
