"""Clinical interpretation text generation."""

def build_interpretation(disease: dict, measurements: dict) -> str:
    primary = disease.get("primary_condition", "Normal")
    risk = disease.get("risk_percentage", 0)
    bpd = measurements.get("bpd_mm", 0)
    ofd = measurements.get("ofd_mm", 0)
    ci = measurements.get("cephalic_index", 0)

    if primary == "Normal":
        return (
            f"Biometric measurements are within expected screening ranges. "
            f"BPD {bpd} mm, OFD {ofd} mm, cephalic index {ci}%. "
            f"Screening risk score: {risk}%."
        )
    return (
        f"Screening flags {primary} with estimated risk {risk}%. "
        f"Measured BPD {bpd} mm, OFD {ofd} mm, cephalic index {ci}%. "
        f"Clinical correlation and expert review are recommended."
    )
