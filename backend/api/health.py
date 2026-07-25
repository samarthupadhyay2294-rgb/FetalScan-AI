"""Health check endpoint."""

from fastapi import APIRouter

from backend.config import get_settings

router = APIRouter(tags=["Health"])


@router.get("/health")
def health_check():
    settings = get_settings()
    weights_ok = settings.weights_path.exists()
    return {
        "status": "healthy" if weights_ok else "degraded",
        "app": settings.app_name,
        "model_loaded": weights_ok,
        "weights_path": str(settings.weights_path),
    }
