from typing import List
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from models.image_prompt import ImagePrompt
from models.sql.image_asset import ImageAsset
from services.database import get_async_session
from services.image_generation_service import ImageGenerationService
from services.temp_file_service import TEMP_FILE_SERVICE
from utils.asset_directory_utils import get_images_directory
import os
import uuid
from utils.file_utils import get_file_name_with_random_uuid
from utils.asset_directory_utils import get_uploads_directory
import shutil

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
    if not isinstance(image, ImageAsset):
        return image

    sql_session.add(image)
    await sql_session.commit()

    return image.path


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


@IMAGES_ROUTER.post("/finalize")
async def finalize_image_path(
    path: str,
):
    """
    Moves/copies a locally generated image (e.g., from a temp directory) into
    APP_DATA_DIRECTORY/uploads/images and returns a public FastAPI media URL.
    """
    try:
        if not path or not os.path.isfile(path):
            raise HTTPException(status_code=400, detail="Invalid file path")

        uploads_images = os.path.join(get_uploads_directory(), "images")
        os.makedirs(uploads_images, exist_ok=True)

        filename = os.path.basename(path)
        target_path = os.path.join(uploads_images, filename)

        if os.path.abspath(path) != os.path.abspath(target_path):
            shutil.copy2(path, target_path)

        # Return Next.js-served local image URL for a single, consistent path
        return {"url": f"/api/local-image/{filename}"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to finalize image: {str(e)}")
