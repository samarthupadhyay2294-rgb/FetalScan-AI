"""Image utility functions."""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image


def read_image_rgb(path: Path | str) -> np.ndarray:
    image = cv2.imread(str(path), cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError(f"Unable to read image: {path}")
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)


def read_image_from_bytes(data: bytes) -> np.ndarray:
    arr = np.frombuffer(data, dtype=np.uint8)
    image = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Unable to decode uploaded image bytes")
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)


def save_image_rgb(path: Path, image: np.ndarray) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    cv2.imwrite(str(path), bgr)


def get_image_dimensions(image: np.ndarray) -> tuple[int, int]:
    h, w = image.shape[:2]
    return w, h


def validate_image_integrity(path: Path) -> bool:
    try:
        with Image.open(path) as img:
            img.verify()
        return True
    except Exception:
        return False
