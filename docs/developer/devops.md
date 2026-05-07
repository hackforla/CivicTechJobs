# DevOps Architecture

**Stack:** Docker + Docker Compose, Daphne (Django's reference ASGI server), Whitenoise (Django static files), Node.js (Next.js runtime), PostgreSQL 16.

DevOps files configure the three environments developers interact with - local dev, local stage approximation, and deployed stage. The deployed-stage AWS infrastructure itself is documented separately in [deployment-infra.md](deployment-infra.md).

**This doc describes the rewrite's target structure.** The current `dev/`, `stage/`, and `frontend/` trees still carry Vite-era and combined-Dockerfile leftovers; those land into the target shape as the frontend rewrite work merges.

## Project structure (DevOps-relevant files)

```
.
├── .dockerignore
├── .github/
│   └── workflows/             # CI/CD (see deployment-infra.md)
├── dev/
│   ├── dev.env.example        # Local-dev env-var template
│   ├── django.dockerfile      # Django dev container
│   └── next.dockerfile        # Next.js dev container
├── stage/
│   ├── django.dockerfile      # Django stage container
│   ├── next.dockerfile        # Next.js stage container
│   └── stage.env.example      # Local-stage env-var template
├── docker-compose.yml         # Local dev environment
└── docker-compose.stage.yml   # Local stage approximation
```

There is no linter container - lint runs on the host (see [Linting](#linting) below for the rationale).

## Local development

Defined by `docker-compose.yml` + the `dev/` directory. Three services:

- **`pgdb`** - PostgreSQL 16, the dev database. Data persists across `docker compose up`/`down` via a named volume; `docker compose down -v` is the explicit reset.
- **`django`** - Django app from `backend/`, built via `dev/django.dockerfile`. Uses `python manage.py runserver` for auto-reload + Django's debug pages. Migrations run on start, then it serves on `localhost:8000`.
- **`next`** - Next.js dev server from `frontend/`, built via `dev/next.dockerfile`. Serves on `localhost:3000` with hot reload.

Both `django` and `next` use Compose's `develop.watch` to sync source changes into the running containers without rebuilds. (Watch syncs files into the live container; restarts/rebuilds happen only when manifest files like `pyproject.toml` or `package.json` change.)

Bring everything up:

```sh
docker compose up --watch
```

`dev.env` (copied from `dev/dev.env.example`) supplies environment variables to each service. **One shared env file across services** rather than per-service files - avoids drift, simpler for a small team, and CTJ doesn't have secrets in dev that need scoping. Service-specific variables are namespaced by prefix (`POSTGRES_*`, `SQL_*`, `NEXT_PUBLIC_*`, etc.).

### Why `runserver` in dev, Daphne in stage

Django ships two ways to run the app: `manage.py runserver` (the dev server) and a real ASGI/WSGI server like Daphne. Dev uses `runserver` for the convenience features - auto-reload on file change, prettified tracebacks, `DEBUG=True` debug pages. Stage uses Daphne to match the production-shape behavior (no auto-reload, structured logging, ASGI request handling). Never run `runserver` in production - it's explicitly single-process and not hardened.

## Local staging approximation

`docker-compose.stage.yml` runs a stage-shaped environment locally - production-like builds, no hot reload. Used to verify the production build before pushing. Mirrors the deployed-stage three-container shape (see [deployment-infra.md](deployment-infra.md)) so behavior is comparable.

Three services:

- **`pgdb`** - Postgres 16 with stage env vars.
- **`django`** - Django stage container, built from `stage/django.dockerfile` (Poetry install, `collectstatic`, Daphne on port 8000).
- **`next`** - Next.js stage container, built from `stage/next.dockerfile` (`npm run build`, Next.js production server on port 3000). Proxies `/api/*` and `/admin/*` to the `django` service. (Local-only convenience - deployed stage uses ALB path-based routing instead. See [deployment-infra.md](deployment-infra.md#topology).)

```sh
docker compose -f docker-compose.stage.yml up
```

`stage.env` (copied from `stage/stage.env.example`) supplies the env vars. **The local stage env is *not* the deployed stage env** - deployed values come from Terraform. See [deployment-infra.md](deployment-infra.md).

### About Daphne

Daphne is Django's reference ASGI (Asynchronous Server Gateway Interface) server, built by the Django team alongside Channels (the websocket framework). CTJ doesn't currently use Channels or async views - Daphne is here as a defensive ASGI choice, so if websocket / async functionality enters scope later, the server already supports it. Alternatives like Uvicorn are interchangeable; Daphne stays for consistency with Django's reference stack.

## Deployed staging

Lives at https://stage.civictechjobs.org/, built and deployed via [.github/workflows/deploy-stage.yml](https://github.com/hackforla/CivicTechJobs/blob/main/.github/workflows/deploy-stage.yml) on each push to `main`. Three containers in one ECS task; two ECR images (Next.js + Django) plus the upstream Postgres image. Same shape as the local stage but with infrastructure values supplied by the Incubator Terraform module. Full details in [deployment-infra.md](deployment-infra.md).

## Linting

CTJ runs two layers of lint enforcement:

- **Pre-commit hooks** (fast local feedback at `git commit` time)
- **CI workflow** ([`.github/workflows/lint.yml`](https://github.com/hackforla/CivicTechJobs/blob/main/.github/workflows/lint.yml)) — the authoritative gate; PRs cannot merge while it's red.

Both run the same tools so an issue caught in CI is also catchable locally.

### Tools

| Surface | Tool | What it does |
|---------|------|--------------|
| Backend | `ruff check` / `ruff format` | Python linter + formatter + import sorter (replaces `black + flake8 + isort`) |
| Backend | `mypy` | Type checker (gradual mode; see CONTRIBUTING.md) |
| Backend | `bandit` | Security scanner |
| Frontend | `eslint` | TS/TSX linter |
| Frontend | `stylelint` | CSS Modules linter |
| Frontend | `knip` | Unused files / exports / dependencies |
| Frontend | `tsc --noEmit` | Type checker |
| Frontend | `prettier` | Formatter (TS / TSX / JSON / CSS) |

Backend tool configs all live in [`backend/pyproject.toml`](https://github.com/hackforla/CivicTechJobs/blob/main/backend/pyproject.toml). Frontend tool configs are in [`frontend/eslint.config.mjs`](https://github.com/hackforla/CivicTechJobs/blob/main/frontend/eslint.config.mjs), [`frontend/stylelint.config.mjs`](https://github.com/hackforla/CivicTechJobs/blob/main/frontend/stylelint.config.mjs), and [`frontend/knip.json`](https://github.com/hackforla/CivicTechJobs/blob/main/frontend/knip.json).

### Pre-commit setup (one-time, on the host)

```sh
pip install pre-commit
pre-commit install
```

After that, every `git commit` runs the configured hooks against staged files. Configuration is in [`.pre-commit-config.yaml`](https://github.com/hackforla/CivicTechJobs/blob/main/.pre-commit-config.yaml).

**Why on the host rather than in a container:** pre-commit already creates an isolated env per hook (per-hook venv for Python tools, per-hook Node env for JS tools), so a container would be a second layer of isolation that doesn't add anything. Host pre-commit also avoids the per-commit Docker startup tax — that latency compounds badly across many commits.

See [backend.md → Local dev - lint](backend.md#local-dev---lint) and [frontend-lint-guide.md](frontend-lint-guide.md) for ecosystem-specific commands and rule details.

## Useful Docker commands

```sh
docker compose down -v
```

Tear down containers *and* named volumes - the cleanest reset when the database is in a weird state.

```sh
docker compose run <service> <command>
```

Run a one-shot command in a service container without keeping it up. Common uses:

- `docker compose run django python manage.py makemigrations`
- `docker compose run django python manage.py migrate`
- `docker compose run django python manage.py createsuperuser`
- `docker compose run next npm install <package>`

```sh
docker exec -it <container> sh
```

Open a shell inside a running container for debugging.

```sh
docker compose build --progress=plain
```

Verbose build output - useful when a build step is failing opaquely.

## Resources

- [Docker Compose docs](https://docs.docker.com/compose/)
- [Daphne ASGI server](https://github.com/django/daphne)
- [Whitenoise](https://whitenoise.readthedocs.io/)
- [Next.js Docker docs](https://nextjs.org/docs/app/building-your-application/deploying#docker-image)
