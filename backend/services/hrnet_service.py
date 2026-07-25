"""HRNet model landmark detection service."""

from pathlib import Path
import numpy as np

from backend.inference.image_pipeline import run_inference_from_path, run_inference_on_image


def detect_landmarks_from_path(image_path: Path, save_annotated_path: Path | None = None) -> dict:
    """Run HRNet deep learning model to predict fetal cranial landmarks from image path."""
    return run_inference_from_path(image_path, save_annotated_path)


def detect_landmarks_from_array(image_rgb: np.ndarray) -> dict:
    """Run HRNet deep learning model to predict fetal cranial landmarks from numpy array."""
    return run_inference_on_image(image_rgb)
