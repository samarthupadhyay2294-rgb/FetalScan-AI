# FetalScan AI

AI-powered fetal ultrasound biometric analysis using a trained **HRNet-W32** landmark detection model.

Upload a fetal head circumference (HC) ultrasound image and receive:

- Skull landmark detection (A, B, C, D)
- BPD & OFD measurements (pixels + mm)
- Cephalic index & gestational age estimate
- Disease screening with risk scores
- Annotated image & downloadable PDF report

> **Disclaimer:** This software is intended only for research and educational screening purposes. It is not a medical diagnosis.

---

## Prerequisites

- Python 3.10+
- Node.js 18+
- `best_hrnet.pth` (your trained model weights)

---

## Quick Start

### 1. Place model weights

Copy your trained model to:

```
backend/weights/best_hrnet.pth
```

Also copy (optional, for reference):

```
model_assets/notebooks/dl_model.ipynb
model_assets/dataset/ground_truth.xlsx  (or .csv)
model_assets/trained_model/best_hrnet.pth
```

### 2. Backend

```bash
cd FetalScan-AI
pip install -r requirements.txt
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://127.0.0.1:8000/docs

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://127.0.0.1:5173

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload ultrasound image |
| POST | `/predict` | Run full inference pipeline |
| GET | `/history` | List prediction history |
| GET | `/report/{id}` | Get report JSON |
| GET | `/download/{id}` | Download PDF report |
| GET | `/health` | Health check |

---

## Inference Pipeline

```
Upload → Validate → Resize(512) → Normalize → HRNet → Landmarks
  → BPD/OFD → Pixel→mm → Cephalic Index → Disease Screening
  → Annotated Image → PDF → SQLite → JSON Response
```

### Landmark mapping (from notebook)

| Point | Anatomy | Measurement |
|-------|---------|-------------|
| A | Left Parietal | BPD endpoint |
| B | Frontal | OFD endpoint |
| C | Right Parietal | BPD endpoint |
| D | Occipital | OFD endpoint |

---

## Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

---

## Project Structure

```
FetalScan-AI/
├── backend/          # FastAPI + HRNet inference
├── frontend/         # React + Vite + Tailwind
├── model_assets/     # Notebook, dataset, weights backup
├── deployment/       # Docker & Nginx configs
└── docs/             # Documentation
```

---

## Configuration

Edit `.env`:

```env
PIXEL_TO_MM=0.133
MAX_UPLOAD_SIZE_MB=10
MODEL_WEIGHTS_PATH=backend/weights/best_hrnet.pth
```

---

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion, Chart.js, Axios

**Backend:** FastAPI, PyTorch, timm (HRNet-W32), OpenCV, Albumentations, SQLAlchemy, ReportLab

---

## License

MIT — see [LICENSE](LICENSE)
