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
  - Default (Dev/Shared Storage): Next.js `GET /api/local-image/{filename}`. This route probes common locations (e.g., `APP_DATA_DIRECTORY/uploads/images`, `APP_DATA_DIRECTORY/images`, `./app_data/uploads/images`) and serves with long cache headers.
  - Alt (Prod/No Shared Storage): FastAPI `GET /media/images/{filename}` streams from `APP_DATA_DIRECTORY/uploads/images`. Switch generators to return this URL shape if Next.js and FastAPI do not share the same persistent volume.

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
   - Rewriting is integrated in `servers/fastapi/utils/process_slides.py` during asset processing. External `__image_url__` values are cached and replaced with `/api/local-image/{filename}`.
2. Wire into generation: ✅
   - Slide generation uses `process_slide_and_fetch_assets(...)` where external URLs are now localized.
3. Add serving route: ✅
   - FastAPI: `GET /media/images/{filename}` with long cache headers.
   - Next.js: `GET /api/local-image/{filename}` probes multiple on-disk locations for resilience.
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

## Migration (Separate Phase)

- A Next.js server route exists: `POST /api/migrate-external-images`. It:
  - Fetches presentations from FastAPI (`FASTAPI_BASE_URL`),
  - Downloads external images to local storage via `/api/cache-image`,
  - Rewrites `__image_url__`/`__icon_url__` to `/api/local-image/{filename}`,
  - Persists updates via `PATCH {FASTAPI_BASE_URL}/api/v1/ppt/presentation/update`.
- Usage:
  - Single: `POST /api/migrate-external-images` with `{ "ids": ["<presentation-id>"] }`.
  - Batch: `{ "limit": 50, "offset": 0 }` and increment `offset`.
- After the above is stable, we can extend migration to also move AI‑generated temp files into persistent storage and rewrite any file-path references to `/api/local-image/{filename}`.
  - Fetch batches of existing presentations.
  - Download external media and rewrite URLs in-place.
  - Update presentations via `PATCH /api/v1/ppt/presentation/update`.
- Orchestrate server-side to avoid front-end load spikes.
