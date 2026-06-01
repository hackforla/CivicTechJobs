# Quickstart Guide

Quick reference for running the various local environments. For the first-time setup, see [installation.md](installation.md).

Common dev commands are wrapped in the repo-root `Makefile`. Run `make help` to see the full categorized command reference. The canonical-task-runner decision is in [ADR-0014](../decisions/0014-make-canonical-task-runner.md).

## Development mode (Docker)

Make sure `dev/dev.env` exists with the right values (copy from `dev/dev.env.example` and fill in placeholders).

```sh
make docker-up        # bring up the full dev stack (detached, with build)
make docker-watch     # run compose watch (live host->container sync)
make docker-logs      # stream the dev stack logs
make docker-down      # stop the dev stack
```

Endpoints:

- **Frontend**: http://localhost:3000 (Next.js dev server)
- **Backend API**: http://localhost:8000/api/
- **Django admin**: http://localhost:8000/admin/ (bootstrap an account with `make local-superuser`)
- **Healthcheck**: http://localhost:8000/api/healthcheck/

Test that the backend is wired up:

```sh
curl http://localhost:8000/api/healthcheck/
```

A non-existent API endpoint returns a structured 404:

```json
{"error": {"code": "not_found", "message": "The requested API endpoint does not exist."}}
```

For one-shot commands inside running containers (migrations, package installs, etc.), see the [Useful Docker commands](devops.md#useful-docker-commands) section in devops.md.

## Development mode (without Docker)

Useful for debugging stack-specific issues. Requires Node.js 24, Python 3.13, and Poetry installed locally; Postgres still runs in Docker so you don't need a local install.

Start the database container, then install host dependencies:

```sh
make db-up            # postgres only, in Docker
make local-install    # install frontend (npm) + backend (poetry) deps
```

Run **backend** in one terminal:

```sh
make local-run-backend     # stops the docker django service, then runs Django on host
```

Run **frontend** in another terminal:

```sh
make local-run-frontend    # stops the docker next service, then runs Next.js on host
```

Frontend on http://localhost:3000, backend on http://localhost:8000. The host-process targets auto-stop the matching Docker service first to avoid port conflicts.

## Database operations

Common DB targets (against the running dev stack):

```sh
make db-migrate                # apply Django migrations
make db-makemigrations         # create migration files
make db-reset                  # truncate all app data (keeps schema + migrations); prompts for 'yes'
make db-reset-hard             # drop the volume and recreate the DB container; prompts for 'yes'
make db-grant-test-db-perms    # grant the test runner CREATEDB perms
```

## Running tests

```sh
make local-test                # backend + frontend
make local-test-backend        # Django tests via Poetry on host
make local-test-frontend       # vitest on host
```

## Shell access

```sh
make docker-shell-backend      # shell into the django container
make docker-shell-frontend     # shell into the next container
make docker-shell-db           # psql shell into the pgdb container
```

## Local stage environment

Mirrors the deployed-stage three-container shape (production builds, no hot reload). Useful for verifying production-shape behavior before pushing; catches issues that only surface with production builds (`collectstatic` failures, env-var differences, etc.).

The Makefile doesn't currently wrap stage targets (the deployed shape is owned by the `incubator` repo and stage tooling is still settling). Run directly:

```sh
docker compose -f docker-compose.stage.yml up
```

Requires `stage/stage.env` (copy from `stage/stage.env.example`). Stage and dev env files are *not* interchangeable; they carry different secrets, debug flags, and database names. See [devops.md](devops.md).

## Linting

Lint normally runs automatically via pre-commit on `git commit` (see [devops.md → Linting](devops.md#linting)). To run the full suite manually:

```sh
make lint              # delegates to pre-commit run --all-files
make install-hooks     # install the pre-commit git hook (one-time)
```

The full suite covers backend (ruff lint + ruff format + mypy + bandit) and frontend (eslint + stylelint + knip + tsc + prettier). To run individual tools (e.g. just `ruff` while iterating on Python), invoke them directly:

```sh
# backend
cd backend
poetry run ruff check .
poetry run ruff format .
poetry run mypy ctj_api backend
poetry run bandit -r ctj_api backend -c pyproject.toml

# frontend
cd frontend
npm run lint
npm run lint:css
npm run lint:dead
npm run lint:types
npm run format
```

`ruff` does the linting + formatting + import sorting in one tool, replacing the legacy `black + flake8 + isort` chain. See [backend.md → Local dev - lint](backend.md#local-dev---lint) and [frontend-lint-guide.md](frontend-lint-guide.md) for tool-specific config notes.

## Local utilities

```sh
make local-clean          # clear local build/cache artifacts (.next, node_modules, __pycache__)
make local-kill-ports     # kill listeners on dev ports if a process is stuck
```

## Deployed stage

Reachable at https://stage.civictechjobs.org/. Built and deployed automatically on push to `main`. See [deployment-infra.md](deployment-infra.md) for the deployment shape.
