# ADR-0009: Separate Read/Write serializer classes

**Status:** Accepted
**Date:** 2026-05-02

## Context

The natural DRF starting point is one `ModelSerializer` per resource, with the same class consumed for both reads and writes. "Read-only" is enforced by the consuming view restricting allowed HTTP methods (an FBV declaring `@api_view(["GET"])`, or a permission class rejecting non-PM mutations).

This works correctly, but it splits the shape contract across two layers:

- The serializer says "here are the fields and their types."
- The view says "but you can only call this with GET" or "POST is gated to PMs."

A reader of `serializers.py` cannot tell which fields are writable, which are computed-on-read, or whether the class is meant to support writes at all. That information lives in the view and the docstring, not in the serializer.

Worse, when read and write shapes legitimately diverge - e.g. `Opportunity.created_by` is a stringified email on read but the view stamps the FK from `request.user` on write, so the field has *different semantics* - the single class either does both behaviors awkwardly (with `ReadOnlyField` plus a view-layer `perform_create` override) or one of the behaviors is implicit (the writable subset of fields isn't documented anywhere except by elimination).

## Decision

**Separate `XxxReadSerializer` and `XxxWriteSerializer` classes per resource. Add a Write class only when a write endpoint actually exists. The view picks the right class - FBVs reference one directly; ViewSets dispatch via `get_serializer_class()` based on `self.action`.**

The rule:

| Resource state | Serializer classes |
|----------------|--------------------|
| Read-only (no write endpoint exists) | `XxxReadSerializer` only |
| Read + write | `XxxReadSerializer` and `XxxWriteSerializer` |

Naming: `XxxReadSerializer` / `XxxWriteSerializer`, DRF-idiomatic and greppable.

The Write class has the writable field list as its `Meta.fields`; auto-managed and request-stamped fields (`id`, `created_at`, `updated_at`, `created_by`) are **absent** from `fields` rather than included-and-flagged-read-only - the absence is the contract.

`ModelViewSet` dispatches via:

```python
def get_serializer_class(self):
    if self.action in ("list", "retrieve"):
        return XxxReadSerializer
    return XxxWriteSerializer
```

Resources that today have no write endpoint get only a Read class. No empty stub Write classes - the convention is "you have both classes when you have both behaviors." When a write endpoint is later added, the Write class is added alongside the existing Read.

## Alternatives considered

- **Single class, view enforces (status quo).** Less code, idiomatic for small DRF projects. Discarded because it splits the shape contract across layers. Reading `serializers.py` cold doesn't answer "is this writable, and if so by whom?" - that lives in the view, the permissions, the URL routing, and the docstring. Concentrating the contract back at the serializer is the entire point of using serializers.

- **Single class, `read_only_fields` enumerated to match `fields`.** All-fields-read-only is expressible as `read_only_fields = ("id", "name", ...)` enumerated. Discarded because (a) DRF's `read_only_fields` doesn't accept `"__all__"` the way `fields` does, so the field list ends up duplicated; (b) it doesn't solve the divergent-shape problem - a single class still has to do both behaviors via `extra_kwargs` or `to_representation` overrides. The class becomes a switchboard.

- **Custom `ReadOnlyModelSerializer` base class** that flips all fields read-only via `__init__`. Discarded for the same divergence reason and adds a non-DRF base class that future contributors have to learn.

- **Always pre-stub both Read and Write classes for every resource, even read-only ones.** Discarded because empty Write stubs are cargo-cult - they imply a write contract that doesn't exist. The convention is greppable enough as "whenever a Write endpoint exists, look for its corresponding Write serializer." YAGNI applies.

- **Move write-stamping logic (e.g. `created_by = request.user`) into the serializer's `create()` via context.** The argument: locate everything-write at the serializer; the view becomes a thin dispatcher. Considered but not selected as a hard rule. Some stamps belong at the serializer (validation-shaped), others stay at the view (request-context-shaped). For now, view-level `perform_create` keeps stamping `created_by` because the request-context extraction is genuinely view-layer concern; the serializer just *declares* `created_by` as absent from writable fields.

## Consequences

**Accepted:**

- More classes per resource that needs both shapes. Future write-endpoint adds will pair with new Write classes.

- The `get_serializer_class()` override on a `ModelViewSet` is load-bearing - accidentally removing it (e.g. during a refactor that loses the override) would silently fall back to whichever class is set as `serializer_class`. Mitigated by always setting `serializer_class = XxxReadSerializer` (the safer fallback) and by tests that exercise both read and write paths.

- Write field lists drift from Read field lists when models add columns. The new column has to be added in the right place (Read for sure; Write only if writable). This is also a win - see below.

**Won:**

- The serializer file answers "what's writable?" by reading `XxxWriteSerializer.Meta.fields`. No need to cross-reference the view, the permission class, and the routing layer.

- Read/write divergence is a class boundary. Future work wanting to change write-side validation (add a custom `validate_status()`, reject specific updates, whatever) edits `XxxWriteSerializer` only. Read responses are not affected. The change is atomic.

- The "field absent from `Meta.fields`" idiom for non-writable fields is cleaner than `read_only_fields` enumeration - the absence is the contract, and the field doesn't appear in writable error messages, doesn't appear in `Meta.fields` documentation, doesn't get half-included.

- New write endpoints in the future have a clear template: pair the Write serializer with the appropriate FBV (or new ViewSet action). The convention is uniform regardless of view shape.
