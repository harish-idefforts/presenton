# Repository Guidelines

## Project Structure & Module Organization
- `servers/fastapi/`: FastAPI backend (Python 3.11). App entry at `api/main.py`, server entry at `server.py`. Business logic in `services/`, schemas in `models/`, API routes under `api/v1/`, and tests in `tests/`. Static assets in `static/`.
- `servers/nextjs/`: Next.js 14 app (TypeScript, Tailwind, Redux Toolkit). Pages and routes in `app/`, UI in `components/`, client state in `store/`, utilities in `utils/`, and presentation templates in `presentation-templates/`.
- Root: orchestration (`start.js`), Docker files (`Dockerfile`, `docker-compose.yml`), env templates (`.env.example`), docs and assets (`docs/`, `readme_assets/`), and data (`app_data/`).

## Build, Test, and Development Commands
- Full stack (dev): `node start.js --dev` — installs Next.js deps if needed and runs FastAPI (8000) + Next.js (3000).
- Frontend: `cd servers/nextjs && npm run dev` (local), `npm run build`, `npm start`, `npm run lint`.
- Backend: `python servers/fastapi/server.py --port 8000 --reload true`.
- Docker (prod image): `docker run -p 5000:80 -v "./app_data:/app_data" ghcr.io/presenton/presenton:latest` or `docker-compose up -d production`.

## Coding Style & Naming Conventions
- TypeScript/React: run `npm run lint`. Use 2-space indent, `PascalCase` for components (`components/Header.tsx`), `camelCase` for variables and Redux slices (`store/slices/*`). Prefer functional components and hooks. Tailwind for styling.
- Python: follow PEP 8 and type hints. Modules and files `snake_case`. Pydantic-style models live in `models/`.

## Testing Guidelines
- Backend: pytest-style tests in `servers/fastapi/tests/` (e.g., `test_pptx_creator.py`). Run: `python -m pytest servers/fastapi/tests`.
- Frontend: Cypress component setup lives in `servers/nextjs/cypress/`. Run locally from `servers/nextjs`: `npx cypress open --component` (add specs under `cypress/`).

## Commit & Pull Request Guidelines
- Commits: use Conventional Commits (e.g., `feat: ...`, `fix: ...`, `docs: ...`). Keep changes focused.
- PRs: include a clear description, linked issues, before/after screenshots or GIFs for UI, and a test plan. Note any env/config changes (update `.env.example`).

## Security & Configuration Tips
- Never commit secrets. Copy `.env.example` to `.env`; prefer environment variables in production (`CAN_CHANGE_KEYS=false`).
- User data and exports live in `app_data/`; keep it out of version control.
