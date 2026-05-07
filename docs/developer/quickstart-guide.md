# Quickstart Guide

Quick reference for running the various local environments. For the first-time setup, see [installation.md](installation.md).

## Development mode (Docker)

Make sure `dev/dev.env` exists with the right values (copy from `dev/dev.env.example` and fill in placeholders).

```sh
docker compose up --watch
```

Endpoints:

- **Frontend**: http://localhost:3000 (Next.js dev server)
- **Backend API**: http://localhost:8000/api/
- **Django admin**: http://localhost:8000/admin/ (bootstrap an account with `docker compose run django python manage.py createsuperuser`)
- **Healthcheck**: http://localhost:8000/api/healthcheck

Test that the backend is wired up:

```sh
curl http://localhost:8000/api/healthcheck
```

A non-existent API endpoint returns a structured 404:

```json
{"error": "API endpoint not found", "status_code": 404, "message": "The requested API endpoint does not exist"}
```

For one-shot commands inside running containers (migrations, package installs, etc.), see the [Useful Docker commands](devops.md#useful-docker-commands) section in devops.md.

## Development mode (without Docker)

Useful for debugging stack-specific issues. Requires Node.js 22 LTS, Python 3.12, and Poetry installed locally; Postgres still runs in Docker so you don't need a local install.

Start the database container:

```sh
docker compose up pgdb
```

Run **backend** in one terminal:

```sh
cd backend
poetry install
poetry run python manage.py migrate
poetry run python manage.py runserver localhost:8000
```

Run **frontend** in another terminal:

```sh
cd frontend
npm install
npm run dev
```

Frontend on http://localhost:3000, backend on http://localhost:8000.

## Local stage environment

Mirrors the deployed-stage three-container shape (production builds, no hot reload). Useful for verifying production-shape behavior before pushing; catches issues that only surface with production builds (`collectstatic` failures, env-var differences, etc.).

```sh
docker compose -f docker-compose.stage.yml up
```

Requires `stage/stage.env` (copy from `stage/stage.env.example`). Stage and dev env files are *not* interchangeable; they carry different secrets, debug flags, and database names. See [devops.md](devops.md).

## Backend linting

Lint normally runs automatically via pre-commit on `git commit` (see [devops.md → Linting](devops.md#linting)). Run manually from `backend/` when you want to lint without committing:

```sh
poetry install
poetry run ruff check .          # Lint (pyflakes + pycodestyle + isort + bugbear + django + ...)
poetry run ruff format .         # Format (black-compatible)
poetry run mypy ctj_api backend  # Type-check (gradual mode; see CONTRIBUTING.md)
poetry run bandit -r ctj_api backend -c pyproject.toml  # Security scan
```

`ruff` does the linting + formatting + import sorting in one tool, replacing the legacy `black + flake8 + isort` chain. See [backend.md → Local dev - lint](backend.md#local-dev---lint) for tool-specific config notes.

## Frontend linting

Same pattern: pre-commit runs these on `git commit`. Run manually from `frontend/`:

```sh
npm run lint           # ESLint
npm run lint:css       # Stylelint (CSS Modules)
npm run lint:dead      # Knip (unused files / exports / deps)
npm run lint:types     # tsc --noEmit
npm run format         # Prettier
```

See [frontend-lint-guide.md](frontend-lint-guide.md) for rule details.

## Deployed stage

Reachable at https://stage.civictechjobs.org/. Built and deployed automatically on push to `main`. See [deployment-infra.md](deployment-infra.md) for the deployment shape.
