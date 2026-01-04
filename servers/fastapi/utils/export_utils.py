import json
import os
import aiohttp
from typing import Literal
import uuid
from fastapi import HTTPException
from pathvalidate import sanitize_filename
import shutil
from typing import Optional

from models.pptx_models import PptxPresentationModel
from models.presentation_and_path import PresentationAndPath
from services.pptx_presentation_creator import PptxPresentationCreator
from services.temp_file_service import TEMP_FILE_SERVICE
from utils.asset_directory_utils import get_exports_directory
import uuid


async def export_presentation(
    presentation_id: uuid.UUID,
    title: str,
    export_as: Literal["pptx", "pdf"],
    temp_dir: Optional[str] = None,
    filename_override: Optional[str] = None,
    # SharePoint upload parameters
    upload_to_sharepoint: bool = False,
    sharepoint_base_folder: Optional[str] = None,
    sharepoint_category: Optional[str] = None,
) -> PresentationAndPath:

    # Use filename_override if provided, otherwise use title
    # sanitize_filename handles OS-level invalid chars, but we also need to handle
    # SharePoint-specific problematic chars like # (URL fragment identifier)
    raw_filename = filename_override or title or str(uuid.uuid4())
    safe_filename = sanitize_filename(raw_filename).replace("#", "")

    if export_as == "pptx":
        # This flag tells us if we are responsible for cleaning up the directory
        created_temp_dir_here = False
        
        # 2. IF NO TEMP DIRECTORY IS PROVIDED, CREATE ONE
        if not temp_dir:
            temp_dir = TEMP_FILE_SERVICE.create_temp_dir()
            created_temp_dir_here = True

        # 3. WRAP THE LOGIC IN A TRY...FINALLY BLOCK
        try:
            # Get the converted PPTX model from the Next.js service
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    "http://localhost/api/presentation_to_pptx_model",
                    params={
                        "id": str(presentation_id),
                        "tempDir": temp_dir,
                    },
                ) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        print(f"Failed to get PPTX model: {error_text}")
                        raise HTTPException(
                            status_code=500,
                            detail="Failed to convert presentation to PPTX model",
                        )
                    pptx_model_data = await response.json()

            # Create PPTX file using the converted model
            pptx_model = PptxPresentationModel(**pptx_model_data)
            pptx_creator = PptxPresentationCreator(pptx_model, temp_dir)
            await pptx_creator.create_ppt()

            export_directory = get_exports_directory()
            pptx_path = os.path.join(
                export_directory,
                f"{safe_filename}.pptx",
            )
            pptx_creator.save(pptx_path)

            # Upload to SharePoint if requested
            sharepoint_url = None
            sharepoint_download_url = None

            if upload_to_sharepoint:
                sharepoint_url, sharepoint_download_url = await _upload_to_sharepoint(
                    file_path=pptx_path,
                    base_folder=sharepoint_base_folder,
                    category=sharepoint_category,
                    filename=safe_filename,
                    extension="pptx",
                )

            return PresentationAndPath(
                presentation_id=presentation_id,
                path=pptx_path,
                sharepoint_url=sharepoint_url,
                sharepoint_download_url=sharepoint_download_url,
            )
        finally:
            # 4. CLEAN UP ONLY IF THIS FUNCTION CREATED THE DIRECTORY
            if created_temp_dir_here and os.path.exists(temp_dir):
                print(f"Cleaning up temporary export directory: {temp_dir}")
                shutil.rmtree(temp_dir)

    else:  # PDF export
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "http://localhost/api/export-as-pdf",
                json={
                    "id": str(presentation_id),
                    "title": safe_filename,
                },
            ) as response:
                response_json = await response.json()

        pdf_path = response_json["path"]

        # Upload to SharePoint if requested
        sharepoint_url = None
        sharepoint_download_url = None

        if upload_to_sharepoint:
            sharepoint_url, sharepoint_download_url = await _upload_to_sharepoint(
                file_path=pdf_path,
                base_folder=sharepoint_base_folder,
                category=sharepoint_category,
                filename=safe_filename,
                extension="pdf",
            )

        return PresentationAndPath(
            presentation_id=presentation_id,
            path=pdf_path,
            sharepoint_url=sharepoint_url,
            sharepoint_download_url=sharepoint_download_url,
        )


async def _upload_to_sharepoint(
    file_path: str,
    base_folder: Optional[str],
    category: Optional[str],
    filename: str,
    extension: str,
) -> tuple[Optional[str], Optional[str]]:
    """
    Helper function to upload a file to SharePoint.

    Args:
        file_path: Local path to the file
        base_folder: Base folder path (e.g., 'training/english', 'onepager/french')
        category: Category subfolder
        filename: Desired filename (without extension)
        extension: File extension (pptx/pdf)

    Returns:
        Tuple of (sharepoint_url, sharepoint_download_url)
    """
    from services.sharepoint_service import SHAREPOINT_SERVICE

    if not SHAREPOINT_SERVICE.is_configured():
        print("SharePoint not configured, skipping upload")
        return None, None

    try:
        # Build folder path: presentations/{base_folder}/{category}
        folder_parts = ["presentations"]
        if base_folder:
            folder_parts.append(base_folder.strip("/"))
        if category:
            folder_parts.append(sanitize_filename(category))

        folder_path = "/".join(folder_parts)

        # Filename is already sanitized, just add extension
        full_filename = f"{filename}.{extension}"

        print(f"Uploading to SharePoint: {folder_path}/{full_filename}")

        sharepoint_url, download_url = await SHAREPOINT_SERVICE.upload_file(
            folder_path=folder_path,
            filename=full_filename,
            file_path=file_path,
        )

        print(f"SharePoint upload successful: {sharepoint_url}")
        return sharepoint_url, download_url

    except Exception as e:
        print(f"SharePoint upload failed: {e}")
        # Don't fail the entire export if SharePoint upload fails
        return None, None
