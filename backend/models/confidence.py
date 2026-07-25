"""Confidence estimation from heatmap activations."""

import torch


def compute_landmark_confidence(heatmaps: torch.Tensor) -> dict[str, float]:
    """
    Compute per-landmark confidence from normalized peak heatmap values.
    heatmaps: (1, K, H, W)
    """
    names = ["A", "B", "C", "D"]
    hm = heatmaps[0].detach().cpu()
    confidences = {}
    for i, name in enumerate(names):
        channel = hm[i]
        peak = float(channel.max())
        total = float(channel.sum()) + 1e-8
        peak_ratio = peak / total
        confidences[name] = round(min(99.0, max(50.0, peak_ratio * 500.0)), 2)
    return confidences


def overall_confidence(landmark_conf: dict[str, float]) -> float:
    if not landmark_conf:
        return 0.0
    return round(sum(landmark_conf.values()) / len(landmark_conf), 2)
