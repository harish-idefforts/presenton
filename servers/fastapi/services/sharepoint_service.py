import os
import time
from typing import Optional, Tuple
import aiohttp

from utils.get_env import (
    get_sharepoint_tenant_id_env,
    get_sharepoint_client_id_env,
    get_sharepoint_client_secret_env,
    get_sharepoint_site_id_env,
    get_sharepoint_drive_id_env,
)


class SharePointService:
    """
    Service for uploading files to SharePoint via Microsoft Graph API.
    Uses app-only (client credentials) authentication.
    """

    # Token cache
    _access_token: Optional[str] = None
    _token_expires_at: float = 0

    # Graph API base URL
    GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0"

    # Large file threshold (4MB)
    LARGE_FILE_THRESHOLD = 4 * 1024 * 1024

    def __init__(self):
        self.tenant_id = get_sharepoint_tenant_id_env()
        self.client_id = get_sharepoint_client_id_env()
        self.client_secret = get_sharepoint_client_secret_env()
        self.site_id = get_sharepoint_site_id_env()
        self.drive_id = get_sharepoint_drive_id_env()

    def is_configured(self) -> bool:
        """Check if SharePoint credentials are configured."""
        return all([self.tenant_id, self.client_id, self.client_secret])

    async def get_access_token(self) -> str:
        """
        Get a valid access token, refreshing if needed.
        Tokens are cached and refreshed 5 minutes before expiry.
        """
        # Check if we have a valid cached token (with 5 min buffer)
        if self._access_token and time.time() < (self._token_expires_at - 300):
            return self._access_token

        # Request new token
        token_url = f"https://login.microsoftonline.com/{self.tenant_id}/oauth2/v2.0/token"

        data = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "client_credentials",
            "scope": "https://graph.microsoft.com/.default",
        }

        async with aiohttp.ClientSession(trust_env=True) as session:
            async with session.post(token_url, data=data) as response:
                if response.status != 200:
                    error_text = await response.text()
                    raise Exception(f"Failed to get SharePoint access token: {error_text}")

                result = await response.json()
                SharePointService._access_token = result["access_token"]
                # Token expires_in is in seconds
                SharePointService._token_expires_at = time.time() + result.get("expires_in", 3600)

                return SharePointService._access_token

    async def create_folder(self, folder_path: str) -> dict:
        """
        Create a folder at the specified path.
        Creates parent folders if they don't exist.

        Args:
            folder_path: Path like "presentations/english/category"

        Returns:
            DriveItem metadata of the created folder
        """
        token = await self.get_access_token()
        parts = folder_path.strip("/").split("/")

        current_path = ""
        result = None

        for part in parts:
            parent_path = current_path
            current_path = f"{current_path}/{part}" if current_path else part

            # Try to create folder
            if parent_path:
                url = f"{self.GRAPH_BASE_URL}/drives/{self.drive_id}/root:/{parent_path}:/children"
            else:
                url = f"{self.GRAPH_BASE_URL}/drives/{self.drive_id}/root/children"

            body = {
                "name": part,
                "folder": {},
                "@microsoft.graph.conflictBehavior": "fail",
            }

            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            }

            async with aiohttp.ClientSession(trust_env=True) as session:
                async with session.post(url, json=body, headers=headers) as response:
                    if response.status == 201:
                        # Folder created
                        result = await response.json()
                    elif response.status == 409:
                        # Folder already exists, that's fine
                        pass
                    else:
                        error_text = await response.text()
                        raise Exception(f"Failed to create folder '{part}': {error_text}")

        return result

    async def upload_file(
        self,
        folder_path: str,
        filename: str,
        file_path: str,
    ) -> Tuple[str, Optional[str]]:
        """
        Upload a file to SharePoint.

        Args:
            folder_path: Target folder path (e.g., "presentations/english/category")
            filename: Target filename (e.g., "presentation.pptx")
            file_path: Local path to the file to upload

        Returns:
            Tuple of (webUrl, downloadUrl)
        """
        # Ensure folder exists
        await self.create_folder(folder_path)

        # Get file size to determine upload method
        file_size = os.path.getsize(file_path)

        if file_size > self.LARGE_FILE_THRESHOLD:
            return await self._upload_large_file(folder_path, filename, file_path, file_size)
        else:
            return await self._upload_small_file(folder_path, filename, file_path)

    async def _upload_small_file(
        self,
        folder_path: str,
        filename: str,
        file_path: str,
    ) -> Tuple[str, Optional[str]]:
        """Upload small file using simple PUT."""
        token = await self.get_access_token()

        # Determine content type
        content_type = "application/octet-stream"
        if filename.endswith(".pptx"):
            content_type = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        elif filename.endswith(".pdf"):
            content_type = "application/pdf"

        url = f"{self.GRAPH_BASE_URL}/drives/{self.drive_id}/root:/{folder_path}/{filename}:/content"

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": content_type,
        }

        with open(file_path, "rb") as f:
            file_content = f.read()

        async with aiohttp.ClientSession(trust_env=True) as session:
            async with session.put(url, data=file_content, headers=headers) as response:
                if response.status not in [200, 201]:
                    error_text = await response.text()
                    raise Exception(f"Failed to upload file: {error_text}")

                result = await response.json()
                return (
                    result.get("webUrl", ""),
                    result.get("@microsoft.graph.downloadUrl"),
                )

    async def _upload_large_file(
        self,
        folder_path: str,
        filename: str,
        file_path: str,
        file_size: int,
    ) -> Tuple[str, Optional[str]]:
        """Upload large file using upload session."""
        token = await self.get_access_token()

        # Create upload session
        session_url = f"{self.GRAPH_BASE_URL}/drives/{self.drive_id}/root:/{folder_path}/{filename}:/createUploadSession"

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        body = {
            "item": {
                "@microsoft.graph.conflictBehavior": "replace",
            }
        }

        async with aiohttp.ClientSession(trust_env=True) as session:
            async with session.post(session_url, json=body, headers=headers) as response:
                if response.status != 200:
                    error_text = await response.text()
                    raise Exception(f"Failed to create upload session: {error_text}")

                session_result = await response.json()
                upload_url = session_result["uploadUrl"]

        # Upload file in chunks
        chunk_size = 10 * 1024 * 1024  # 10MB chunks

        with open(file_path, "rb") as f:
            start = 0
            result = None

            while start < file_size:
                end = min(start + chunk_size, file_size) - 1
                chunk = f.read(chunk_size)

                chunk_headers = {
                    "Content-Length": str(len(chunk)),
                    "Content-Range": f"bytes {start}-{end}/{file_size}",
                }

                async with aiohttp.ClientSession(trust_env=True) as session:
                    async with session.put(upload_url, data=chunk, headers=chunk_headers) as response:
                        if response.status == 202:
                            # More chunks to upload
                            pass
                        elif response.status in [200, 201]:
                            # Upload complete
                            result = await response.json()
                        else:
                            error_text = await response.text()
                            raise Exception(f"Failed to upload chunk: {error_text}")

                start = end + 1

        if result:
            return (
                result.get("webUrl", ""),
                result.get("@microsoft.graph.downloadUrl"),
            )

        raise Exception("Upload completed but no result received")


# Singleton instance
SHAREPOINT_SERVICE = SharePointService()
