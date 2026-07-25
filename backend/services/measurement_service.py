"""Measurement calculation service for BPD, OFD, and Cephalic Index."""

from backend.config import get_settings
from backend.utils.calculations import compute_bpd_ofd_pixels
from backend.utils.math_utils import calculate_cephalic_index, convert_pixels_to_mm


def compute_fetal_measurements(landmarks: dict, pixel_to_mm_ratio: float | None = None) -> dict:
    """Compute BPD (mm), OFD (mm), BPD (px), OFD (px), and Cephalic Index from landmarks."""
    ratio = pixel_to_mm_ratio or get_settings().pixel_to_mm
    bpd_px, ofd_px = compute_bpd_ofd_pixels(landmarks)

    bpd_mm = convert_pixels_to_mm(bpd_px, ratio)
    ofd_mm = convert_pixels_to_mm(ofd_px, ratio)
    ci = calculate_cephalic_index(bpd_mm, ofd_mm)

    return {
        "bpd_pixels": round(bpd_px, 2),
        "ofd_pixels": round(ofd_px, 2),
        "bpd_mm": bpd_mm,
        "ofd_mm": ofd_mm,
        "cephalic_index": ci,
    }


def get_measurements(landmarks: dict) -> dict:
    """Legacy compatibility function for measurement retrieval."""
    return compute_fetal_measurements(landmarks)
