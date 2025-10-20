import os
import re
import uuid
import aiohttp
from typing import Optional
import shutil
from utils.asset_directory_utils import get_uploads_directory


_SAFE_NAME_RE = re.compile(r"[^a-zA-Z0-9_.-]")


def _infer_ext_from_url(url: str) -> str:
    try:
        path = url.split('?')[0]
        ext = os.path.splitext(path)[1].lower()
        if ext in ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'):
            return ext
    except Exception:
        pass
    return '.jpg'


def _safe_filename(name: str) -> str:
    return _SAFE_NAME_RE.sub('_', name)


async def download_to_storage(url: str) -> Optional[str]:
    """
    Downloads a remote image to local uploads/images and returns a public URL path
    like /media/images/{filename}. Returns None on failure.
    """
    uploads = get_uploads_directory()
    images_dir = os.path.join(uploads, 'images')
    os.makedirs(images_dir, exist_ok=True)

    ext = _infer_ext_from_url(url)
    filename = _safe_filename(f"{uuid.uuid4().hex}{ext}")
    file_path = os.path.join(images_dir, filename)

    try:
        timeout = aiohttp.ClientTimeout(total=60)
        async with aiohttp.ClientSession(timeout=timeout, trust_env=True) as session:
            async with session.get(url) as resp:
                if resp.status != 200:
                    return None
                with open(file_path, 'wb') as f:
                    async for chunk in resp.content.iter_chunked(64 * 1024):
                        f.write(chunk)
    except Exception:
        return None

    # Prefer Next.js local image route so the web app origin can serve this file
    return f"/api/local-image/{filename}"


def is_external_media(url: Optional[str]) -> bool:
    if not url or not isinstance(url, str):
        return False
    if url.startswith('/media/images/') or url.startswith('/api/local-image/') or url.startswith('/static/'):
        return False
    return url.startswith('http://') or url.startswith('https://')


def finalize_local_path(path: str) -> Optional[str]:
    """
    Copies a local image file (e.g., generated in a temp dir) into
    APP_DATA_DIRECTORY/uploads/images and returns a public URL
    like /api/local-image/{filename}. Returns None on failure.
    """
    try:
        if not path or not os.path.isfile(path):
            return None
        uploads = get_uploads_directory()
        images_dir = os.path.join(uploads, 'images')
        os.makedirs(images_dir, exist_ok=True)

        filename = os.path.basename(path)
        dest_path = os.path.join(images_dir, filename)
        if os.path.abspath(dest_path) != os.path.abspath(path):
            shutil.copy2(path, dest_path)
        return f"/api/local-image/{filename}"
    except Exception:
        return None
