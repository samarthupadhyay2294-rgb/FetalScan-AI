"""Image preprocessing pipeline matching training notebook eval_transform."""

import albumentations as A
import cv2
import numpy as np
import torch
from albumentations.pytorch import ToTensorV2

from backend.config import get_settings


def build_eval_transform(img_size: int | None = None) -> A.Compose:
    size = img_size or get_settings().img_size
    return A.Compose(
        [
            A.Resize(size, size),
            A.Normalize(mean=(0.5, 0.5, 0.5), std=(0.5, 0.5, 0.5)),
            ToTensorV2(),
        ],
        keypoint_params=A.KeypointParams(format="xy", remove_invisible=False),
    )


def preprocess_image(image_rgb: np.ndarray) -> tuple[torch.Tensor, tuple[int, int]]:
    """Return tensor (3,H,W) and original (width, height)."""
    orig_h, orig_w = image_rgb.shape[:2]
    transform = build_eval_transform()
    transformed = transform(image=image_rgb, keypoints=[(0, 0)] * 4)
    return transformed["image"], (orig_w, orig_h)


def preprocess_from_path(path) -> tuple[torch.Tensor, tuple[int, int], np.ndarray]:
    image = cv2.imread(str(path), cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError(f"Cannot read image: {path}")
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    tensor, orig_size = preprocess_image(rgb)
    return tensor, orig_size, rgb
