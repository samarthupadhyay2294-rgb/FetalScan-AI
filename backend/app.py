"""FetalScan AI - FastAPI Application Entry Point with Cephalic Index Screening."""

import sys
from pathlib import Path

# Allow `uvicorn app:app` when cwd is backend/
_ROOT = Path(__file__).resolve().parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.api import health, history, predict, reference, report, upload
from backend.config import get_settings
from backend.database.schema import init_db
from backend.utils.helpers import ensure_dir
from backend.utils.logger import logger


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    ensure_dir(settings.uploads_dir)
    ensure_dir(settings.annotated_dir)
    ensure_dir(settings.reports_dir)
    ensure_dir(settings.outputs_dir / "csv")
    ensure_dir(settings.outputs_dir / "json")
    init_db()
    logger.info("Application startup complete (model will load lazily on first /predict request)")
    yield


app = FastAPI(
    title="FetalScan AI",
    description="AI-powered fetal ultrasound biometric analysis and Cephalic Index cranial shape screening",
    version="2.0.0",
    lifespan=lifespan,
)

settings = get_settings()
_cors_kwargs = {
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"],
}
if settings.cors_origin_regex:
    _cors_kwargs["allow_origin_regex"] = settings.cors_origin_regex
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    **_cors_kwargs,
)


def _register_api_routes(prefix: str = "") -> None:
    """Mount all routers under an optional prefix (e.g. /api, /v1)."""
    app.include_router(health.router, prefix=prefix)
    app.include_router(upload.router, prefix=prefix)
    app.include_router(predict.router, prefix=prefix)
    app.include_router(report.router, prefix=prefix)
    app.include_router(history.router, prefix=prefix)
    app.include_router(reference.router, prefix=prefix)


# Root routes: POST /predict, POST /upload, GET /history, ...
_register_api_routes()
# Aliases for proxies / clients that prefix with /api or /v1
_register_api_routes("/api")
_register_api_routes("/v1")

# Serve uploaded and output images
uploads_path = settings.uploads_dir
annotated_path = settings.annotated_dir
ensure_dir(uploads_path)
ensure_dir(annotated_path)
app.mount("/outputs/uploads", StaticFiles(directory=str(uploads_path)), name="uploads")
app.mount("/outputs/annotated", StaticFiles(directory=str(annotated_path)), name="annotated")


@app.get("/")
def root():
    return {
        "app": settings.app_name,
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/health",
    }
