"""Integration tests for prediction pipeline and endpoints."""

import io
import numpy as np
from PIL import Image
from fastapi.testclient import TestClient

from backend.app import app

client = TestClient(app)


def _create_dummy_image_bytes() -> bytes:
    """Create a dummy 256x256 RGB image in PNG bytes format."""
    arr = np.zeros((256, 256, 3), dtype=np.uint8)
    # Draw a simple white circle representing head circumference
    for y in range(256):
        for x in range(256):
            if 4000 < (x - 128) ** 2 + (y - 128) ** 2 < 7000:
                arr[y, x] = [200, 200, 200]
    img = Image.fromarray(arr)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return buf.getvalue()


def test_predict_endpoint():
    image_bytes = _create_dummy_image_bytes()
    response = client.post(
        "/predict",
        files={"file": ("test_ultrasound.png", image_bytes, "image/png")},
        data={"patient_id": "PAT-TEST-001", "ga": 24},
    )
    assert response.status_code == 200, response.text
    json_data = response.json()
    assert json_data["success"] is True
    data = json_data["data"]

    # Verify exact schema requirements
    assert "bpd" in data
    assert "ofd" in data
    assert "ci" in data
    assert data["ga"] == 24
    assert data["reference_lower"] == 75
    assert data["reference_upper"] == 85
    assert data["classification"] in ("Normal", "Dolichocephalic", "Brachycephalic")
    assert "screening_result" in data
    assert "recommendation" in data
    assert "disclaimer" in data
    assert "This tool is intended for research and screening" in data["disclaimer"]


def test_reference_endpoint():
    response = client.get("/reference/ci/20")
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["ga"] == 20
    assert data["lower"] == 74
    assert data["upper"] == 84


def test_report_endpoint():
    # First create a prediction
    image_bytes = _create_dummy_image_bytes()
    pred_res = client.post(
        "/predict",
        files={"file": ("test_report.png", image_bytes, "image/png")},
        data={"patient_id": "PAT-REPORT-001", "ga": 20},
    )
    record_id = pred_res.json()["data"]["id"]

    # Fetch report
    rep_res = client.get(f"/report/{record_id}")
    assert rep_res.status_code == 200
    r_data = rep_res.json()["data"]
    assert r_data["id"] == record_id
    assert r_data["patient_id"] == "PAT-REPORT-001"
    assert "ci" in r_data
    assert "classification" in r_data
