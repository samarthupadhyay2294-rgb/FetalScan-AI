"""Pixel to millimeter conversion utilities."""

from backend.config import get_settings


def convert_pixels_to_mm(pixels: float, scale: float | None = None) -> float:
    factor = scale if scale is not None else get_settings().pixel_to_mm
    return round(float(pixels) * factor, 2)


def convert_measurements(measurements: dict, scale: float | None = None) -> dict:
    factor = scale if scale is not None else get_settings().pixel_to_mm
    return {
        "bpd_mm": convert_pixels_to_mm(measurements["bpd_pixels"], factor),
        "ofd_mm": convert_pixels_to_mm(measurements["ofd_pixels"], factor),
    }
