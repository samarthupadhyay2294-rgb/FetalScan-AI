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

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| PIXEL_TO_MM | 0.133 | Pixel to mm conversion |
| MAX_UPLOAD_SIZE_MB | 10 | Max upload size |
| MODEL_WEIGHTS_PATH | backend/weights/best_hrnet.pth | Model path |
| CORS_ORIGINS | http://localhost:5173,http://127.0.0.1:5173 | Allowed frontend origins |
| DATABASE_URL | sqlite:///./backend/database/fetalscan.db | Database connection URL |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_BASE | /api | Backend API base URL for frontend requests |
| VITE_SUPABASE_URL | (none) | Supabase project URL for authentication |
| VITE_SUPABASE_PUBLISHABLE_KEY | (none) | Supabase public anon key |

When deploying the frontend separately from the backend, set `VITE_API_BASE` to your backend origin, for example:

```env
VITE_API_BASE=https://fetalscan-ai.onrender.com
```

Also ensure the backend `CORS_ORIGINS` includes your frontend domain, for example:

```env
CORS_ORIGINS=https://fetalscan-ai-1.onrender.com
```
