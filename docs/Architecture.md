# FetalScan AI Architecture

## Overview

FetalScan AI is a full-stack medical imaging application that performs fetal skull landmark detection and biometric analysis from ultrasound images.

## Components

### Frontend (React + Vite)
- Landing page with marketing sections
- Drag-and-drop upload with progress animation
- Prediction dashboard with Chart.js visualizations
- History dashboard and PDF download

### Backend (FastAPI)
- REST API with modular services
- HRNet-W32 inference via PyTorch + timm
- SQLite persistence via SQLAlchemy
- PDF generation via ReportLab

### ML Pipeline
1. **Preprocessing:** Resize 512×512, normalize (0.5, 0.5, 0.5)
2. **Model:** SimpleHRNetLandmark → 4 heatmaps at 128×128
3. **Decode:** Argmax heatmap peaks → scale to original image
4. **Metrics:** BPD (A↔C), OFD (B↔D), cephalic index
5. **Screening:** Rule-based disease risk classifier

## Data Flow

```
Browser → FastAPI → Inference → Database → PDF → JSON → Dashboard
```
