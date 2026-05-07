# ADR-0011: URL routing - kebab-case, plural, trailing slash

**Status:** Accepted
**Date:** 2026-05-02

## Context

URLs are a small but real shape decision. With a half-dozen endpoints already in place, several styles can coexist: snake_case, camelCase, kebab-case; singular vs plural for collections; with or without trailing slashes. Without a documented rule, each new endpoint becomes its own micro-decision and the surface drifts.

The codebase already had drift: `/api/skills/`, `/api/roles/`, `/api/projects/`, `/api/opportunities/` (single-word, plural, trailing slash) coexisting with `/api/communityOfPractice/` (camelCase, singular) and `/api/healthcheck` (no trailing slash). Locking in a rule before more endpoints land is cheaper than enforcing one after.

## Decision

**URLs are kebab-case, plural (for collections), and trailing-slashed.**

| Aspect | Rule | Example |
|--------|------|---------|
| Word casing | kebab-case (`-` between words) | `communities-of-practice`, `forgot-password` |
| Pluralization | Plural for collection endpoints; singular only for non-resource (health, fallbacks) | `/api/skills/`, `/api/healthcheck/` |
| Trailing slash | Always present | `/api/skills/`, not `/api/skills` |
| Path parameters | UUID via `<uuid:pk>`; named when multi-segment (`<uuid:project_id>`) | `/api/users/<uuid:pk>/` |

Non-resource endpoints (`healthcheck`, fallbacks) follow the same casing/slash rules but stay singular because they don't represent collections.

If a route legitimately needs to deviate (e.g. a webhook endpoint where a third party requires a specific shape), flag the deviation in the URL config docstring.

## Alternatives considered

- **snake_case** (`/api/communities_of_practice/`). Pythonic; matches identifier style elsewhere in the codebase. Discarded because URLs are not Python identifiers - they're protocol-level path segments. The HTTP/REST tradition is kebab; URLs are user-facing in browser history, logs, error messages, and API documentation. Underscores can also be lost when underlined as a hyperlink.

- **camelCase** (`/api/communitiesOfPractice/`). Discarded because it's the least common convention in REST URLs and conflicts with the Pythonic snake-case identifier style.

- **Mixed casing per-endpoint** (grandfather inconsistencies, only fix new endpoints). Discarded because the cost of renaming is low (no external callers; rename is atomic) and grandfathering inconsistencies invites future contributors to ask "why is this one different?" forever. Forward-only conventions are appropriate when the legacy is wide and rename costs are non-trivial; here the legacy is one URL.

- **No trailing slashes** (`/api/skills`). Some REST style guides prefer trailing-slash-free URLs. Discarded because Django's `APPEND_SLASH=True` (the default) issues a 301 from `/api/skills` to `/api/skills/`, so the trailing-slash form is what the framework wants.

- **Singular resource URLs** (`/api/skill/<id>/` instead of `/api/skills/<id>/`). Discarded as REST-non-idiomatic. The collection endpoint is plural; the detail endpoint is the same plural with a path parameter. Matches DRF router defaults.

- **Embed API version in URL** (`/api/v1/skills/`). Discarded as out of scope. Versioning is a separate decision; if added later, the convention can be decided then.

## Consequences

**Accepted:**

- Documentation has to mirror URL changes (the API endpoints table in the backend docs).

- If the project ever needs a route that legitimately wants a different style, the convention has an opinion to deviate from - flag the deviation in the URL config docstring.

**Won:**

- Reading `urls.py` cold answers "what's the URL shape" without thinking. Adding new routes follows the same template.

- Single-word URLs (`skills`, `roles`, `projects`, `opportunities`, `users`) are already compliant; the convention codifies what's mostly already true.

- The convention is teachable in one sentence to new contributors.

- Healthcheck's trailing slash means health probes don't trigger a 301 redirect - small win for log noise and probe latency.
