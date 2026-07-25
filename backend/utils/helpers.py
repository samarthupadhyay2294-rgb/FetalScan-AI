"""General helper utilities."""

import uuid
from datetime import datetime, timezone
from pathlib import Path


def generate_id(prefix: str = "FS") -> str:
    return f"{prefix}-{uuid.uuid4().hex[:12].upper()}"


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_dir(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path


def safe_filename(name: str) -> str:
    return "".join(c if c.isalnum() or c in "._-" else "_" for c in name)
