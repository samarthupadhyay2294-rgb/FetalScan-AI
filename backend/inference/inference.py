"""Unified inference entry point."""

from pathlib import Path

import numpy as np

from backend.disease_prediction.disease_classifier import classify_disease
from backend.disease_prediction.gestational_age import estimate_gestational_age
from backend.disease_prediction.interpretation import build_interpretation
from backend.disease_prediction.recommendations import build_recommendations
from backend.inference.image_pipeline import run_inference_from_path, run_inference_on_image
from backend.utils.constants import MEDICAL_DISCLAIMER


def run_full_pipeline(image_rgb: np.ndarray) -> dict:
    result = run_inference_on_image(image_rgb)
    m = result["measurements"]
    disease = classify_disease(m["bpd_mm"], m["ofd_mm"], m["cephalic_index"])
    ga = estimate_gestational_age(m["bpd_mm"])
    interpretation = build_interpretation(disease, m)
    recommendations = build_recommendations(disease)
    result.update({
        "disease_screening": disease,
        "gestational_age_weeks": ga,
        "interpretation": interpretation,
        "recommendations": recommendations,
        "disclaimer": MEDICAL_DISCLAIMER,
    })
    return result


def run_full_pipeline_from_path(image_path: Path, save_annotated: Path | None = None) -> dict:
    result = run_inference_from_path(image_path, save_annotated)
    m = result["measurements"]
    disease = classify_disease(m["bpd_mm"], m["ofd_mm"], m["cephalic_index"])
    ga = estimate_gestational_age(m["bpd_mm"])
    interpretation = build_interpretation(disease, m)
    recommendations = build_recommendations(disease)
    result.update({
        "disease_screening": disease,
        "gestational_age_weeks": ga,
        "interpretation": interpretation,
        "recommendations": recommendations,
        "disclaimer": MEDICAL_DISCLAIMER,
    })
    return result
