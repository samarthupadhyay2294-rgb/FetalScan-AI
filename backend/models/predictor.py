"""High-level predictor facade."""

from backend.inference.inference import run_full_pipeline, run_full_pipeline_from_path

__all__ = ["run_full_pipeline", "run_full_pipeline_from_path"]
