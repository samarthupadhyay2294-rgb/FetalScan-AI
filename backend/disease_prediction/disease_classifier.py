"""Disease risk screening based on biometric parameters."""

from backend.disease_prediction.cephalic_index import analyze_cephalic_index
from backend.utils.constants import BPD_NORMAL_MM, NORMAL_CI_MAX, NORMAL_CI_MIN, OFD_NORMAL_MM


def _risk_score(condition: str, severity: float) -> float:
    base = {
        "Normal": 5.0,
        "Possible Microcephaly": 72.0,
        "Possible Macrocephaly": 68.0,
        "Possible Hydrocephalus": 78.0,
        "Possible Dolichocephaly": 55.0,
        "Possible Brachycephaly": 58.0,
    }
    return round(min(95.0, base.get(condition, 50.0) + severity * 10), 1)


def classify_disease(bpd_mm: float, ofd_mm: float, cephalic_index: float) -> dict:
    conditions: list[dict] = []

    # BPD-based screening
    if bpd_mm < BPD_NORMAL_MM[0]:
        conditions.append({"name": "Possible Microcephaly", "severity": (BPD_NORMAL_MM[0] - bpd_mm) / 10})
    elif bpd_mm > BPD_NORMAL_MM[1]:
        conditions.append({"name": "Possible Macrocephaly", "severity": (bpd_mm - BPD_NORMAL_MM[1]) / 10})

    # OFD / hydrocephalus pattern
    if ofd_mm > OFD_NORMAL_MM[1] and bpd_mm < BPD_NORMAL_MM[1]:
        ratio = ofd_mm / max(bpd_mm, 1)
        if ratio > 1.15:
            conditions.append({"name": "Possible Hydrocephalus", "severity": ratio - 1.0})

    # Cephalic index
    ci_flag = analyze_cephalic_index(cephalic_index)
    if ci_flag:
        severity = abs(cephalic_index - ((NORMAL_CI_MIN + NORMAL_CI_MAX) / 2)) / 5
        conditions.append({"name": ci_flag, "severity": severity})

    if not conditions:
        primary = "Normal"
        risk = _risk_score(primary, 0)
    else:
        conditions.sort(key=lambda c: c["severity"], reverse=True)
        primary = conditions[0]["name"]
        risk = _risk_score(primary, conditions[0]["severity"])

    risk_breakdown = {c["name"]: _risk_score(c["name"], c["severity"]) for c in conditions}
    if not risk_breakdown:
        risk_breakdown = {"Normal": risk}

    risk_level = "Low" if risk < 30 else "Moderate" if risk < 60 else "High"

    return {
        "primary_condition": primary,
        "risk_percentage": risk,
        "risk_level": risk_level,
        "all_flags": [c["name"] for c in conditions] or ["Normal"],
        "risk_breakdown": risk_breakdown,
    }
