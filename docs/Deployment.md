# Deployment Guide

## Local Development

See README.md for backend and frontend setup.

## Docker Compose

```bash
docker-compose up --build
```

Ensure `backend/weights/best_hrnet.pth` exists before starting.

## Production with Nginx

```bash
docker-compose --profile production up -d
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PIXEL_TO_MM | 0.133 | Pixel to mm conversion |
| MAX_UPLOAD_SIZE_MB | 10 | Max upload size |
| MODEL_WEIGHTS_PATH | backend/weights/best_hrnet.pth | Model path |
| CORS_ORIGINS | localhost:5173 | Allowed origins |
