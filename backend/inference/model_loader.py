"""Singleton HRNet model loader."""

from pathlib import Path

import torch

from backend.config import get_settings
from backend.models.hrnet_architecture import SimpleHRNetLandmark
from backend.utils.logger import logger

_model = None
_device = None


def get_device() -> torch.device:
    global _device
    if _device is None:
        _device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info("Using device: %s", _device)
    return _device


def load_model(weights_path: Path | None = None) -> SimpleHRNetLandmark:
    global _model
    if _model is not None:
        return _model

    settings = get_settings()
    path = weights_path or settings.weights_path
    if not path.exists():
        raise FileNotFoundError(
            f"Model weights not found at {path}. "
            "Place best_hrnet.pth in backend/weights/"
        )

    device = get_device()
    model = SimpleHRNetLandmark(num_landmarks=4, pretrained=False)
    try:
        state = torch.load(path, map_location=device, weights_only=True)
    except TypeError:
        state = torch.load(path, map_location=device)
    model.load_state_dict(state)
    model.to(device)
    model.eval()
    _model = model
    logger.info("HRNet model loaded from %s", path)
    return _model


def get_model() -> SimpleHRNetLandmark:
    return load_model()
