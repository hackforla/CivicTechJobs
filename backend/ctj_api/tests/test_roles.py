"""Tests for `/api/roles/` (read-only catalog)."""

from rest_framework import status
from rest_framework.test import APITestCase

from ctj_api.tests.common import make_cop, make_role


class RoleReadTests(APITestCase):
    """Read-only catalog endpoints for `Role`."""

    def setUp(self):
        self.cop = make_cop()
        self.role = make_role(cop=self.cop)

    def test_list_returns_all_roles(self):
        """GET on the Role list returns 200 with all rows serialized."""
        response = self.client.get("/api/roles/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Developer")
