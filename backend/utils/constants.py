"""Shared constants matching the training notebook."""

LANDMARK_ORDER = ["A", "B", "C", "D"]

LANDMARK_LABELS = {
    "A": "Left Parietal (BPD)",
    "B": "Frontal (OFD)",
    "C": "Right Parietal (BPD)",
    "D": "Occipital (OFD)",
}

LANDMARK_COLORS_BGR = {
    "A": (255, 0, 0),
    "B": (0, 255, 0),
    "C": (0, 0, 255),
    "D": (255, 165, 0),
}

MEDICAL_DISCLAIMER = (
    "This software is intended only for research and educational screening purposes. "
    "It is not a medical diagnosis."
)

NORMAL_CI_MIN = 76.0
NORMAL_CI_MAX = 84.0

BPD_NORMAL_MM = (70.0, 98.0)
OFD_NORMAL_MM = (80.0, 110.0)
