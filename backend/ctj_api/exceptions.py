"""Custom DRF exception handler for the CTJ error envelope.

Wraps DRF's default exception handler so every error response shares
a single shape:

    {
        "error": {
            "code": "<machine_readable_snake_case>",
            "message": "<human-readable string>",
            "fields": { "<field>": ["<msg>"] }   # validation errors only
        }
    }

The handler is registered as `REST_FRAMEWORK["EXCEPTION_HANDLER"]` in
`backend/settings.py`. It only handles DRF-raised exceptions; non-DRF
exceptions still bubble to Django's 500 handler. Django's `Http404`
and `PermissionDenied` are converted to DRF equivalents by the time
this handler sees them.

Manual error paths (e.g. `api_not_found`'s catch-all) construct the
envelope inline using the same shape; they don't go through this
handler because they're not DRF-raised.
"""

from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_default_exception_handler

# Maps DRF exception classes to envelope `code` values. Order matters
# only for readability; matching is done by isinstance below, so
# subclasses match before their parents (ValidationError before
# APIException, etc.).
_CODE_BY_EXCEPTION_CLASS: tuple[tuple[type[exceptions.APIException], str], ...] = (
    (exceptions.ValidationError, "validation_error"),
    (exceptions.AuthenticationFailed, "authentication_failed"),
    (exceptions.NotAuthenticated, "not_authenticated"),
    (exceptions.PermissionDenied, "permission_denied"),
    (exceptions.NotFound, "not_found"),
    (exceptions.MethodNotAllowed, "method_not_allowed"),
    (exceptions.NotAcceptable, "not_acceptable"),
    (exceptions.UnsupportedMediaType, "unsupported_media_type"),
    (exceptions.ParseError, "parse_error"),
    (exceptions.Throttled, "throttled"),
)


def _resolve_code(exc: Exception) -> str:
    """Map an exception instance to the envelope `code` string."""
    for exc_class, code in _CODE_BY_EXCEPTION_CLASS:
        if isinstance(exc, exc_class):
            return code
    return "error"


def _resolve_message(exc: Exception) -> str:
    """Extract a human-readable message from a DRF exception."""
    detail = getattr(exc, "detail", None)
    if detail is None:
        return str(exc)
    if isinstance(detail, list | dict):
        # Validation errors carry structured detail; the top-level
        # message is generic. The per-field detail is surfaced via
        # `error.fields` instead.
        return "Request validation failed."
    return str(detail)


def civic_exception_handler(exc, context):
    """Render DRF exceptions as the CTJ error envelope.

    Returns `None` for non-DRF exceptions (matching DRF's contract);
    Django then handles them through the standard 500 path.
    """
    response = drf_default_exception_handler(exc, context)
    if response is None:
        return None

    code = _resolve_code(exc)
    message = _resolve_message(exc)

    body: dict = {
        "error": {
            "code": code,
            "message": message,
        }
    }

    if isinstance(exc, exceptions.ValidationError):
        # DRF's ValidationError detail is the per-field structure
        # (`{"<field>": [...]}` or a list at top level for non-field
        # errors). Surface it under `fields` for the envelope shape.
        body["error"]["fields"] = exc.detail

    return Response(body, status=response.status_code, headers=response.headers)
