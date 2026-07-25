"""Landmark prediction from preprocessed tensors."""

import torch

from backend.inference.model_loader import get_device, get_model
from backend.models.confidence import compute_landmark_confidence, overall_confidence
from backend.models.postprocessing import decode_heatmaps_to_coords, scale_coords_to_original


@torch.no_grad()
def predict_landmarks_from_tensor(
    image_tensor: torch.Tensor, orig_size: tuple[int, int]
) -> tuple[dict, dict[str, float], float]:
    model = get_model()
    device = get_device()
    batch = image_tensor.unsqueeze(0).to(device)
    heatmaps = model(batch)
    coords_hm = decode_heatmaps_to_coords(heatmaps)[0]
    landmarks = scale_coords_to_original(coords_hm, orig_size)
    landmark_conf = compute_landmark_confidence(heatmaps)
    confidence = overall_confidence(landmark_conf)
    return landmarks, landmark_conf, confidence
