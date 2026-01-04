from typing import Optional
from pydantic import BaseModel
import uuid


class PresentationAndPath(BaseModel):
    presentation_id: uuid.UUID
    path: str
    # Optional SharePoint fields (only present when uploaded to SharePoint)
    sharepoint_url: Optional[str] = None
    sharepoint_download_url: Optional[str] = None


class PresentationPathAndEditPath(PresentationAndPath):
    edit_path: str
