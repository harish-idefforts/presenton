from typing import List, Literal, Optional
from pydantic import BaseModel
import uuid


class SlideContentUpdate(BaseModel):
    index: int
    content: dict


class EditPresentationRequest(BaseModel):
    presentation_id: uuid.UUID
    slides: List[SlideContentUpdate]
    export_as: Literal["pptx", "pdf"] = "pptx"
    filename: Optional[str] = None
    # SharePoint upload parameters
    upload_to_sharepoint: bool = False
    sharepoint_base_folder: Optional[str] = None
    sharepoint_category: Optional[str] = None
