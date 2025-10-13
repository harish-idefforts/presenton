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
    temp_dir: Optional[str] = None, # <-- NEW ARGUMENT
) -> PresentationAndPath:

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
                    f"http://localhost/api/presentation_to_pptx_model?id={presentation_id}"
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
                f"{sanitize_filename(title or str(uuid.uuid4()))}.pptx",
            )
            pptx_creator.save(pptx_path)

            return PresentationAndPath(
                presentation_id=presentation_id,
                path=pptx_path,
            )
        finally:
            # 4. CLEAN UP ONLY IF THIS FUNCTION CREATED THE DIRECTORY
            if created_temp_dir_here and os.path.exists(temp_dir):
                print(f"Cleaning up temporary export directory: {temp_dir}")
                shutil.rmtree(temp_dir)

    else: # The PDF path remains unchanged
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "http://localhost/api/export-as-pdf",
                json={
                    "id": str(presentation_id),
                    "title": sanitize_filename(title or str(uuid.uuid4())),
                },
            ) as response:
                response_json = await response.json()

        return PresentationAndPath(
            presentation_id=presentation_id,
            path=response_json["path"],
        )