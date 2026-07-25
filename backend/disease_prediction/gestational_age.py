"""Gestational age estimation from BPD (Hadlock formula approximation)."""

def estimate_gestational_age(bpd_mm: float) -> float | None:
    """Estimate GA in weeks from BPD using simplified Hadlock regression."""
    if bpd_mm <= 0:
        return None
    # Simplified: GA (weeks) ≈ 2.0 + BPD_mm * 0.35 (research screening estimate)
    ga = 2.0 + bpd_mm * 0.35
    return round(min(max(ga, 12.0), 42.0), 1)
