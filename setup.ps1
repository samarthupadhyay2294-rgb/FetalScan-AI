# FetalScan AI - Windows Setup Script
Write-Host "FetalScan AI Setup" -ForegroundColor Cyan

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Test-Path "backend\weights\best_hrnet.pth")) {
    Write-Host "WARNING: Place best_hrnet.pth in backend\weights\" -ForegroundColor Yellow
}

Write-Host "Installing Python dependencies..."
pip install -r requirements.txt

Write-Host "Installing frontend dependencies..."
Set-Location frontend
npm install
Set-Location ..

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Backend:  cd backend; uvicorn app:app --reload"
Write-Host "Frontend: cd frontend; npm run dev"
