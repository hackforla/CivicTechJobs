# ADR-0014: Make as the canonical task runner

**Status:** Accepted
**Date:** 2026-05-03

## Context

Common dev commands (compose up, migrate, lint, test, shell into a container) appeared as raw `docker compose ...` invocations sprinkled across `README.md`, `docs/developer/quickstart-guide.md`, `docs/developer/devops.md`, `docs/developer/installation.md`, and CI snippets. The same command would land in different forms in different places, drift independently, and become a discovery problem for new contributors ("which page has the right invocation?").

The pre-rewrite `Makefile` existed but was broken: it referenced a removed `linter` compose service, declared a dead `test-frontend` in `.PHONY` with no body, ran `python manage.py test server.tests` against an `ctj_api` app, and named a `db-shell` target that actually ran `manage.py shell` (Django's Python REPL), not psql. Reaching for it surfaced more friction than running raw `docker compose` commands directly, so contributors stopped using it.

Locking in the right canonical surface now is cheap (the Makefile is a single file, and the lint, test, and DB commands are stable post-modernization). Done later, the wrong invocations leak into more docs and CI snippets.

## Decision

**The `Makefile` at the repo root is the canonical surface for common dev commands. Targets are namespaced by surface; destructive operations gate on a confirmation prompt; `make lint` delegates to the pre-commit framework rather than reimplementing it; `help` is the default goal.**

Concrete rules:

- **Namespace prefixes** signal which surface a target operates on:
  - `local-*` - host processes (Poetry-run Django, `npm run dev`, host-side migrations).
  - `docker-*` - stack-level operations (`up`, `down`, `logs`, `watch`).
  - `db-*` - database-scoped operations (`up`, `migrate`, `reset`, `reset-hard`, `grant-test-db-perms`).
  - `docker-shell-*` - shell access into a running container.
  - `lint`, `install-hooks` - linting layer (un-namespaced; one of each).

- **Destructive operations require a typed `yes` confirmation** before execution. Pattern:
  ```make
  db-reset:
  	@echo "This will truncate all app data... Type 'yes' to confirm:"
  	@read ans && [ "$$ans" = "yes" ] || (echo "Aborted."; exit 1)
  	$(DEV_COMPOSE) exec $(BACKEND_SERVICE) python manage.py flush --noinput
  ```
  Currently applied to `db-reset` (truncate data, keep schema) and `db-reset-hard` (drop volume, recreate).

- **`make lint` shells out to `pre-commit run --all-files`** rather than enumerating ruff, mypy, bandit, eslint, stylelint, knip, tsc, prettier individually. This means: one source of truth for the lint suite (the `.pre-commit-config.yaml` + the matching `lint.yml` CI workflow), and `make lint` is what runs in CI. No drift between local and CI lint.

- **`help` is `.DEFAULT_GOAL`**: bare `make` prints a categorized command reference. Targets are documented in the `help` block and only there, so the README and quickstart can link to `make help` rather than re-listing every target.

- **Variables for compose invocation, services, and ports** at the top of the file (`DEV_COMPOSE`, `DB_SERVICE`, `BACKEND_SERVICE`, `FRONTEND_SERVICE`, `LOCAL_KILL_PORTS`). Service names are the only things that change when the compose file evolves; the rest of the file references the variables.

## Alternatives considered

- **`just` (or another modern task runner).** Better syntax, no tab-indentation traps, named arguments. Discarded because Make is universally available on dev machines (macOS, Linux distros, WSL) without a separate install, and `just`'s ergonomic wins are small relative to the friction of "install this tool first."

- **Shell scripts collection (`scripts/dev-up.sh`, `scripts/db-reset.sh`, etc.).** No `help` convention out of the box; discoverability requires reading the directory or the README. Discarded because Make's `help` target solves discoverability for free, and the same per-task confirmations and dependency chains work better as Make targets than as ad-hoc scripts.

- **`npm` scripts only (in `frontend/package.json`).** Works for frontend-only projects but CTJ has a backend (Poetry) and a database (Docker compose). Discarded because the canonical surface needs to span all three, and putting Django commands behind `npm run` would be confusing.

- **Document raw `docker compose ...` commands in the README and docs (current pre-rewrite state).** Discarded because the same command landed in different forms in different docs (see Context); each doc became a maintenance liability.

- **Have `make lint` run ruff/mypy/bandit/eslint/stylelint/knip/tsc/prettier individually.** Gives finer Make control over ordering and output formatting. Discarded because pre-commit already orchestrates the suite, runs the same way in CI, and putting the orchestration in Make duplicates it. If we want a "fast subset" later (e.g. ruff check + eslint, no type checking), that's an additive `make lint-fast` target.

- **Skip the host-process targets (`local-run-frontend`, `local-run-backend`); make Docker the only path.** Discarded because rapid iteration on host (no rebuild, no compose round-trip) is meaningfully faster, and the `local-check-db` dependency keeps the failure mode clean ("DB not reachable on :5432. Run 'make db-up' first.").

## Consequences

**Accepted:**

- Make is a soft dependency on dev machines. Universally available, but not pre-installed in minimal CI containers (we don't run `make` in CI today; CI invokes the underlying tools directly via `lint.yml`).

- Targets must stay in sync as `docker-compose.yml` or `pyproject.toml` evolves. Mitigated by the variables-at-the-top pattern and PR review.

- Make's tab-indentation rule is unforgiving. Editor config (`.editorconfig` or VS Code's per-file indent settings) needed to avoid silent breakage.

- The `help` block is hand-maintained. New targets must be added in two places (the recipe and the help echo). Mitigated by PR review; the alternative (auto-generating `help` from `##` comments) is more machinery than the small target list justifies.

**Won:**

- One canonical surface. README and docs link to `make help` rather than re-listing commands; commands stop drifting.

- New contributors run `make help` and see the full command vocabulary in one screen.

- Destructive operations (`db-reset`, `db-reset-hard`) require an explicit `yes`, eliminating a class of "I meant to type the *other* thing" mistakes.

- `make lint` and CI run the same lint suite; "passes locally, fails in CI" stops being a pre-commit drift question.
