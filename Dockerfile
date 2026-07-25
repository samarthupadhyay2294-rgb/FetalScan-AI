FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 curl && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN grep -v "^torch\|^torchvision\|^pytest\|^pytest-asyncio" requirements.txt > requirements_filtered.txt && \
    pip install --no-cache-dir -r requirements_filtered.txt && \
    pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch torchvision

COPY backend ./backend

ARG MODEL_WEIGHTS_URL
RUN if [ -z "$MODEL_WEIGHTS_URL" ]; then \
        echo "ERROR: MODEL_WEIGHTS_URL build arg is required"; \
        exit 1; \
    fi && \
    mkdir -p /app/backend/weights && \
    curl -fsSL -L --max-time 300 --retry 3 --retry-delay 5 "$MODEL_WEIGHTS_URL" -o /app/backend/weights/best_hrnet.pth || \
    (echo "ERROR: Failed to download model weights from $MODEL_WEIGHTS_URL"; exit 1)

ENV OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1

EXPOSE 8000
WORKDIR /app/backend
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
