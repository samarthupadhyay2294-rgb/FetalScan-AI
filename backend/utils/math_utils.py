"""Mathematical utilities for biometric measurement calculations."""

import math


def calculate_euclidean_distance(p1: tuple[float, float], p2: tuple[float, float]) -> float:
    """Calculate 2D Euclidean distance between two points."""
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)


def calculate_cephalic_index(bpd: float, ofd: float) -> float:
    """Calculate Cephalic Index (CI) = (BPD / OFD) * 100.
    
    Args:
        bpd: Biparietal Diameter (in mm or pixels)
        ofd: Occipitofrontal Diameter (in mm or pixels)
        
    Returns:
        Cephalic Index rounded to 1 decimal place.
    """
    if ofd <= 0:
        return 0.0
    ci = (bpd / ofd) * 100.0
    return round(ci, 1)


def convert_pixels_to_mm(pixels: float, pixel_to_mm_ratio: float) -> float:
    """Convert distance from pixels to millimeters."""
    return round(pixels * pixel_to_mm_ratio, 1)
