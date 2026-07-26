"""Application configuration loaded from environment variables."""

from functools import lru_cache
from pathlib import Path
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(PROJECT_ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "FetalScan AI"
    app_env: str = "development"
    debug: bool = True

    backend_host: str = "0.0.0.0"
    backend_port: int = 8000
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    # Optional regex for preview/staging hosts (e.g. https://*.onrender.com)
    cors_origin_regex: str = r"https://.*\.onrender\.com"

    model_weights_path: str = "backend/weights/best_hrnet.pth"
    img_size: int = 512
    heatmap_size: int = 128
    pixel_to_mm: float = 0.133

    max_upload_size_mb: int = 10
    allowed_extensions: str = "png,jpg,jpeg,bmp,tiff"

    database_url: str = "sqlite:///./backend/database/fetalscan.db"

    hospital_name: str = "FetalScan AI Research Center"
    hospital_address: str = "123 Medical Innovation Drive, Healthcare City"

    @property
    def weights_path(self) -> Path:
        path = Path(self.model_weights_path)
        if not path.is_absolute():
            path = PROJECT_ROOT / path
        return path

    @property
    def uploads_dir(self) -> Path:
        return BASE_DIR / "uploads"

    @property
    def outputs_dir(self) -> Path:
        return BASE_DIR / "outputs"

    @property
    def annotated_dir(self) -> Path:
        return self.outputs_dir / "annotated_images"

    @property
    def reports_dir(self) -> Path:
        return self.outputs_dir / "prediction_reports"

    @property
    def cors_origin_list(self) -> List[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def allowed_ext_list(self) -> List[str]:
        return [e.strip().lower() for e in self.allowed_extensions.split(",")]

    @property
    def max_upload_bytes(self) -> int:
        return self.max_upload_size_mb * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    return Settings()
