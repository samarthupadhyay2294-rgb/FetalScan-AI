"""Landmark detection facade."""

from backend.inference.landmark_prediction import predict_landmarks_from_tensor

__all__ = ["predict_landmarks_from_tensor"]
