"""File upload service."""

import shutil
from pathlib import Path

from fastapi import HTTPException, UploadFile

from backend.config import get_settings
from backend.utils.helpers import generate_id, safe_filename
from backend.utils.image_utils import read_image_from_bytes, save_image_rgb
from backend.utils.validators import validate_upload, validate_saved_image


async def save_upload(file: UploadFile) -> dict:
    settings = get_settings()
    content = await file.read()
    validate_upload(file, content)

    upload_id = generate_id("UP")
    ext = Path(file.filename).suffix.lower()
    filename = f"{upload_id}{ext}"
    dest = settings.uploads_dir / filename
    settings.uploads_dir.mkdir(parents=True, exist_ok=True)

    dest.write_bytes(content)
    validate_saved_image(dest)

    return {
        "upload_id": upload_id,
        "filename": filename,
        "original_name": file.filename,
        "path": str(dest),
        "size_bytes": len(content),
    }


def save_upload_copy(src: Path, upload_id: str) -> Path:
    settings = get_settings()
    ext = src.suffix
    dest = settings.uploads_dir / f"{upload_id}{ext}"
    shutil.copy2(src, dest)
    return dest
