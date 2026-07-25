"""Annotated image visualization."""

import cv2
import numpy as np

from backend.utils.constants import LANDMARK_COLORS_BGR, LANDMARK_LABELS


def draw_prediction(image_rgb: np.ndarray, landmarks: dict, measurements: dict) -> np.ndarray:
    vis = image_rgb.copy()
    for name, (x, y) in landmarks.items():
        color = LANDMARK_COLORS_BGR[name]
        cv2.circle(vis, (int(x), int(y)), 6, color, -1)
        label = f"{name}: {LANDMARK_LABELS[name]}"
        cv2.putText(
            vis, label, (int(x) + 8, int(y) - 8),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2,
        )

    a, c = landmarks["A"], landmarks["C"]
    b, d = landmarks["B"], landmarks["D"]
    cv2.line(vis, (int(a[0]), int(a[1])), (int(c[0]), int(c[1])), (255, 0, 0), 2)
    cv2.line(vis, (int(b[0]), int(b[1])), (int(d[0]), int(d[1])), (0, 255, 0), 2)

    text = (
        f"BPD: {measurements['bpd_mm']} mm | "
        f"OFD: {measurements['ofd_mm']} mm | "
        f"CI: {measurements['cephalic_index']}%"
    )
    cv2.rectangle(vis, (0, 0), (vis.shape[1], 40), (0, 0, 0), -1)
    cv2.putText(vis, text, (10, 28), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    return vis
