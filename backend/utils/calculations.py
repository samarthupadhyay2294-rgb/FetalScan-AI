"""Mathematical calculation utilities."""

import numpy as np


def euclidean_distance(p1, p2) -> float:
    return float(np.linalg.norm(np.array(p1, dtype=float) - np.array(p2, dtype=float)))


def compute_bpd_ofd_pixels(landmarks: dict) -> tuple[float, float]:
    bpd = euclidean_distance(landmarks["A"], landmarks["C"])
    ofd = euclidean_distance(landmarks["B"], landmarks["D"])
    return bpd, ofd


def pixels_to_mm(pixels: float, scale: float) -> float:
    return round(pixels * scale, 2)


def compute_cephalic_index(bpd_mm: float, ofd_mm: float) -> float:
    if ofd_mm <= 0:
        return 0.0
    return round((bpd_mm / ofd_mm) * 100.0, 2)
