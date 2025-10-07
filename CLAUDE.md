# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Presenton is an open-source AI presentation generator with a dual-server architecture:
- **FastAPI Backend** (Python): Handles AI generation, document processing, and presentation creation
- **Next.js Frontend** (TypeScript/React): Provides the web UI and presentation rendering

The application generates presentations using various LLM providers (OpenAI, Google, Anthropic, Ollama, Custom), supports custom HTML templates with Tailwind CSS, and exports to PPTX and PDF formats.

## Architecture

### Monorepo Structure

```
presenton/
├── servers/
│   ├── fastapi/          # Python backend (API + AI services)
│   └── nextjs/           # Next.js frontend (UI + presentation rendering)
├── app_data/             # User data, presentations, uploaded files
├── start.js              # Main entry point - starts both servers
└── docker-compose.yml    # Container orchestration
```

### Backend Architecture (FastAPI)

**Entry Points:**
- `servers/fastapi/server.py` - Uvicorn server launcher
- `servers/fastapi/api/main.py` - FastAPI application setup
- `servers/fastapi/mcp_server.py` - Model Context Protocol server

**Key Directories:**
- `api/v1/ppt/endpoints/` - Core API endpoints (presentation generation, slides, outlines, files)
- `services/` - Business logic:
  - `llm_client.py` - Multi-provider LLM client (55k+ lines, handles all LLM interactions)
  - `pptx_presentation_creator.py` - PPTX file generation
  - `image_generation_service.py` - AI image generation (DALL-E, Gemini, Pexels, Pixabay)
  - `documents_loader.py` - PDF/DOCX processing
  - `html_to_text_runs_service.py` - HTML to PowerPoint text conversion
- `models/` - Pydantic data models
- `utils/` - Shared utilities and helpers
- `tests/` - Test suite (pytest-based)

**LLM Provider Architecture:**
The `llm_client.py` is the central orchestrator for all LLM interactions, supporting:
- Streaming and non-streaming responses
- Structured output with JSON schemas
- Tool calling (function calling)
- Web grounding (Google Search integration)
- Multi-turn conversations with message history

### Frontend Architecture (Next.js)

**App Router Structure:**
- `app/(presentation-generator)/` - Main application routes (grouped route)
  - `dashboard/` - Presentation list and management
  - `outline/` - Outline review and editing
  - `presentation/` - Presentation viewer and editor
  - `upload/` - File upload for document-based generation
  - `settings/` - LLM and API configuration
  - `custom-template/` - Template creation from PPTX files
  - `template-preview/` - Preview available templates

**Key Directories:**
- `presentation-templates/` - React components for slide layouts:
  - Each template folder (gamma, general, modern, standard, swift, ab4c) contains slide layout components
  - Each layout is a React component with a Zod schema for data validation
  - Templates use Tailwind CSS for styling
- `components/` - Reusable React components (shadcn/ui based)
- `store/` - Redux Toolkit state management
- `utils/` - Frontend utilities
- `types/` - TypeScript type definitions

### Template System

Templates are React components in `servers/nextjs/presentation-templates/`. Each layout file:
1. Exports a Zod `Schema` defining slide data structure with `ImageSchema` and `IconSchema` for media
2. Exports a default React component that renders the slide
3. Uses Tailwind CSS classes for styling
4. Supports special schema fields for AI-generated content:
   - `__image_url__` and `__image_prompt__` for images
   - `__icon_url__` and `__icon_query__` for icons

The AI backend generates JSON matching these schemas, and the frontend renders them using the corresponding React components.

## Development Commands

### Local Development (from project root)

**Start development servers:**
```bash
node start.js --dev
```
This starts:
- FastAPI backend on http://localhost:8000 (with hot reload)
- Next.js frontend on http://localhost:3000 (with hot reload)
- MCP server on http://localhost:8001
- Ollama server (if available)

**Backend only (FastAPI):**
```bash
cd servers/fastapi
python server.py --port 8000 --reload true
```

**Frontend only (Next.js):**
```bash
cd servers/nextjs
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
```

**Run tests:**
```bash
cd servers/fastapi
pytest                           # Run all tests
pytest tests/test_*.py           # Run specific test
pytest -v                        # Verbose output
pytest -k "test_name"           # Run tests matching pattern
```

**Test Cypress (E2E):**
```bash
cd servers/nextjs
npx cypress open
```

### Docker Development

**Production:**
```bash
docker-compose up production
```

**Development with hot reload:**
```bash
docker-compose up development
```

**With GPU support (for Ollama):**
```bash
docker-compose up production-gpu
docker-compose up development-gpu
```

## Key Configuration Files

### Environment Variables

The application reads configuration from:
1. Environment variables (for Docker deployments)
2. `app_data/userConfig.json` (for local deployments when `CAN_CHANGE_KEYS=true`)

**Critical Environment Variables:**
- `LLM` - LLM provider: openai, google, anthropic, ollama, custom
- `OPENAI_API_KEY`, `GOOGLE_API_KEY`, `ANTHROPIC_API_KEY` - Provider API keys
- `OLLAMA_URL` - Custom Ollama endpoint
- `CUSTOM_LLM_URL`, `CUSTOM_LLM_API_KEY` - OpenAI-compatible custom endpoint
- `IMAGE_PROVIDER` - Image provider: pexels, pixabay, gemini_flash, dall-e-3
- `WEB_GROUNDING` - Enable web search (true/false)
- `TOOL_CALLS` - Enable tool calls for custom LLM (true/false)
- `DATABASE_URL` - External SQL database URL (PostgreSQL, MySQL)
- `CAN_CHANGE_KEYS` - Allow users to modify API keys in UI (true/false)

### Python Dependencies

Managed with `uv` (fast Python package manager):
```bash
cd servers/fastapi
uv sync                    # Install dependencies
uv add package-name        # Add new dependency
```

Dependencies defined in `servers/fastapi/pyproject.toml`.

### Next.js Configuration

- `servers/nextjs/next.config.mjs` - Next.js build configuration
- `servers/nextjs/tailwind.config.ts` - Tailwind CSS configuration
- `servers/nextjs/tsconfig.json` - TypeScript configuration

## API Structure

### Main API Endpoints

**Base URL:** `http://localhost:8000`

**Presentation Generation:**
- `POST /api/v1/ppt/presentation/generate` - Generate complete presentation
- `POST /api/v1/ppt/presentation/outline` - Generate outline only
- `POST /api/v1/ppt/presentation/slides` - Generate slides from outline

**Slide Operations:**
- `POST /api/v1/ppt/slide/generate` - Generate single slide
- `POST /api/v1/ppt/slide/regenerate` - Regenerate existing slide
- `GET /api/v1/ppt/slide/{slide_id}` - Get slide data

**File Operations:**
- `POST /api/v1/ppt/files/upload` - Upload documents (PDF, DOCX, PPTX)
- `GET /api/v1/ppt/files/{file_id}` - Get file metadata

**Template Operations:**
- `GET /api/v1/ppt/layouts` - List available layouts for a template
- `POST /api/v1/ppt/pptx-slides` - Extract slides from PPTX for template creation

**Export:**
- `GET /api/v1/ppt/presentation/{id}/export` - Export as PPTX or PDF

### MCP Server

The `mcp_server.py` implements a Model Context Protocol server for integration with AI assistants like Claude Desktop:
- `generate_presentation` - Tool for generating presentations
- Allows AI assistants to create presentations on behalf of users

## Common Development Workflows

### Adding a New Slide Layout

1. **Create layout component** in `servers/nextjs/presentation-templates/{template-name}/`:
   - Define Zod schema with `ImageSchema` and `IconSchema` for media
   - Create React component that renders the slide
   - Use Tailwind CSS for styling
   - Export both `Schema` and default component

2. **Test locally:**
   - Use template preview at `/template-preview/{template-name}`
   - Verify schema validation and rendering

3. **No backend changes needed** - the system auto-discovers layouts

### Modifying LLM Behavior

1. **Prompts** are defined in `servers/fastapi/api/v1/ppt/endpoints/prompts.py`
2. **LLM interaction logic** is in `servers/fastapi/services/llm_client.py`
3. **Tool calling** is handled by `servers/fastapi/services/llm_tool_calls_handler.py`

### Adding Support for a New LLM Provider

1. Update `enums/llm_provider.py` to add new provider enum
2. Add client creation in `services/llm_client.py` `_get_client()` method
3. Implement message conversion in `_convert_to_*_messages()` methods
4. Add streaming/non-streaming generation methods
5. Update `utils/get_env.py` for environment variable handling

### Working with the Database

The application supports:
- **SQLite** (default) - stored in `container.db` or `app_data/`
- **PostgreSQL** - via `DATABASE_URL` environment variable
- **MySQL** - via `DATABASE_URL` environment variable

Database service is in `servers/fastapi/services/database.py` using SQLModel ORM.

## Testing Guidelines

### Backend Tests

Located in `servers/fastapi/tests/`:
- `test_presentation_generation_api.py` - End-to-end API tests
- `test_image_generation.py` - Image generation service tests
- `test_pptx_creator.py` - PowerPoint generation tests
- `test_mcp_server.py` - MCP server tests
- `test_*_schema_support.py` - LLM schema validation tests

Run specific test:
```bash
cd servers/fastapi
pytest tests/test_presentation_generation_api.py -v
```

### Frontend Tests

Cypress E2E tests in `servers/nextjs/cypress/`:
```bash
cd servers/nextjs
npx cypress open        # Interactive mode
npx cypress run         # Headless mode
```

## Special Considerations

### Image and Icon Handling

- Images can be AI-generated (DALL-E, Gemini) or fetched from stock APIs (Pexels, Pixabay)
- Icons are sourced from public icon libraries
- The backend service downloads and caches media files in `app_data/`
- Templates use special schema fields (`__image_url__`, `__icon_url__`) for AI to understand media requirements

### HTML to PPTX Conversion

The `html_to_text_runs_service.py` converts HTML markup (bold, italic, lists) to PowerPoint text runs. This preserves formatting when generating PPTX files from template-rendered content.

### Document Processing

- Uses `docling` library for PDF extraction
- Supports RAG (Retrieval Augmented Generation) via ChromaDB for long documents
- Chunking strategy in `services/score_based_chunker.py`

### Structured Output

The system uses two approaches for structured JSON generation:
1. **JSON Schema mode** (default) - Direct schema constraints
2. **Tool calling mode** (for custom LLMs) - Via function calling when `TOOL_CALLS=true`

Schemas are processed to ensure compatibility:
- `utils/schema_utils.py` handles schema transformations
- Removes unsupported features for different providers
- Ensures strict JSON Schema compliance for OpenAI

## Debugging Tips

### Backend Issues

1. **Check logs** - FastAPI server prints to stdout
2. **Test LLM client directly:**
   ```python
   from services.llm_client import LLMClient
   client = LLMClient()
   # Test generation
   ```
3. **Validate schemas** - Use `utils/schema_utils.py` utilities
4. **Check user config** - Inspect `app_data/userConfig.json`

### Frontend Issues

1. **Check browser console** - React errors appear there
2. **Verify API calls** - Network tab in DevTools
3. **Redux state** - Use Redux DevTools extension
4. **Template rendering** - Use `/template-preview/{template}` route

### Common Issues

- **"Module not found" errors** - Run `npm install` in `servers/nextjs/`
- **Python import errors** - Run `uv sync` in `servers/fastapi/`
- **LLM not responding** - Check API keys in settings or environment
- **Template not appearing** - Ensure schema is exported correctly and file is in correct directory

## File Paths

When referencing code, always use full paths from project root:
- Backend: `servers/fastapi/api/v1/ppt/endpoints/presentation.py:123`
- Frontend: `servers/nextjs/app/(presentation-generator)/dashboard/page.tsx:45`
- Templates: `servers/nextjs/presentation-templates/gamma/TitleSlideLayout.tsx:12`
