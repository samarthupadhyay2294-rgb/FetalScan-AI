"""Cephalic Index (CI) analysis and fetal cranial shape screening service."""

from backend.services.reference_service import get_reference_range
from backend.utils.math_utils import calculate_cephalic_index

CLINICAL_DISCLAIMER = (
    "This tool is intended for research and screening purposes only. "
    "It is not a diagnostic device and should not replace clinical judgment."
)


def evaluate_cephalic_index(
    bpd_mm: float,
    ofd_mm: float,
    gestational_age_weeks: float | int | None = None,
) -> dict:
    """Perform complete Cephalic Index evaluation and cranial shape classification.
    
    Returns structured screening output containing CI, GA, reference ranges,
    head shape classification, screening interpretation, recommendation, and disclaimer.
    """
    ci = calculate_cephalic_index(bpd_mm, ofd_mm)
    ga = int(round(gestational_age_weeks)) if gestational_age_weeks else 20
    ref_lower, ref_upper = get_reference_range(ga)

    if ci < ref_lower:
        classification = "Dolichocephalic"
        screening_result = "Below expected range"
        risk_description = "CI below expected range. May be associated with elongated head shape."
        interpretation = (
            "Cephalic Index is outside the expected reference range. "
            "This finding may be associated with an elongated head shape (dolichocephaly). "
            "This is NOT a diagnosis. Further evaluation by a fetal medicine specialist is recommended."
        )
        recommendation = "Recommend specialist evaluation."
        badge_status = "red"

    elif ci > ref_upper:
        classification = "Brachycephalic"
        screening_result = "Above expected range"
        risk_description = "CI above expected range. May be associated with rounded head shape."
        interpretation = (
            "Cephalic Index is outside the expected reference range. "
            "This finding may be associated with a rounded head shape (brachycephaly). "
            "This is NOT a diagnosis. Further evaluation by a fetal medicine specialist is recommended."
        )
        recommendation = "Recommend specialist evaluation."
        badge_status = "red"

    else:
        classification = "Normal"
        screening_result = "Within expected range"
        risk_description = "CI within expected range."
        interpretation = "Cephalic Index is within the expected reference range for this gestational age."
        recommendation = "Routine fetal follow-up"
        badge_status = "green"

    return {
        "bpd": round(bpd_mm, 1),
        "ofd": round(ofd_mm, 1),
        "ci": ci,
        "ga": ga,
        "reference_lower": ref_lower,
        "reference_upper": ref_upper,
        "reference_range_str": f"{int(ref_lower)}–{int(ref_upper)}",
        "classification": classification,
        "screening_result": screening_result,
        "risk_description": risk_description,
        "interpretation": interpretation,
        "recommendation": recommendation,
        "badge_status": badge_status,
        "disclaimer": CLINICAL_DISCLAIMER,
    }
