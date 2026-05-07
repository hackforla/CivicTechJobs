"""Tests for `/api/projects/` (read-only catalog)."""

from rest_framework import status
from rest_framework.test import APITestCase

from ctj_api.tests.common import make_project


class ProjectReadTests(APITestCase):
    """Read-only catalog endpoints for `Project`."""

    def setUp(self):
        self.project = make_project()

    def test_list_returns_all_projects(self):
        """GET on the Project list returns 200 with all rows serialized."""
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Civic Tech Jobs")
