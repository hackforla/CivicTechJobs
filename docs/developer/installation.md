# Installation Instructions

Steps for setting up a local development environment.

If you get stuck, ask in the `#civictechjobs-dev` Slack channel or email <Civictechjobs@hackforla.org>. Pair-programming with an existing contributor is also an option.

## Required downloads

- **Git**: [Windows](https://git-scm.com/download/win) / [macOS](https://git-scm.com/download/mac) / [Linux](https://git-scm.com/download/linux)
- **Docker Desktop** (or Docker Engine on Linux): [Windows](https://docs.docker.com/desktop/windows/install/) / [macOS](https://docs.docker.com/desktop/mac/install/) / [Linux](https://docs.docker.com/engine/install/)
- **Node.js 24 LTS** + **npm**: needed for the pre-commit JS hooks (ESLint / Stylelint / Prettier) that run on the host.
- **Python 3.13** + **pre-commit**: needed for the pre-commit framework itself plus its Python hooks (`ruff`).

For backend development outside Docker (rarely needed), also install **Poetry**.

### Recommended editor setup

- **ESLint VS Code extension** ([marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)): inline lint errors as you type.
- **Stylelint VS Code extension** ([marketplace](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)): inline CSS Modules lint errors.
- **Prettier VS Code extension** ([marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)): format-on-save; pairs with the pre-commit Prettier hook so your code is auto-formatted before commit. Use the equivalents for your editor of choice.

<details>
<summary>Note for macOS</summary>
The macOS Git installer pulls in Homebrew, which can occupy several GB of disk space. If that's a problem, install <a href="https://www.datacamp.com/community/tutorials/homebrew-install-use">a minimal Homebrew via Xcode Command Line Tools</a>. Be aware Docker Desktop and the project's container images will also use a few GB; plan disk space accordingly.
</details>

## Repository setup

1. [Fork the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) to your own GitHub account.
2. [Clone your fork locally](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository).
3. [Add the upstream remote](https://docs.github.com/en/get-started/quickstart/fork-a-repo#configuring-git-to-sync-your-fork-with-the-original-repository) so you can pull updates from `hackforla/CivicTechJobs`.

Forking (instead of branching directly on `hackforla/CivicTechJobs`) is the standard HfLA contribution model; it keeps the canonical repo clean of in-progress branches and lets you experiment freely on your own copy.

Develop branches off `develop`, not `main`:

```sh
cd CivicTechJobs
git remote add upstream https://github.com/hackforla/CivicTechJobs.git
git fetch upstream develop
git checkout -b develop upstream/develop
```

`main` is what's deployed; `develop` is the integration branch where work merges before a release. See [git-branch-structure.md](git-branch-structure.md) for the branching model.

## Running the app locally

1. From the repo root, copy the dev env template:

    ```sh
    cp dev/dev.env.example dev/dev.env
    ```

2. Edit `dev/dev.env` and fill in the placeholders (database name, secret key, etc.). The lines marked `<...>` need real values; the rest can stay as defaults.

3. Start the full stack:

    ```sh
    make docker-up
    ```

4. Open the app:
    - **Frontend**: http://localhost:3000
    - **Backend (Django admin + API)**: http://localhost:8000

`make docker-up` builds the images and brings the stack up detached. For hot reload (file edits in `frontend/` or `backend/` syncing into the running containers), run `make docker-watch` instead. See `make help` or [quickstart-guide.md](quickstart-guide.md) for the full command set. Docker for local dev keeps the environment consistent across contributors (same Postgres version, same Node and Python versions inside the containers) without anyone needing a local Postgres install.

## dev.env values

| Variable | What to put |
|----------|-------------|
| `POSTGRES_DB` | Any name (`postgres` works) |
| `POSTGRES_USER` | Any username |
| `POSTGRES_PASSWORD` | Any password |
| `SECRET_KEY` | Random string of length 50; `python -c "import secrets; print(secrets.token_urlsafe(50))"` works |
| `SQL_DATABASE` | Same as `POSTGRES_DB` |
| `SQL_USER` | Same as `POSTGRES_USER` |
| `SQL_PASSWORD` | Same as `POSTGRES_PASSWORD` |

## Local-dev auth

Stage 1 local dev runs Django's default session authentication; no Cognito, no PeopleDepot, no auth env vars needed beyond what's already in `dev.env.example`. Regular users sign up through the SPA at http://localhost:3000/signup; the form hits `POST /api/auth/signup/` and auto-logs-in on success.

Bootstrap an admin / PM account with:

```sh
docker compose run django python manage.py createsuperuser
```

That account can sign into Django admin at http://localhost:8000/admin/ and is what you'll use to exercise PM-gated flows. Subsequent admin and PM elevations happen through Django admin's UI (toggle the `isProjectManager` flag on the user record).

### Seed user (browse-surface fixtures)

`make db-seed` creates a deterministic PM user and three open opportunities so the `/opportunities` surface has something to render without building the dependency graph by hand. The command is idempotent (re-running is a no-op except for refreshing the opportunity fields), and the data is non-production - the seed lives in [`backend/ctj_api/management/commands/seed_dev.py`](../../backend/ctj_api/management/commands/seed_dev.py) and is never invoked by views or tests.

| Field | Value |
|-------|-------|
| Email / username | `dev@example.com` |
| Password | `password123!` |
| `isProjectManager` | `true` |
| `is_staff` / `is_superuser` | `true` (signs into Django admin at `/admin/`) |

Sign in at http://localhost:3000/login. The seeded opportunities cover a mix of work environments (remote, hybrid) and experience levels (junior, mid-level, senior) so the filter UI on `/opportunities` is exerciseable on a fresh DB.

Stage 2 will introduce Cognito JWT verification and PeopleDepot client mocks; that work lands when the upstream PeopleDepot deployment posture stabilizes. See [backend.md](backend.md#auth) for the Stage 2 design.

## Additional Resources

- [Git documentation](https://git-scm.com/doc)
- [Docker documentation](https://docs.docker.com/)
- [Quickstart Guide](quickstart-guide.md)
- [Backend Architecture](backend.md)
- [DevOps Architecture](devops.md)
