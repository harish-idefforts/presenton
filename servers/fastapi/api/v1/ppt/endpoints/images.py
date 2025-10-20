from typing import List
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from sqlalchemy.orm.attributes import flag_modified

from models.image_prompt import ImagePrompt
from models.sql.image_asset import ImageAsset
from models.sql.presentation import PresentationModel
from models.sql.slide import SlideModel
from services.database import get_async_session
from services.image_generation_service import ImageGenerationService
from services.temp_file_service import TEMP_FILE_SERVICE
from utils.asset_directory_utils import get_images_directory
import os
import uuid
from utils.file_utils import get_file_name_with_random_uuid
from utils.asset_directory_utils import get_uploads_directory
from services.media_service import download_to_storage, is_external_media, finalize_local_path
from utils.dict_utils import get_dict_paths_with_key, get_dict_at_path, set_dict_at_path
import uuid as _uuid

IMAGES_ROUTER = APIRouter(prefix="/images", tags=["Images"])


@IMAGES_ROUTER.get("/generate")
async def generate_image(
    prompt: str, sql_session: AsyncSession = Depends(get_async_session)
):
    images_directory = get_images_directory()
    image_prompt = ImagePrompt(prompt=prompt)
    temp_dir = TEMP_FILE_SERVICE.create_temp_dir()
    image_generation_service = ImageGenerationService(images_directory, temp_dir=temp_dir)

    image = await image_generation_service.generate_image(image_prompt)
    # Normalize output to a public local URL when possible
    if isinstance(image, ImageAsset):
        # Persist metadata for reference/history
        sql_session.add(image)
        await sql_session.commit()
        finalized = finalize_local_path(image.path)
        return finalized or image.path
    elif isinstance(image, str):
        # If it's an external URL, download to storage and return local URL
        if is_external_media(image):
            cached = await download_to_storage(image)
            return cached or image
        # If it's a local path, finalize to uploads and return local URL
        finalized = finalize_local_path(image)
        return finalized or image
    return image


@IMAGES_ROUTER.get("/generated", response_model=List[ImageAsset])
async def get_generated_images(sql_session: AsyncSession = Depends(get_async_session)):
    try:
        images = await sql_session.scalars(
            select(ImageAsset)
            .where(ImageAsset.is_uploaded == False)
            .order_by(ImageAsset.created_at.desc())
        )
        return images
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve generated images: {str(e)}"
        )


@IMAGES_ROUTER.post("/upload")
async def upload_image(
    file: UploadFile = File(...), sql_session: AsyncSession = Depends(get_async_session)
):
    try:
        new_filename = get_file_name_with_random_uuid(file)
        image_path = os.path.join(
            get_images_directory(), os.path.basename(new_filename)
        )

        with open(image_path, "wb") as f:
            f.write(await file.read())

        image_asset = ImageAsset(path=image_path, is_uploaded=True)

        sql_session.add(image_asset)
        await sql_session.commit()

        return image_asset
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")


@IMAGES_ROUTER.get("/uploaded", response_model=List[ImageAsset])
async def get_uploaded_images(sql_session: AsyncSession = Depends(get_async_session)):
    try:
        images = await sql_session.scalars(
            select(ImageAsset)
            .where(ImageAsset.is_uploaded == True)
            .order_by(ImageAsset.created_at.desc())
        )
        return images
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve uploaded images: {str(e)}"
        )


@IMAGES_ROUTER.delete("/{id}", status_code=204)
async def delete_uploaded_image_by_id(
    id: uuid.UUID, sql_session: AsyncSession = Depends(get_async_session)
):
    try:
        # Fetch the asset to get its actual file path
        image = await sql_session.get(ImageAsset, id)
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")

        os.remove(image.path)

        await sql_session.delete(image)
        await sql_session.commit()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete image: {str(e)}")


# Removed finalize endpoint; local images are finalized server-side during processing


class CacheImageRequest(BaseModel):
    url: str


@IMAGES_ROUTER.post("/cache")
async def cache_image(payload: CacheImageRequest):
    """
    Downloads a remote image URL into persistent uploads/images and returns
    a local URL that the web app can use.
    """
    try:
        if not payload.url or not isinstance(payload.url, str):
            raise HTTPException(status_code=400, detail="Invalid url")
        cached = await download_to_storage(payload.url)
        if not cached:
            raise HTTPException(status_code=502, detail="Failed to cache image")
        return {"url": cached}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to cache image: {str(e)}")


class RefreshPresentationRequest(BaseModel):
    id: _uuid.UUID


@IMAGES_ROUTER.post("/refresh-presentation")
async def refresh_presentation_images(payload: RefreshPresentationRequest, sql_session: AsyncSession = Depends(get_async_session)):
    """
    For a given presentation, iterate through all slides and regenerate images
    where the current __image_url__ points to pixabay.com or pexels.com, using
    the slide's __image_prompt__. Newly generated images are stored locally and
    slide content is updated to reference `/api/local-image/{filename}`.
    """
    pres = await sql_session.get(PresentationModel, payload.id)
    if not pres:
        raise HTTPException(status_code=404, detail="Presentation not found")

    slides = await sql_session.scalars(
        select(SlideModel).where(SlideModel.presentation == payload.id).order_by(SlideModel.index)
    )

    images_directory = get_images_directory()
    temp_dir = TEMP_FILE_SERVICE.create_temp_dir()
    image_generation_service = ImageGenerationService(images_directory, temp_dir=temp_dir)

    changed = False
    processed = 0
    regenerated = 0

    for slide in slides:
        # Find dicts that contain __image_prompt__
        image_paths = get_dict_paths_with_key(slide.content, "__image_prompt__")
        slide_changed = False
        for path in image_paths:
            image_dict = get_dict_at_path(slide.content, path) or {}
            prompt = image_dict.get("__image_prompt__", "").strip()
            url = image_dict.get("__image_url__", "")
            if not prompt:
                continue
            # Only target pixabay.com or pexels.com
            try:
                host = ""
                if isinstance(url, str) and (url.startswith("http://") or url.startswith("https://")):
                    from urllib.parse import urlparse
                    host = urlparse(url).hostname or ""
                needs_regen = host.endswith("pixabay.com") or host.endswith("pexels.com") or (".pixabay.com" in host) or (".pexels.com" in host)
            except Exception:
                needs_regen = False

            if not needs_regen:
                continue

            processed += 1
            try:
                result = await image_generation_service.generate_image(ImagePrompt(prompt=prompt))
                final_url: str | None = None
                if isinstance(result, ImageAsset):
                    final_url = finalize_local_path(result.path) or result.path
                elif isinstance(result, str):
                    if is_external_media(result):
                        cached = await download_to_storage(result)
                        final_url = cached or result
                    else:
                        final_url = finalize_local_path(result) or result
                if final_url:
                    image_dict["__image_url__"] = final_url
                    set_dict_at_path(slide.content, path, image_dict)
                    slide_changed = True
                    regenerated += 1
            except Exception:
                # Skip errors per image to continue batch
                pass

        if slide_changed:
            # Ensure SQLAlchemy detects JSON field mutation
            try:
                flag_modified(slide, "content")
            except Exception:
                # Fallback: reassign content to trigger change detection
                slide.content = dict(slide.content or {})
            sql_session.add(slide)
            changed = True
    
    if changed:
        await sql_session.commit()

    return {"id": str(payload.id), "updated": changed, "processed": processed, "regenerated": regenerated}
