# Local Image Storage Plan

## Goal

- Store all slide media (images/icons) in our own storage at generation time, so presentations never depend on expiring or rate‑limited third‑party URLs.

## Current State

- Slides persist external image URLs (Pixabay/Unsplash/Pexels) in `__image_url__`/`__icon_url__`.
- Rendering later can fail with 400/429 due to CDN hotlink/rate limits or expiring links.
- Backend endpoints in use: `POST /api/v1/ppt/presentation/create`, `POST /api/v1/ppt/presentation/prepare`, `PATCH /api/v1/ppt/presentation/update`.

## Design Overview (Implemented)

- Download-and-rewrite now occurs on the backend (FastAPI) during slide processing. When a slide’s `__image_url__` is an external URL (Pixabay/Unsplash/Pexels), it is downloaded server‑side and rewritten to a stable local URL.
- Rewritten URLs currently point to the Next.js API route: `/api/local-image/{filename}`, which serves files from the configured App Data directory.
- A FastAPI media serving route also exists (`GET /media/images/{filename}`) and can be used instead when Next.js and FastAPI do not share the same storage (see Serving section).

## Storage And Serving

- Directory: `APP_DATA_DIRECTORY/uploads/images` (consistent with Next.js local routes already present).
- Filenames: content hash–based or random hex with preserved extension to avoid collisions.
- Serving:
  - Default (Shared Storage): Next.js `GET /api/local-image/{filename}` (single canonical path). We standardized on this for environments where Next.js and FastAPI share `APP_DATA_DIRECTORY`.
  - Alt (If services do not share storage): Serve from FastAPI `GET /media/images/{filename}` or proxy `/media/images/*` through Next to FastAPI.

## API Changes (Backend)

- No changes to request/response schema needed for generation endpoints.
- Internal step during create/prepare:
  - After slide content assembly → call `localize_media_urls(slides)`:
    - Detect `__image_url__`/`__icon_url__` fields with external hosts.
    - Download to `uploads/images/`.
    - Replace with local URL: `/media/images/{filename}`.
  - Save presentation with rewritten URLs.
- New endpoint (optional, for tooling): `POST /api/v1/ppt/media/cache` that takes a URL, downloads, and returns a local URL (can be used by other services).

## Backend Implementation Steps (Status)

1. Add a media service in FastAPI: ✅
   - `servers/fastapi/app/services/media.py`
     - `download_to_storage(url) -> LocalMedia`: validate URL, get buffer with backoff, infer extension, write to disk, return filename + public URL.
     - `is_external_media(url)` helper to whitelist domains or detect non-local URLs.
   - Rewriting is integrated in `servers/fastapi/utils/process_slides.py` during asset processing. External `__image_url__` values are cached and replaced with `/api/local-image/{filename}`. Manual slide edits now also cache stock URLs (e.g., Pixabay) to local paths.
2. Wire into generation: ✅
   - Slide generation uses `process_slide_and_fetch_assets(...)` where external URLs are now localized.
3. Add serving route: ✅
   - Next.js: `GET /api/local-image/{filename}` (canonical) serves from `APP_DATA_DIRECTORY/uploads/images`.
   - (Optional) FastAPI: `GET /media/images/{filename}` available for non-shared-storage deployments (not used in shared-volume setups).
4. Error handling: ✅
   - If download fails, the original external URL is kept and a placeholder renders if needed; log noise minimized.

## Frontend Changes (Status)

- None required for the core flow: slides continue to read `__image_url__`/`__icon_url__`, now pointing to our domain.
- Optional (later): add `loading="lazy"` and `decoding="async"` to `<img>` in templates for performance.

## Config And Security

- Env: `APP_DATA_DIRECTORY` must exist and be writable by the FastAPI process.
- Domain: ensure `/media/images/` is reachable from the frontend (reverse proxy route if needed).
- File types: allow `png`, `jpg/jpeg`, `webp`, `gif`, `svg`; sanitize extension and content type.
- Migration/Integration env:
  - `FASTAPI_BASE_URL` (Next.js server only): base URL for calling FastAPI during migration (e.g., `https://<your-fastapi-domain>`). Defaults to `http://localhost:8000` in dev.

## Monitoring And Cleanup

- Logging: record source URL → local filename mapping; warn on failures.
- Optional cleanup: when deleting a presentation, consider deleting unreferenced files. For now, defer to keep complexity low.

## Rollout Plan

1. Implement FastAPI media service + serving route.
2. Update create/prepare to rewrite URLs.
3. Deploy and verify new presentations use local URLs.
4. Add a small feature flag to turn on/off rewriting if needed (env var).

## Legacy Content

- Dedicated migration endpoints have been removed. There is no batch migration or single‑ID regeneration API in Next.js anymore.
- New and edited slides are localized automatically during normal generation and editing flows on the backend.
- For legacy presentations that still reference external or placeholder images, recommended approaches:
  - Re-run the standard generation/prepare flow for the presentation so images are localized as part of processing.
  - Manually edit the slide content in the app to trigger image generation/caching via the existing backend logic.

Backend image helper endpoints remain for internal use during normal flows:
- `GET /api/v1/ppt/images/generate?prompt=...` → may return a remote URL or local path; local paths are finalized automatically during processing.
- `POST /api/v1/ppt/images/cache` with `{ url }` → downloads remote to `uploads/images/` and returns `/api/local-image/{filename}`.
