"""Image upload endpoint."""

from fastapi import APIRouter, File, UploadFile

from backend.services.upload_service import save_upload

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("")
async def upload_image(file: UploadFile = File(...)):
    result = await save_upload(file)
    return {
        "success": True,
        "message": "Image uploaded successfully",
        "data": result,
    }
