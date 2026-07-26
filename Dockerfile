FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 curl && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN grep -v "^torch\|^torchvision\|^pytest\|^pytest-asyncio" requirements.txt > requirements_filtered.txt && \
    pip install --no-cache-dir -r requirements_filtered.txt && \
    pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch torchvision

COPY backend ./backend

ARG MODEL_WEIGHTS_URL=https://github.com/samarthupadhyay2294-rgb/FetalScan-AI/releases/download/weights-v1/best_hrnet.pth
RUN mkdir -p /app/backend/weights && \
    if [ -f /app/backend/weights/best_hrnet.pth ]; then \
        echo "Using local model weights"; \
    elif [ -n "$MODEL_WEIGHTS_URL" ]; then \
        curl -fsSL -L --max-time 300 --retry 3 --retry-delay 5 "$MODEL_WEIGHTS_URL" -o /app/backend/weights/best_hrnet.pth || \
        (echo "ERROR: Failed to download model weights from $MODEL_WEIGHTS_URL"; exit 1); \
    else \
        echo "ERROR: MODEL_WEIGHTS_URL build arg is required when local weights are not present"; \
        exit 1; \
    fi

ENV OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1

EXPOSE 8000
WORKDIR /app/backend
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
