"""Heatmap decoding and coordinate scaling."""

import torch

from backend.config import get_settings
from backend.utils.constants import LANDMARK_ORDER


def decode_heatmaps_to_coords(heatmaps: torch.Tensor) -> torch.Tensor:
    """heatmaps: (N, K, H, W) -> (N, K, 2) coordinates in heatmap space (x, y)."""
    _, _, h, w = heatmaps.shape
    flat = heatmaps.view(heatmaps.shape[0], heatmaps.shape[1], -1)
    idx = torch.argmax(flat, dim=2)
    ys = (idx // w).float()
    xs = (idx % w).float()
    return torch.stack([xs, ys], dim=2)


def scale_coords_to_original(
    coords_hm: torch.Tensor, orig_size: tuple[int, int]
) -> dict[str, list[float]]:
    settings = get_settings()
    scale_x = orig_size[0] / settings.heatmap_size
    scale_y = orig_size[1] / settings.heatmap_size
    coords_orig = coords_hm.clone()
    coords_orig[:, 0] *= scale_x
    coords_orig[:, 1] *= scale_y
    return {
        name: [float(coords_orig[i, 0]), float(coords_orig[i, 1])]
        for i, name in enumerate(LANDMARK_ORDER)
    }
