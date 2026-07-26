<div align="center">

# 🩺 FetalScan AI

### AI-Powered Fetal Ultrasound Biometric Analysis & Cephalic Index Screening

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.140-009688.svg)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.1-EE4C2C.svg)](https://pytorch.org/)

**Live Demo:** [🚀 Try it now](https://fetalscan-ai-1.onrender.com) | **API Docs:** [📚 Swagger](https://fetalscan-ai.onrender.com/docs)

</div>

---

## ✨ Features

FetalScan AI uses a trained **HRNet-W32** deep learning model for automated fetal ultrasound analysis:

- 🎯 **Skull Landmark Detection** - Precise identification of anatomical points (A, B, C, D)
- 📏 **Biometric Measurements** - Automatic BPD & OFD calculation in pixels and millimeters
- 📊 **Cephalic Index (CI)** - Cranial shape assessment with gestational age reference ranges
- 🔬 **Disease Screening** - Risk scoring for craniosynostosis and microcephaly
- 🖼️ **Annotated Images** - Visual output with detected landmarks and measurements
- 📄 **PDF Reports** - Professional downloadable medical reports
- 📜 **Prediction History** - Track and review previous analyses
- 🌐 **Modern UI** - Beautiful, responsive React frontend with real-time feedback

> ⚠️ **Medical Disclaimer:** This software is intended only for research and educational screening purposes. It is not a substitute for professional medical diagnosis.

---

## 🚀 Live Deployment

- **Frontend:** [https://fetalscan-ai-1.onrender.com](https://fetalscan-ai-1.onrender.com)
- **Backend API:** [https://fetalscan-ai.onrender.com](https://fetalscan-ai.onrender.com)
- **API Documentation:** [https://fetalscan-ai.onrender.com/docs](https://fetalscan-ai.onrender.com/docs)

---

## 📋 Prerequisites

- **Python:** 3.10 or higher
- **Node.js:** 18 or higher
- **Model Weights:** `best_hrnet.pth` (trained HRNet-W32 model)

---

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/samarthupadhyay2294-rgb/FetalScan-AI.git
cd FetalScan-AI
```

### 2. Download Model Weights

Download the trained model weights from [GitHub Releases](https://github.com/samarthupadhyay2294-rgb/FetalScan-AI/releases/download/weight/best_hrnet.pth) and place it in:

```
backend/weights/best_hrnet.pth
```

### 3. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://127.0.0.1:8000`

**API Documentation:** http://127.0.0.1:8000/docs

### 4. Frontend Setup

```bash
# Install Node.js dependencies
cd frontend
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://127.0.0.1:5173`

### 5. Environment Variables

For production deployment, set the following environment variables:

**Frontend (.env):**
```env
VITE_API_BASE=https://your-backend-url.onrender.com
```

**Backend (.env):**
```env
CORS_ORIGINS=https://your-frontend-url.onrender.com
MODEL_WEIGHTS_PATH=backend/weights/best_hrnet.pth
DATABASE_URL=sqlite:///./backend/database/fetalscan.db
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/predict` | Run full inference pipeline on uploaded image |
| `POST` | `/upload` | Upload ultrasound image |
| `GET` | `/history` | List prediction history |
| `GET` | `/report/{id}` | Get report JSON by ID |
| `GET` | `/download/{id}` | Download PDF report by ID |
| `GET` | `/reference/ci/{ga}` | Get reference range for gestational age |
| `GET` | `/health` | Health check endpoint |

### Example Request

```bash
curl -X POST "https://fetalscan-ai.onrender.com/predict" \
  -F "file=@ultrasound_image.png" \
  -F "patient_id=PAT-001" \
  -F "ga=20"
```

---

## 🔬 Inference Pipeline

```
Upload Image → Validation → Resize (512×512) → Normalization
    ↓
HRNet-W32 Model → Landmark Detection (A, B, C, D)
    ↓
BPD & OFD Calculation → Pixel to mm Conversion
    ↓
Cephalic Index (CI) → Gestational Age Reference
    ↓
Disease Risk Screening → Annotated Image Generation
    ↓
PDF Report → SQLite Storage → JSON Response
```

### Landmark Mapping

| Point | Anatomical Location | Measurement Role |
|-------|-------------------|------------------|
| **A** | Left Parietal Bone | BPD endpoint |
| **B** | Frontal Bone | OFD endpoint |
| **C** | Right Parietal Bone | BPD endpoint |
| **D** | Occipital Bone | OFD endpoint |

---

## 🐳 Docker Deployment

### Using Docker Compose

```bash
docker-compose up --build
```

Services will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

### Manual Docker Build

```bash
# Build backend image
docker build -t fetalscan-backend .

# Run backend container
docker run -p 8000:8000 -e MODEL_WEIGHTS_URL=<your-weights-url> fetalscan-backend
```

---

## 📁 Project Structure

```
FetalScan-AI/
├── backend/                 # FastAPI backend + HRNet inference
│   ├── api/                # API routers (predict, upload, history, etc.)
│   ├── database/           # SQLite database models
│   ├── disease_prediction/ # Disease screening logic
│   ├── inference/          # HRNet model inference
│   ├── models/             # Pydantic models
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   ├── weights/            # Model weights directory
│   └── app.py             # FastAPI application entry point
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── index.html
├── model_assets/           # Training artifacts
│   ├── dataset/           # Training dataset
│   ├── trained_model/     # Backup model weights
│   └── dl_model.ipynb     # Training notebook
├── deployment/            # Deployment configurations
├── docs/                  # Documentation
├── render.yaml            # Render blueprint for deployment
├── Dockerfile             # Backend Docker configuration
├── docker-compose.yml     # Local development compose
└── requirements.txt       # Python dependencies
```

---

## ⚙️ Configuration

Edit `.env` file in the project root:

```env
# Backend Configuration
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:5173,https://fetalscan-ai-1.onrender.com

# Model Configuration
MODEL_WEIGHTS_PATH=backend/weights/best_hrnet.pth
IMG_SIZE=512
HEATMAP_SIZE=128
PIXEL_TO_MM=0.133

# Upload Configuration
MAX_UPLOAD_SIZE_MB=10
ALLOWED_EXTENSIONS=png,jpg,jpeg,bmp,tiff

# Database
DATABASE_URL=sqlite:///./backend/database/fetalscan.db
```

---

## 🛡️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Backend
- **FastAPI** - Modern Python web framework
- **PyTorch 2.1** - Deep learning framework
- **timm** - Pre-trained models (HRNet-W32)
- **OpenCV** - Image processing
- **Albumentations** - Image augmentation
- **SQLAlchemy** - ORM for database
- **ReportLab** - PDF generation
- **Uvicorn** - ASGI server

---

## 📊 Disease Screening

The system screens for:

- **Craniosynostosis** - Premature fusion of skull sutures
- **Microcephaly** - Abnormally small head size
- **Macrocephaly** - Abnormally large head size

Risk scores are calculated based on:
- Cephalic Index deviation from normal range
- Gestational age reference percentiles
- Biometric measurement anomalies

---

## 🔐 Security & Privacy

- All uploaded images are processed in-memory and not permanently stored
- Prediction history is stored locally in SQLite database
- No external API calls for image processing
- CORS configured for trusted origins only
- Input validation and file type checking

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- HRNet model architecture from [Deep High-Resolution Representation Learning](https://arxiv.org/abs/1908.07919)
- Medical imaging community for fetal ultrasound datasets
- Open-source AI/ML community

---

## 📧 Contact

**Samarth Upadhyay** - [GitHub](https://github.com/samarthupadhyay2294-rgb)

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ for medical AI research

</div>
