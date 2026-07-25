# API Documentation

Base URL: `http://127.0.0.1:8000`

## POST /upload

Upload an image file.

**Form:** `file` (multipart)

**Response:**
```json
{
  "success": true,
  "data": {
    "upload_id": "UP-...",
    "filename": "...",
    "path": "..."
  }
}
```

## POST /predict

Run full inference pipeline.

**Form:** `file`, optional `patient_id`

**Response:** Prediction JSON with measurements, landmarks, disease screening, URLs.

## GET /history

Query params: `limit`, `offset`

## GET /report/{id}

Returns stored prediction record.

## GET /download/{id}

Returns PDF file.

## GET /health

Returns model availability status.
