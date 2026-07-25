"""Upload validation utilities."""

from pathlib import Path

from fastapi import HTTPException, UploadFile

from backend.config import get_settings
from backend.utils.image_utils import validate_image_integrity


def validate_upload(file: UploadFile, content: bytes) -> None:
    settings = get_settings()

    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required")

    ext = Path(file.filename).suffix.lower().lstrip(".")
    if ext not in settings.allowed_ext_list:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(settings.allowed_ext_list)}",
        )

    if len(content) > settings.max_upload_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max size: {settings.max_upload_size_mb} MB",
        )

    if len(content) < 100:
        raise HTTPException(status_code=400, detail="File appears to be empty or corrupt")


def validate_saved_image(path: Path) -> None:
    if not path.exists():
        raise HTTPException(status_code=400, detail="Saved image not found")
    if not validate_image_integrity(path):
        raise HTTPException(status_code=400, detail="Corrupt or invalid image file")
