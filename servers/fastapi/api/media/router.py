from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import os
import re
from utils.asset_directory_utils import get_uploads_directory, get_images_directory
from utils.get_env import get_app_data_directory_env


MEDIA_ROUTER = APIRouter(prefix="/media", tags=["Media"])


@MEDIA_ROUTER.get("/images/{filename}")
async def get_image(filename: str):
    if not filename or re.search(r"[^a-zA-Z0-9_.-]", filename):
        raise HTTPException(status_code=404, detail="Not found")

    # Primary path: APP_DATA_DIRECTORY/uploads/images
    base_uploads = get_uploads_directory()
    candidates = [
      os.path.join(base_uploads, 'images', filename),
      # Fallback: APP_DATA_DIRECTORY/images (older paths)
      os.path.join(get_images_directory(), filename),
    ]
    # Additional fallback: try ./app_data/uploads/images and ./uploads/images relative to cwd
    app_data = get_app_data_directory_env()
    if app_data:
        candidates.append(os.path.join(app_data, 'uploads', 'images', filename))
        candidates.append(os.path.join(app_data, 'images', filename))
    candidates.append(os.path.join(os.getcwd(), 'app_data', 'uploads', 'images', filename))
    candidates.append(os.path.join(os.getcwd(), 'uploads', 'images', filename))

    path = next((p for p in candidates if os.path.isfile(p)), None)
    if not path:
        raise HTTPException(status_code=404, detail="Not found")

    ext = os.path.splitext(filename)[1].lower()
    content_type = (
        'image/png' if ext == '.png' else
        'image/webp' if ext == '.webp' else
        'image/gif' if ext == '.gif' else
        'image/svg+xml' if ext == '.svg' else
        'image/jpeg'
    )

    headers = {'Cache-Control': 'public, max-age=31536000, immutable'}
    return StreamingResponse(open(path, 'rb'), media_type=content_type, headers=headers)
