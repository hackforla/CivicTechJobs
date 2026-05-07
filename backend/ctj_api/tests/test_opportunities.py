"""Tests for `/api/opportunities/` (the one full-CRUD ViewSet)."""

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from ctj_api.tests.common import (
    make_cop,
    make_opportunity,
    make_pm_user,
    make_project,
    make_regular_user,
    make_role,
)


class OpportunityTests(APITestCase):
    """`OpportunityViewSet` behavior at `/api/opportunities/`.

    Reads are public; mutations are gated by `OpportunityPermission`.
    Only PMs can create; only the creator can update; any PM can
    delete. PATCH is currently always 403'd (flagged for fix in
    `ctj_api.permissions`).
    """

    def setUp(self):
        self.client = APIClient()
        self.pm_user = make_pm_user()
        self.regular_user = make_regular_user()
        self.cop = make_cop()
        self.role = make_role(cop=self.cop)
        self.project = make_project()
        self.opportunity = make_opportunity(
            project=self.project,
            role=self.role,
            created_by=self.pm_user,
        )

    def test_anonymous_can_list_opportunities(self):
        """Opportunity list is publicly readable (no auth required)."""
        response = self.client.get("/api/opportunities/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_regular_user_cannot_create_opportunity(self):
        """Non-PM users get 403 on POST /api/opportunities/."""
        self.client.force_authenticate(user=self.regular_user)
        payload = {
            "project": str(self.project.id),
            "role": str(self.role.id),
            "body": "Unauthorized create attempt",
            "min_experience_required": "senior",
            "min_hours_required": 5,
            "work_environment": "remote",
            "status": "open",
        }
        response = self.client.post("/api/opportunities/", payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
