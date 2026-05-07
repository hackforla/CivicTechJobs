# ADR-0001: Tooling and dependency baseline

**Status:** Accepted
**Date:** 2026-05-02

## Context

The CTJ rewrite re-evaluated the project's tooling stack from scratch. Pre-rewrite, the codebase used a Python tooling chain centered on black + flake8 + isort + pylint, a frontend chain centered on Jest + Tailwind + SCSS + PostCSS, and a `.pre-commit-config.yaml` that had drifted into stale-territory (pinned to Python 3.9, referenced paths that no longer exist post-rewrite).

This ADR consolidates the version pins and tool choices made across the modernization PRs. Each sub-decision has its own short rationale; the deeper architectural choices (test-framework swap, styling-system swap, container shape) live in their own ADRs.

## Decisions

### Backend lint: ruff replaces black + flake8 + isort

`ruff check` and `ruff format` cover formatting, import sorting, lint-rule coverage equivalent to flake8, and a fast Rust-based runner. The combined tool replaces three separate tools with overlapping responsibilities; `pyproject.toml` carries one config block instead of three.

Pylint (which the legacy config tied to `config.settings`, the old project's settings module) is dropped. Ruff's lint coverage is sufficient for a small volunteer codebase; pylint's deeper analysis is not load-bearing for the kinds of bugs CTJ surfaces.

### Backend types: mypy in gradual mode + django-stubs + drf-stubs

`mypy --strict` is too aggressive for a partially-typed codebase (every untyped function would need annotation before mypy passes). Gradual mode (`--check-untyped-defs` off, `--ignore-missing-imports` on for un-stubbed deps) lets typed code be checked while leaving older code as-is until contributors get to it.

`django-stubs` and `djangorestframework-stubs` provide model-field synthesis (model attribute types come from field declarations via mypy's plugin protocol) and DRF type stubs.

### Backend security: bandit

`bandit` runs as part of the lint pipeline. Catches the obvious classes of security issue (hardcoded secrets, weak crypto choices, shell injection patterns). Cheap to run; finds enough to earn its place.

### Backend Python: 3.13

Latest stable major. Type-system improvements over 3.12 (PEP 695 generic syntax, narrower generics) make typed code cleaner. Aligned with Django 6's targeted Python versions.

### Backend framework: Django 6.0 (skip 5.2 LTS)

Django 6.0 is the latest major; 5.2 is the most recent LTS. The choice is between LTS-stability (5.2) and feature-currency (6.0).

LTS is appealing for projects with long maintenance horizons and limited capacity to upgrade. CTJ's situation is the opposite: the rewrite is the upgrade, and there will be no separate "upgrade Django" PR for a while. Starting on 6.0 means the project is on a current major right out of the rewrite gate, and the next upgrade conversation is years away. The async ORM improvements and async-view refinements in 6.0 are also nice-to-haves for the eventual matching engine.

If a feature CTJ needs lands first in 5.x's patch series and not in 6.0, the choice could be revisited. Today there's no such pull.

### Database driver: psycopg3 (replaces psycopg2)

psycopg3 is the actively-maintained successor; psycopg2 is in deep maintenance mode only. psycopg3's typing is better, async support is better, and the connection-pool story is cleaner. The migration cost is low - most psycopg2 calls work unchanged on psycopg3 with the binary build (`psycopg[binary]`).

### Database: PostgreSQL 18

Latest stable Postgres. No version-specific features are load-bearing yet; choice is "current at the time of the rewrite" rather than "we need feature X."

### Frontend Node: 24

Latest LTS-track. ESM support is mature; Vite, Vitest, and Next.js 16 all align with Node 24+.

### Frontend framework: Next.js 16 (with React 19, TypeScript 6)

The rewrite assessment originally targeted Next.js 15; by the time the actual port landed, 16 had GA'd with React 19 GA support. The migration cost is paid on the rewrite branch (not on a future maintenance branch), and `eslint-config-next`, the React 19 type definitions, and the Turbo CLI all align in 16's direction. App Router is the architecture either way.

### Frontend lint: ESLint 9 (defer 10), Stylelint 17, Knip 6, Prettier 3.8

- **ESLint 9 pin (defer 10)**: ESLint 10 dropped support for some plugin shapes that `eslint-plugin-jsx-a11y` and `eslint-plugin-react` haven't yet shipped 10-compatible peers for. Pin to 9 until the plugin ecosystem catches up; revisit when peers ship.
- **Stylelint 17**: standard CSS lint tier; configured with `stylelint-config-standard` plus camelCase patterns to match CSS Modules' identifier conventions.
- **Knip 6 (fail-on-find)**: dead-code/unused-export finder. Configured to fail CI on any finding rather than warning - dead code is cheap to delete, and "warn but don't fail" tends to drift to "warn forever."
- **Prettier 3.8**: standard formatter; runs via pre-commit and lint workflow.

### Frontend test runner: Vitest 3 (defer 4)

The framework swap (Vitest replaces Jest) is documented in [ADR-0005](0005-vitest-replaces-jest.md). The version pin is here:

Vitest 4 pulls `babel-plugin-react-compiler` as a peer dependency of `@vitejs/plugin-react`. The React Compiler isn't enabled in this codebase yet (the eslint hooks-rules for the compiler are downgraded to warnings; see below). Pinning to vitest 3 avoids the peer pull until the React Compiler work is actually scoped.

### React Compiler hooks rules: downgraded from `error` to `warn`

`react-hooks` 7.x adds rules that surface React Compiler concerns: `set-state-in-effect`, `refs`, `static-components`. At the modernization tip, these rules surface 28 warnings across the existing codebase. Fixing them all at once would mean a sweeping refactor that conflates "modernize tooling" with "rewrite hooks logic."

The rules are kept enabled but downgraded to `warn`, so contributors see them on every PR and a follow-up cleanup can address them in batches once the pattern PRs land.

### Pre-commit: keep the pre-commit framework, rewrite the config

The pre-rewrite `.pre-commit-config.yaml` was unrunnable (Python 3.9 pin, references to nonexistent paths, deprecated version of `mirrors-prettier`).

Two paths: delete the config and rely entirely on CI, or rewrite it against the new tools. Delete-and-rely-on-CI is simpler but has higher feedback latency (push → workflow run → status). Rewriting keeps fast local feedback at commit time; CI is the authoritative gate. Both reference the same pinned tool versions, so drift between local and CI is bounded.

The new config covers file-shape hygiene (trailing whitespace, EOF fixer, merge-conflict markers, YAML/TOML/JSON syntax), backend lint (`ruff-pre-commit`), frontend formatting (`mirrors-prettier`), and frontend lint (local hooks shelling out to `npx eslint` + `npx stylelint` so the project's pinned versions are used, not a frozen mirror's).

## Why these choices, in aggregate

The pattern across all of these is "modernize, but pin versions, defer the in-flight majors." Specifically:

- Pinned versions: ESLint 9 (not 10), Vitest 3 (not 4) - both deferred because their plugin ecosystem isn't ready.
- Picked currents: Django 6 (not 5.2 LTS), Next.js 16 (not 15), Python 3.13, Node 24, PostgreSQL 18, psycopg3 - chosen because the rewrite is the upgrade window.
- Single-tool consolidations: ruff replaces three Python tools; CSS Modules replaces the Tailwind+SCSS+PostCSS chain (see [ADR-0004](0004-css-modules-without-preprocessor.md)); Vitest replaces Jest.

The bias is toward fewer tools doing more, currents over LTS where the upgrade horizon is short, and explicit deferrals when the ecosystem hasn't caught up.

## Consequences

**Accepted:**

- Two version pins (ESLint 9, Vitest 3) carry follow-up watch tasks: revisit when their respective plugin ecosystems ship 10/4-compatible peers.
- The 28 react-hooks warnings are visible noise on every PR until a cleanup PR addresses them. Documented; not blocking.
- New contributors install pre-commit (`pip install pre-commit && pre-commit install`); documented in the installation guide.
- The Stage 1 → Stage 2 migration (PeopleDepot integration; see [ADR-0002](0002-phase-1-skip-peopledepot.md)) is a separate concern from this baseline.

**Won:**

- Single source of truth for each tool's version: pinned in `pyproject.toml` (backend) or `package.json` (frontend), referenced by both pre-commit hooks and the CI lint workflow.
- Lint runs are fast (ruff's Rust runner; Vitest's parallel workers).
- The rewrite ships on currents; the next "modernize" PR is years away.
- Configuration is concentrated: `pyproject.toml` for backend, `package.json` + `eslint.config.mjs` + `stylelint.config.mjs` + `vitest.config.mts` + `knip.json` for frontend. No scattered `.<tool>rc` files.
