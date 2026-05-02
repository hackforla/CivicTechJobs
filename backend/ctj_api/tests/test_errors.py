"""Tests for the CTJ error envelope shape.

Errors should render as:

    {"error": {"code": "<snake_case>", "message": "<human-readable>"}}

with `error.fields` present only for validation errors. The custom
`civic_exception_handler` (registered as REST_FRAMEWORK's
EXCEPTION_HANDLER) wraps DRF-raised errors; `api_not_found`
constructs the same envelope inline because it's a Django URL
fallback, not a DRF error path.
"""

from rest_framework import status
from rest_framework.test import APITestCase


class ApiNotFoundEnvelopeTests(APITestCase):
    """The catch-all 404 for unknown `/api/*` paths uses the envelope."""

    def test_unknown_api_path_returns_envelope(self):
        """`/api/<unmatched>` returns the envelope shape with code=not_found."""
        response = self.client.get("/api/this-path-does-not-exist/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        body = response.json()
        self.assertIn("error", body)
        self.assertEqual(body["error"]["code"], "not_found")
        self.assertIsInstance(body["error"]["message"], str)
        # Catch-all is not a validation error; no `fields` key.
        self.assertNotIn("fields", body["error"])
