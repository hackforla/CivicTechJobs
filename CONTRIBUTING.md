# Contributing to CivicTechJobs

CivicTechJobs is a [Hack for LA](https://www.hackforla.org/) project. Before contributing, please read the Hack for LA [code of conduct](https://github.com/hackforla/codeofconduct).

The maintainer team reviews issues and pull requests at the regular checkpoint meetings; that's the cadence to expect for triage and review. You don't need to ping; open work gets picked up on that schedule. Synchronous walkthroughs handle context-heavy reviews better than async pinging.

## Setting up your environment

Follow the [installation instructions](docs/developer/installation.md) before starting work. The dev environment runs via `docker compose`.

## Filing issues

Open an issue from the [new issue screen](https://github.com/hackforla/CivicTechJobs/issues/new/choose) using the appropriate template (the [Blank Issue](https://github.com/hackforla/CivicTechJobs/issues/new?assignees=&labels=&template=blank-issue.md&title=) form is fine for most things).

A good issue describes the situation, the desired outcome, and enough context that someone else could pick it up cold. Add at least one **size**, **role**, and **feature** label; leave labeling open if nothing fits and a maintainer will fill it in during triage. Labels are for project-board visibility and to help contributors self-route to work that matches them.

New issues land on the [Hack for LA project board](https://github.com/orgs/hackforla/projects/37) and get prioritized there.

Filing the issue first (before writing code) lets feedback shape scope before implementation effort sinks; design questions surface early when changes are still cheap.

## Submitting a pull request

1. Find an issue in the **Prioritized Backlog** column on the [project board](https://github.com/orgs/hackforla/projects/37). The **size** label is the rough time commitment (small ≈ a week, large ≈ two to three weeks); the **role** label says where the work lives.
2. Comment on the issue to claim it; assign yourself.
3. Fork the repo, then branch off `develop` (not `main`). See [git-branch-structure.md](docs/developer/git-branch-structure.md).
4. Make your changes.
5. Open a PR against `develop` from your fork, following the [PR template](https://github.com/hackforla/CivicTechJobs/blob/main/.github/pull_request_template.md).
6. Confirm the automated checks pass (bottom of the PR view).

Frontend styling uses **CSS Modules**: co-locate a `Component.module.css` next to each component's `.tsx` file. No Tailwind, no styled-components, no CSS-in-JS runtime. See the [design system guide](docs/developer/design-system.md) for the full conventions.

### Type annotations (backend)

The Python codebase has `mypy` running in **gradual mode** — `disallow_untyped_defs` is `false`, so missing annotations don't fail CI. The intent is to ratchet stricter over time, not to demand annotations on every change. Concretely:

- **New code**: add type annotations to function signatures (parameters and return types). Inside function bodies, only annotate where the type is non-obvious or the inference is wrong.
- **Existing code you touch**: if you're already editing a function for another reason, adding annotations is welcome but not required.
- **Don't annotate just to silence mypy.** If a type is genuinely ambiguous (`Any` is fine, `# type: ignore[code]` with the specific code is fine when you know why), say so explicitly rather than papering over it.
- **Django models**: `django-stubs` and `djangorestframework-stubs` are installed; mypy can check ORM call sites without per-call annotation.
- **Don't annotate Django model fields.** `name = models.CharField(...)` should stay un-annotated. `django-stubs` reads the field declaration (including `null=True`, `choices=...`, etc.) and synthesizes the correct instance-attribute type via mypy's plugin protocol. Manual annotations duplicate that work and drift from the field-level config (e.g. flipping `null=True` without updating an `Optional[str]` annotation). Annotate methods, helper functions, and custom managers as normal.

The goal is that contributors can land work without fighting the type checker, while the typed surface grows incrementally where it pays for itself.

### Docstrings (backend)

Backend code follows a labeled-section docstring convention. The shape is per-file-kind: heavy labeled templates for models and views (where there's substantive policy to document), lighter prose for serializers and config files. See [docs/developer/backend-docstring-style.md](docs/developer/backend-docstring-style.md) for the full templates, vocabulary, and rationale.

### Docstrings (frontend)

Frontend code uses JSDoc with a different shape from the backend: **heavy on the module level, light at the per-export level**. The file header is the primary place for context (what the file does, why, design decisions); per-export comments are one-liners unless behavior is non-obvious. See [docs/developer/frontend-docstring-style.md](docs/developer/frontend-docstring-style.md) for the per-kind templates and examples.

If an issue takes much longer than its size suggested, post an update on the issue with an honest read on whether you can finish; releasing it back to the backlog is fine.

### Frontend vs backend issues

Most work falls into two broad categories. Under the Next.js + Django stack, the boundary is fuzzier than it used to be (server components and server actions sit on the frontend side but talk to the backend API directly), so the labels are a hint rather than a hard divide.

- **Frontend**: work in `frontend/` (Next.js app, components, server actions). Usually paired with a Figma reference; visual or interaction-heavy.
- **Backend**: work in `backend/` (Django models, API endpoints, permissions, matching). Usually involves data flow, schema, or auth concerns and benefits from upfront discussion in the issue.

## Commit messages

Each commit title follows a `<type>: <description>` shape, with the same five types as [branch prefixes](docs/developer/git-branch-structure.md#naming):

- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for dependency bumps, tooling, CI, build, formatting
- `docs:` for documentation-only changes
- `refactor:` for restructuring without behavior change

Optional scope after the type when it adds clarity: `feat(auth): wire login form to backend`.

The description is in imperative mood ("Convert", "Bump", "Add"), sentence case, no trailing period.

The body (prose after a blank line below the title) keeps the existing convention: explain *why* the change was made, not *what* (the diff already shows the what). For substantial commits, a body that walks the reader through the reasoning is welcome.

The convention applies to new commits. Existing history is not rewritten.

## Code review

PRs are reviewed against three criteria:

- **Correctness.** Does the change resolve the stated issue? Are there extraneous changes?
- **Soundness.** Does it break existing functionality? Are responsive / accessibility behaviors preserved?
- **Maintainability.** Is the code reasonable to read and extend? Are abstractions appropriate?

A PR can merge with one approving review. For larger or higher-risk changes, request additional review or raise the PR at a checkpoint meeting. **Don't merge without review.** Even small fixes benefit from a second pair of eyes, and accidental direct merges to `develop` or `main` are painful to undo; with a small maintainer team, one bad merge is high-impact.

See [GitHub's documentation on reviewing pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) for review mechanics.

## Newcomer resources

First time contributing to open source? This [video series](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github) is a useful starter.

## Additional resources

[Resources for developers](docs/resources.md#developer-docs-in-this-repo).
