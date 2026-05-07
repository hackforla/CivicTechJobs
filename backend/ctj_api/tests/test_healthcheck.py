"""Tests for `GET /api/healthcheck/`."""

from rest_framework import status
from rest_framework.test import APITestCase


class HealthcheckTests(APITestCase):
    """Liveness probe at `/api/healthcheck/`."""

    def test_healthcheck_returns_uptime(self):
        """Healthcheck returns 200 with an `uptime` key in the JSON body."""
        response = self.client.get("/api/healthcheck/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("uptime", response.json())
