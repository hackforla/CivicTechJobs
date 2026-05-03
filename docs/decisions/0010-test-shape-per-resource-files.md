# ADR-0010: Per-resource test files with shared factory module

**Status:** Accepted
**Date:** 2026-05-02

## Context

The natural Django starting point is `app/tests/test_<something>.py` - typically one or two files containing `TestCase` classes that test the entire app's API surface. With one big `setUp` materializing every fixture every test class might need: a few users, one row per reference table, a sample of each domain object.

This works at small scale. But it doesn't scale. As more endpoints land, the file grows linearly and the single `setUp` does work most tests don't need. Adding a single-resource test creates fixtures for every other resource that the test never touches. Locating the test for a specific resource means scrolling.

The pattern PRs in this codebase have been about pushing structure down into the layer where it belongs - docstrings to the file/symbol they describe, view shape to the view itself, serializer shape to the serializer class. The same logic applies to tests: each resource's tests should live next to that resource's name, with the fixtures it actually needs.

## Decision

**Per-resource test files. Move shared fixture-construction helpers into `<app>/tests/common.py` as factory functions. Each test class extends `APITestCase` directly with its own `setUp` tailored to its tests.**

File layout:

```
ctj_api/tests/
├── __init__.py
├── common.py                       - factory helpers, no test classes
├── test_healthcheck.py             - HealthcheckTests
├── test_users.py                   - UserDetailTests
├── test_opportunities.py           - OpportunityTests
├── test_community_of_practice.py   - CommunityOfPracticeReadTests
├── test_roles.py                   - RoleReadTests
├── test_skills.py                  - SkillReadTests
├── test_projects.py                - ProjectReadTests
└── test_errors.py                  - ApiNotFoundEnvelopeTests
```

`common.py` exports factory functions: `make_pm_user`, `make_regular_user`, `make_cop`, `make_role`, `make_skill`, `make_project`, `make_opportunity`. Each returns a saved instance with sensible defaults that callers can override via kwargs. No state is shared across tests - each call creates a new instance.

Test class names follow `<Resource>Tests` (or `<Resource>ReadTests` if read-only is the entire scope). One test class per file; if a resource's tests grow large enough to warrant subdivision (read tests vs write tests), they split into multiple classes within the same file.

Test method names use `test_<subject>_<action>_<expectation>`:

- subject - who's making the request (`anonymous`, `regular_user`, `pm_user`, `authenticated_user`)
- action - what's being attempted (`list`, `create`, `view_own_record`)
- expectation - the result (`returns_200`, `cannot_create`, `gets_403`)

Examples: `test_anonymous_can_list_opportunities`, `test_regular_user_cannot_create_opportunity`, `test_authenticated_user_cannot_view_others_record`.

Each test method has a one-liner docstring describing the assertion in plain English (per [ADR-0007](0007-docstring-conventions.md)).

## Alternatives considered

- **Keep one big test file.** Less infrastructure churn; familiar to reviewers used to single-file Django test layouts. Discarded because the file's `setUp` already does work most of its tests don't need, and the trajectory is more endpoints, not fewer.

- **One file per *concern* (read tests, write tests, auth tests) rather than per resource.** Discarded because the dominant axis of "which test do I care about" is resource, not concern. Per-resource grouping aligns with how the rest of the codebase is organized.

- **Star-import factory helpers (`from <app>.tests.common import *`).** Discarded because explicit imports are easier to audit and don't surprise readers who don't know what `common` exposes. Two-line import blocks instead of one - fine.

- **A shared `APITestBase` class that does the universal setUp.** Discarded because there isn't a meaningful universal setup. Healthcheck needs nothing. Read-only catalog tests need a single row of their own resource. User-detail tests need users. A base class that provides "the maximum" forces unrelated tests to inherit unrelated setup; a base class that provides "the minimum" is empty.

- **pytest with fixtures instead of `APITestCase`.** Out of scope. The project uses Django's test runner; switching test frameworks is a separate decision.

- **Move tests outside `ctj_api/` to a top-level `tests/` package.** Django convention puts tests under the app. Cross-app tests (when they exist) can move up; for one-app projects, app-local tests are the right default.

## Consequences

**Accepted:**

- More files where there used to be one. The fixed cost is paid for the runtime savings (each test only constructs what it needs) and the locality benefit (`grep -l Skill ctj_api/tests/` lands you on `test_skills.py` directly).

- `common.py` is now a piece of infrastructure that drifts if not maintained. Mitigated by keeping it small (factory helpers only, no business logic) and by callers passing keyword overrides for anything they care about.

- Test discovery via `python manage.py test ctj_api` still works because Django's test loader walks the `tests/` package. The runner output is more verbose (more module paths) but more navigable.

**Won:**

- Locality: the test for a resource lives at `<app>/tests/test_<resource>.py`, parallel to the serializer at `<app>/serializers.py` (the `XxxReadSerializer` class) and the view at `<app>/views.py` (the FBV or viewset). Three layers, three locations, one resource name.

- Tailored fixtures: each test class only constructs the rows its tests touch. Test runtime drops because no test does setup it doesn't need.

- Test names that read like specifications: `test_pm_user_can_create_opportunity` describes the test's contract from the resource's POV; reviewing the file gives a coverage map without reading bodies.

- Future scaling: each new resource's tests land in `test_<resource>.py`. The pattern is uniform regardless of resource shape.

- Factory helpers eliminate a recurring class of bugs: ad-hoc fixture construction inside `setUp` drifts from the model definition; helpers in `common.py` are one place to update when the model changes.
