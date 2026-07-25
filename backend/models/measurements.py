"""Biometric measurement calculations."""

from backend.utils.calculations import (
    compute_bpd_ofd_pixels,
    compute_cephalic_index,
    pixels_to_mm,
)


def compute_measurements(landmarks: dict, pixel_to_mm: float) -> dict:
    bpd_px, ofd_px = compute_bpd_ofd_pixels(landmarks)
    bpd_mm = pixels_to_mm(bpd_px, pixel_to_mm)
    ofd_mm = pixels_to_mm(ofd_px, pixel_to_mm)
    ci = compute_cephalic_index(bpd_mm, ofd_mm)
    return {
        "bpd_pixels": round(bpd_px, 2),
        "ofd_pixels": round(ofd_px, 2),
        "bpd_mm": bpd_mm,
        "ofd_mm": ofd_mm,
        "cephalic_index": ci,
    }
