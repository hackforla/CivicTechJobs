# ADR-0012: Permission class shape

**Status:** Accepted
**Date:** 2026-05-02

## Context

DRF's permission system splits across two layers:

- `has_permission(request, view)` - request-level checks, called before any object lookup. Has access to the request (HTTP method, headers, `request.user`) but not to a specific row.
- `has_object_permission(request, view, obj)` - object-level checks, called after `get_object()` resolves the row. Has access to the row.

Different policies use different layers: a "PMs only can POST" rule lives at the request level (no row needed); a "creator-only-can-update" rule needs the row. Some policies span both (PMs can POST; specific creators can PUT). Without a documented convention, each new permission class becomes its own design decision.

## Decision

**Override only the permission-method layers your policy actually needs. Document the rules in the class docstring; document branches in each overridden method's docstring.**

Rules:

1. **Override `has_permission`** if any rule depends only on the request (HTTP method, user properties readable without a database lookup, headers). Don't override it if every rule needs the row.
2. **Override `has_object_permission`** if any rule depends on the row being checked (creator-only, organization-membership, status-based). Don't override it if every rule is purely request-level.
3. **Override both** if rules span both layers.
4. **Override neither and use a built-in DRF class** (`IsAuthenticated`, `IsAuthenticatedOrReadOnly`, `AllowAny`) when the policy reduces to one of those. Custom permission classes are for *resource-specific* policy.

Class structure:

- Class name: `<Resource>Permission` for resource-scoped policy. `Is<Capability>Permission` for cross-resource capabilities.
- Class docstring follows [ADR-0007](0007-docstring-conventions.md)'s permission template: `Policy:` (user-facing rules) and `Used by:` (consuming views).
- Each overridden method has its own docstring with a `Branches:` section listing each HTTP-method-or-condition branch and what it returns.

Method-body conventions:

- **Early-return branches** rather than nested `if`s. The shape is `if condition: return X` for each branch, with a final `return False` for fall-through.
- **AnonymousUser-safe attribute access**: use `getattr(request.user, "attr", default)` for fields that anonymous users don't have. Direct `request.user.isProjectManager` raises `AttributeError` on `AnonymousUser`; the `getattr(..., False)` form returns `False` and gates correctly.
- **SAFE_METHODS exemption**: include `if request.method in permissions.SAFE_METHODS: return True` at the top of `has_object_permission` *only* when the resource is publicly readable. For self/owner-only resources where reads are also gated, do not exempt SAFE methods - the identity check handles all methods.
- **Inline comments at branch boundaries** when the branch's intent isn't obvious from the code; skip comments for one-line obvious branches.

`permission_classes` composition (in views):

- Tuple for class-level attributes: `permission_classes = (IsAuthenticatedOrReadOnly, OpportunityPermission)`.
- List for the `@permission_classes([...])` decorator on FBVs.
- Order from least-to-most-specific: built-in DRF gates first (auth), resource-specific custom classes after. Reading top-to-bottom reads the gate progression.

## Alternatives considered

- **Always override both methods, even when one is empty.** Some teams require both for uniformity. Discarded because empty `has_permission` returning `True` is exactly what DRF's default does - overriding adds noise without value.

- **Combine all logic into `has_permission` and skip `has_object_permission`.** Would force every check into the method-level layer, which doesn't have the row loaded. Discarded because per-row policies (creator-only, owner-only) genuinely need the object - pretending otherwise either re-fetches the row inside `has_permission` (wasteful) or makes the policy weaker.

- **Custom capability-gate function with role+capability resolution.** A larger architecture (role hierarchy, capability tables, organization-scoping) than the project's current needs. Discarded as over-engineering for the current scope; revisit when the project grows past a handful of permission classes or needs cross-resource capabilities.

- **Flatten everything to DRF built-ins (`IsAuthenticated`, `DjangoModelPermissions`, etc.) and skip custom classes.** Discarded because resource-specific rules (creator-only, PM-only-for-mutations) don't map cleanly to the built-ins. `DjangoModelPermissions` ties to Django's `auth.Permission` table which would have to be populated.

- **Move permission-attached metadata (user-facing message, error code) into the class itself.** Would let DRF's exception handler use richer 403 payloads. Out of scope here - couples to the error-envelope decision ([ADR-0013](0013-error-envelope-shape.md)). Permission classes stay focused on the boolean question.

## Consequences

**Accepted:**

- The convention is *teaching* (override only what you need) rather than *enforcing uniformity* (always override both). It rewards thoughtful policy design rather than cargo-culting.

- The `Is<Capability>Permission` naming variant (cross-resource capabilities) is reserved but currently unused. When a permission needs to be reused across resources, it'll have a place.

**Won:**

- Reviewers and future contributors have a written rule to apply when adding a permission class. "Why did you override only `has_object_permission`?" → "Because the policy is purely identity-matching; per the convention, that's the right shape."

- The `permission_classes` ordering rule (built-ins first, custom after; tuple in class attr, list in decorator) eliminates a small recurring style decision.

- Method-body conventions (early-return, AnonymousUser-safe attribute access, SAFE_METHODS exemption rules) catch a class of subtle bugs that come from cargo-culting permission code.
