"""Tests for `/api/communities-of-practice/` (read-only catalog)."""

from rest_framework import status
from rest_framework.test import APITestCase

from ctj_api.tests.common import make_cop


class CommunityOfPracticeReadTests(APITestCase):
    """Read-only catalog endpoints for `CommunityOfPractice`."""

    def setUp(self):
        self.cop = make_cop()

    def test_list_returns_all_cops(self):
        """GET on the CoP list returns 200 with all rows serialized."""
        response = self.client.get("/api/communities-of-practice/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["practice_area"], "engineering")
