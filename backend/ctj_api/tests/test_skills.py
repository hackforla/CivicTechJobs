"""Tests for `/api/skills/` (read-only catalog)."""

from rest_framework import status
from rest_framework.test import APITestCase

from ctj_api.tests.common import make_skill


class SkillReadTests(APITestCase):
    """Read-only catalog endpoints for `Skill`."""

    def setUp(self):
        self.skill = make_skill()

    def test_list_returns_all_skills(self):
        """GET on the Skill list returns 200 with all rows serialized."""
        response = self.client.get("/api/skills/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Python")
