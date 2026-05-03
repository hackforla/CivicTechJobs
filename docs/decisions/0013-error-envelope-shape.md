# ADR-0013: Error envelope shape

**Status:** Accepted
**Date:** 2026-05-02

## Context

DRF's default exception handler produces multiple shapes for different error classes:

- `{"detail": "..."}` for `PermissionDenied`, `NotAuthenticated`, `AuthenticationFailed`, `NotFound`, `MethodNotAllowed`, `ParseError`, etc.
- `{"<field>": ["msg"]}` for per-field validation errors.
- `{"non_field_errors": [...]}` for top-level validation errors.

A frontend caller has to handle three different error shapes. Some endpoints may also return manually-constructed errors (e.g. a Django URL fallback for unknown paths) that pick yet another shape.

Locking in one shape early means future endpoints - auth, matching, qualifier integration - all start from the same convention. A frontend `fetch` wrapper can branch on a single error key and surface the same UI primitives across the entire API surface.

## Decision

**Adopt a single envelope shape, wrap all DRF exceptions through a custom exception handler, and apply the same shape inline anywhere errors are constructed manually.**

Envelope shape:

```json
{
  "error": {
    "code": "<machine_readable_snake_case>",
    "message": "<human-readable string>",
    "fields": { "<field>": ["<msg>", ...] }
  }
}
```

- `error` is always an object, never a string.
- `error.code` is a machine-readable snake_case identifier. Frontend code switches on `error.code`; it does not parse `error.message`.
- `error.message` is a human-readable string suitable for displaying to users when no field-level surface is appropriate. Punctuation included; ends with a period.
- `error.fields` is present **only** when the error is a per-field validation failure. Keys are field names; values are arrays of error messages. Top-level (non-field) validation errors land under the special key `non_field_errors`, mirroring DRF's existing convention.
- HTTP status code goes only in the response status; it is not duplicated in the envelope. The HTTP status is the source of truth.

Wiring:

- A custom exception handler (`ctj_api.exceptions.civic_exception_handler`) is registered as `REST_FRAMEWORK["EXCEPTION_HANDLER"]`. It wraps DRF's default handler - non-DRF exceptions still bubble up to Django's 500 handler. Django's `Http404` and `PermissionDenied` are converted to DRF equivalents by the time the handler sees them.
- The handler maps each DRF exception class to a code and renders the envelope.
- Manual error paths (e.g. URL fallbacks) construct the same envelope inline because they don't go through DRF's exception machinery.

DRF exception → code mapping:

| Exception | `error.code` |
|-----------|--------------|
| `ValidationError` | `validation_error` (with `error.fields`) |
| `AuthenticationFailed` | `authentication_failed` |
| `NotAuthenticated` | `not_authenticated` |
| `PermissionDenied` | `permission_denied` |
| `NotFound` | `not_found` |
| `MethodNotAllowed` | `method_not_allowed` |
| `NotAcceptable` | `not_acceptable` |
| `UnsupportedMediaType` | `unsupported_media_type` |
| `ParseError` | `parse_error` |
| `Throttled` | `throttled` |
| (other DRF `APIException`) | `error` |

## Alternatives considered

- **Keep DRF's defaults.** Less code; DRF idiomatic. Discarded because the `{"detail": ...}` / `{"<field>": ...}` split forces every frontend caller to branch on shape. Centralizing the shape now means future frontend code can treat all errors uniformly.

- **Per-view inline envelope construction (no custom handler).** Every error-returning view manually constructs the envelope. Discarded because most errors don't come from manual paths - they come from DRF's machinery (permission denials, validation failures, auth failures). Without a handler, every viewset/FBV that *could* fail would need its own try/except wrapping. The cost is paid at every endpoint instead of once at the handler.

- **Keep `status_code` in the envelope.** Mirrors the response status into the body. Discarded because clients already have the status from the HTTP response line, and duplicating invites desync.

- **Use `errors` (plural) at the top level** to allow returning multiple errors at once. Discarded because most error paths return exactly one error; the per-field validation case is already handled by `error.fields`. If multi-error responses become a real need, the envelope can extend.

- **Use `code` at the top level** (`{"code": "...", "message": "..."}`) without nesting under `error`. Slightly flatter. Discarded because nesting under `error` lets successful responses use the same top-level keys without collision. The frontend type for `error` is also self-contained - `data.error` either is the envelope or is undefined.

- **Adopt RFC 7807 `application/problem+json`.** The Problem Details standard. Discarded because RFC 7807 prescribes `type`, `title`, `detail`, `instance` keys with specific semantics that don't quite map (`type` is meant to be a URI), and the project doesn't have the API-versioning posture or external-consumer scale to benefit from an RFC-pinned shape. The chosen shape is RFC-7807-shaped (machine code + human message + per-field details) without the URI ceremony.

## Consequences

**Accepted:**

- A small amount of new code: the custom handler module and a `REST_FRAMEWORK` config block.

- Future error paths must use the envelope. Reviewers can grep PRs for `Response({"detail":` or similar to catch deviation.

- When new error paths are added, prefer raising a DRF exception (`ValidationError`, `PermissionDenied`, etc.) so the handler renders the envelope automatically. Construct the envelope inline only when raising would be the wrong tool (URL-level catch-alls, asynchronous task error responses).

**Won:**

- One shape for clients to parse. Frontend `fetch` wrapper switches on `data.error.code`, displays `data.error.message`, surfaces `data.error.fields` to per-field UI when present.

- Snake_case machine codes are programmer-friendly (greppable, stable across translations) and complement the human-readable message.

- `error.fields` keeps DRF's per-field validation idiom (which the frontend would have to handle anyway because DRF puts field errors there) but moves it into a stable, predictable location instead of mixed with top-level keys.

- The handler is the single edit point for the envelope shape. If the contract evolves (add an `instance_id` for trace correlation, add an `i18n_key`), it changes in one file.
