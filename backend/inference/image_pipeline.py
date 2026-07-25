"""End-to-end image inference pipeline."""

from pathlib import Path

import numpy as np

from backend.config import get_settings
from backend.inference.landmark_prediction import predict_landmarks_from_tensor
from backend.models.measurements import compute_measurements
from backend.models.preprocessing import preprocess_from_path, preprocess_image
from backend.models.visualization import draw_prediction
from backend.utils.image_utils import save_image_rgb


def run_inference_on_image(image_rgb: np.ndarray) -> dict:
    settings = get_settings()
    tensor, orig_size = preprocess_image(image_rgb)
    landmarks, landmark_conf, confidence = predict_landmarks_from_tensor(tensor, orig_size)
    measurements = compute_measurements(landmarks, settings.pixel_to_mm)
    annotated = draw_prediction(image_rgb, landmarks, measurements)
    return {
        "landmarks": landmarks,
        "landmark_confidence": landmark_conf,
        "confidence": confidence,
        "measurements": measurements,
        "annotated_image": annotated,
        "orig_size": {"width": orig_size[0], "height": orig_size[1]},
    }


def run_inference_from_path(image_path: Path, save_annotated: Path | None = None) -> dict:
    tensor, orig_size, rgb = preprocess_from_path(image_path)
    landmarks, landmark_conf, confidence = predict_landmarks_from_tensor(tensor, orig_size)
    settings = get_settings()
    measurements = compute_measurements(landmarks, settings.pixel_to_mm)
    annotated = draw_prediction(rgb, landmarks, measurements)
    if save_annotated:
        save_image_rgb(save_annotated, annotated)
    return {
        "landmarks": landmarks,
        "landmark_confidence": landmark_conf,
        "confidence": confidence,
        "measurements": measurements,
        "annotated_image": annotated,
        "original_image": rgb,
        "orig_size": {"width": orig_size[0], "height": orig_size[1]},
    }
