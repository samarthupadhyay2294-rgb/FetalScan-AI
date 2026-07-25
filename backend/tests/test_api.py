"""API endpoint tests."""

from fastapi.testclient import TestClient

from backend.app import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "app" in data


def test_root():
    response = client.get("/")
    assert response.status_code == 200
