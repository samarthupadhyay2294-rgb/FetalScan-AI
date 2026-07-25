"""Database engine and session management."""

from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.config import BASE_DIR, get_settings
from backend.database.models import Base

DB_DIR = BASE_DIR / "database"
DB_DIR.mkdir(parents=True, exist_ok=True)


def _resolve_db_url() -> str:
    settings = get_settings()
    url = settings.database_url
    if url.startswith("sqlite:///./"):
        rel = url.replace("sqlite:///./", "")
        abs_path = (BASE_DIR / rel).resolve()
        abs_path.parent.mkdir(parents=True, exist_ok=True)
        return f"sqlite:///{abs_path}"
    return url


engine = create_engine(_resolve_db_url(), connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db() -> None:
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
