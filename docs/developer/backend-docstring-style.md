# Backend Docstring Style

CTJ backend code follows a labeled-section docstring convention. The goal is scannability for less-experienced contributors: every artifact has a predictable shape, with the "what does this thing do" and "what rules govern it" called out as discrete sections rather than buried in prose.

This guide covers what to put in docstrings for each kind of file in the backend. The frontend has its own conventions (via JSDoc in `*.tsx` files) and is out of scope here.

## Common rules

| Rule | Convention |
|------|-----------|
| Code references | Single backticks (`` `CustomUser` ``, not RST double-backticks) |
| Line length | 88 chars max (matches ruff format default; ruff enforces) |
| Field-level documentation | Use Django's `help_text=` on the field, not an inline comment or docstring |
| Bullet style | `-` (dashes), not `*` |
| Method one-liners | Always use them, even on `__str__` or other obvious methods |
| Bug flags | Prose paragraph in the relevant docstring, marked clearly so future readers see it (no special syntax required) |

Each labeled section uses a bulleted list, even when a section has only one item. Single-bullet sections are the rule, not an inconvenience to avoid; consistent shape > minimum keystrokes.

## When to add a module docstring

Add one when the file contains more than one entity (class, top-level function), or when there's file-level context that doesn't fit on any single class. Skip the module docstring when the file has exactly one entity and the class docstring covers it.

Module docstrings are typically prose (no labeled sections), 1-3 short paragraphs.

## Per-kind templates

The backend has five docstring templates, one per kind of file. Each section below shows the template, gives an example from the codebase, and notes the rationale for the shape.

### Models — heavy template

Models are the project's policy hubs (lifecycle, invariants, relationships). They get the heaviest docstrings.

```python
class Foo(models.Model):
    """
    Summary:
    - <one-sentence purpose>.

    Business workflow:
    - <bullets describing what this represents in the domain>.
    - <lifecycle, where it fits in user-facing flows>.

    Current policy:
    - <bullets describing present-tense rules and invariants>.
    - <non-default field choices and why>.

    Lifecycle control:
    - `<tag>` (<short qualifier>).

    Visibility:
    - `<tag>` via `<endpoint>`.
    """
```

See [`backend/ctj_api/models.py`](https://github.com/hackforla/CivicTechJobs/blob/main/backend/ctj_api/models.py) for working examples (`CommunityOfPractice`, `CustomUser`, `Opportunity`).

**Why labeled sections, not prose:** the lifecycle/visibility tags are scannable across the whole codebase via `grep`. A reader auditing access posture can grep for `Visibility: \`auth-required\`` and see every model that requires login.

### Views — heavy template (different sections)

Views describe HTTP endpoints. Every view has a URL, methods, and an auth posture by definition, so those get explicit labels.

```python
class FooViewSet(viewsets.ModelViewSet):
    """
    Summary:
    - <what this endpoint exposes>.

    Flow:
    - <how a request is processed; numbered if there's a sequence>.

    URL:
    - METHOD /path/                  (single-method)
    - /path/                          (multi-method)

    Methods:                          (multi-method only)
    - GET                  list ...
    - POST                 create ...

    Auth:
    - <permission classes, or "Public">.

    Errors:
    - <code>: <when this happens>.
    - (none)                          (when no specific errors apply)
    """
```

See [`backend/ctj_api/views.py`](https://github.com/hackforla/CivicTechJobs/blob/main/backend/ctj_api/views.py) for working examples (`OpportunityViewSet`, `UserDetail`, `healthcheck`).

**Why describe error codes:** less-experienced contributors don't always know what 401 vs 403 means or when DRF returns each. Listing the codes the endpoint can produce (with the trigger condition) is a contract for the frontend AND a study aid for the backend reader.

### Serializers — light template

Serializers are translation lenses between the model and JSON. The interesting policy lives on the model; the serializer just needs to say what shape it exposes and where it's consumed from.

Per the serializer-shape rule (see [`backend.md`](backend.md)'s `Serializer shape` section), each resource has a separate `XxxReadSerializer` and `XxxWriteSerializer` when both shapes are needed. The docstring template is the same for both; only the naming and the `Used by:` consumers differ.

```python
class FooReadSerializer(serializers.ModelSerializer):
    """<purpose one-liner: what this serializer exposes on read>.

    [Optional: prose paragraph for non-obvious behavior, e.g. fields
    that are stringified-on-read via `source=...`, fields that
    surface FKs as embedded shapes vs. UUIDs, anti-enumeration
    rules.]

    Used by:
    - `ConsumingView` (`<route>`).
    """


class FooWriteSerializer(serializers.ModelSerializer):
    """<purpose one-liner: what this serializer accepts on write>.

    [Optional: prose paragraph for non-obvious behavior. Worth
    calling out which fields are *absent* from `Meta.fields` and
    why - auto-managed fields (id, created_at, updated_at) and
    request-stamped fields (e.g. created_by set from request.user
    by the view) are absent rather than flagged read_only;
    "absent" is the contract.]

    Used by:
    - `ConsumingView.create` (`POST <route>`).
    - `ConsumingView.update` (`PUT <route>/<pk>/`).
    """
```

See [`backend/ctj_api/serializers.py`](https://github.com/hackforla/CivicTechJobs/blob/main/backend/ctj_api/serializers.py) for working examples.

**Why `Used by:` is its own labeled section:** serializers are often hard to navigate from — given a serializer, finding its consumer requires grep. Putting the consumer reference inside the docstring makes it discoverable from the file the reader is already on.

### Permissions — medium template

Permission classes encode access policy. The class docstring describes the user-facing rules; method docstrings describe the per-branch implementation.

```python
class FooPermission(permissions.BasePermission):
    """<purpose one-liner: what this permission gates>.

    Policy:
    - <rule, in user-facing terms>.
    - <rule>.

    Used by:
    - `ConsumingView` (`<route>`).
    """

    def has_permission(self, request, view):
        """<one-liner: what this method evaluates>.

        <Optional: brief context about when DRF calls this method
        and what data it has access to.>

        Branches:
        - <method or condition>: <what's returned and why>.
        """
```

See [`backend/ctj_api/permissions.py`](https://github.com/hackforla/CivicTechJobs/blob/main/backend/ctj_api/permissions.py) for working examples.

**Class-level vs method-level overlap:** the class `Policy:` is the user-facing summary; per-method `Branches:` is the implementation walkthrough. They overlap deliberately - a junior reader who's learning DRF reads both, an experienced reader skips to the one they need.

### URL configs, scaffold files (apps.py, settings.py, etc.) — light template

Config files don't have substantial behavior. Light docstrings that describe what's mounted/configured and any non-obvious choices.

```python
"""<one-liner: what this file configures>.

[Optional: prose paragraphs for non-obvious mounts, ordering
constraints, env-var dependencies, or architectural notes.]
"""
```

See [`backend/ctj_api/urls.py`](https://github.com/hackforla/CivicTechJobs/blob/main/backend/ctj_api/urls.py) and [`backend/backend/settings.py`](https://github.com/hackforla/CivicTechJobs/blob/main/backend/backend/settings.py).

### Tests — light template, behavioral test names

Tests live one file per resource under [`backend/ctj_api/tests/`](https://github.com/hackforla/CivicTechJobs/tree/main/backend/ctj_api/tests) (see [`backend.md`](backend.md)'s `Test shape` section for the full layout rule). Each file holds one `<Resource>Tests` class extending `APITestCase`; shared fixture-construction lives in `common.py` as factory helpers.

Test method names follow `test_<subject>_<action>_<expectation>`. Each method's docstring is a behavioral statement of what the test verifies, not a label for the method.

```python
"""<one-liner: what this test module covers>."""


class FooTests(APITestCase):
    """<one-liner: what this test class scopes to>.

    [Optional: prose paragraph for the resource's policy
    surface, e.g. "Reads are public; mutations gated by ...".]
    """

    def setUp(self):
        ...

    def test_<subject>_<action>_<expectation>(self):
        """<Subject> <verb phrase asserting expected outcome>."""
```

Good test docstring:

```python
"""Three-way split of 33.33% each (99.99%) is rejected."""
"""Healthcheck returns 200 with an `uptime` key in the JSON body."""
"""Anonymous requests to a user record get 403 (DRF SessionAuth default)."""
```

Avoid "Test that X is Y'd" framings - they restate the function name without adding info. The docstring should answer "what does this test prove?", not "what is this test about?"

## Vocabulary: lifecycle control and visibility tags

The `Lifecycle control:` and `Visibility:` sections in model docstrings use a small set of fixed tags. Use existing tags where possible; introduce new ones only when current vocabulary genuinely doesn't fit.

### Lifecycle control tags

Tag the *primary* mechanism that creates and edits rows in the table.

| Tag | Meaning |
|-----|---------|
| `admin-managed` | Rows are curated by staff via Django admin (`/admin/`). |
| `user-managed` | Rows are created and edited by end-users via the API. |
| `creator-managed` | Rows are created by users but only the creator can update them. |
| `pd-synced` | Rows are sourced from a PeopleDepot sync (Stage 2). |

Tags can compose with stage qualifiers: `admin-managed (Stage 1) -> pd-synced (Stage 2)`.

### Visibility tags

Tag the *most-permissive* read access. If multiple methods exist, list each separately.

| Tag | Meaning |
|-----|---------|
| `public-read` | Anonymous users can read via the API (`AllowAny` or `IsAuthenticatedOrReadOnly` for reads). |
| `auth-required` | Reads require authentication. |
| `internal` | No direct API endpoint; accessed indirectly through other resources. |
| `pm-write` | Mutations require `isProjectManager=True`. |
| `creator-write` | Mutations require `request.user == obj.created_by`. |
| `pm-delete` | Deletions require PM status. |

Visibility tags are write-aware too, so a model with mixed read/write posture can list multiple lines.

## Flagging bugs in docstrings

When the docstring sweep surfaces a bug in the code being documented, flag it in the docstring as a prose paragraph. Make it clearly identifiable (e.g. "Note:", "Flagging as a bug", or similar). Keep the flag self-contained - don't reference local-only files (anything in `scratch/` doesn't ship to upstream readers).

The flag stays in the docstring until the bug is fixed. When the fix lands, the flag goes with it.

If the bug fix is significant enough to need a separate PR, the bug stays flagged until that PR merges. Multiple in-flight bugs are fine; the docstring is the durable record.

## When the conventions don't fit

The templates above cover the cases that exist today. Some examples that don't fit cleanly:

- A model with no domain-level workflow (an audit log, a join table) - the `Business workflow:` section will be one short bullet about its role.
- A view that wraps a third-party service or does heavy custom work - the `Flow:` section may need to be numbered with steps, including external calls.
- A helper function in `views.py` that's not a view - use a one-liner or a brief paragraph; no labeled sections.

When in doubt: match the spirit (scannable, labeled when there are real fixed-shape attributes, light when there aren't) over the letter of the templates.

## Tooling

- ruff enforces line length (88 cols on docstrings) but doesn't validate docstring content or section presence.
- No linter currently checks docstring shape; convention is enforced by review.

If we move to `pydocstyle` later, the rule subset to enable would be the PEP 257 ones plus a custom check for the labeled sections - but that's significant tool work, not on the current roadmap.
