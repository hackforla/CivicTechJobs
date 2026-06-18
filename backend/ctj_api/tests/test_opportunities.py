"""Tests for `/api/opportunities/` (the one full-CRUD ViewSet)."""

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from accounts.tests.common import make_pm_user, make_regular_user
from ctj_api.tests.common import (
    make_cop,
    make_opportunity,
    make_role,
)


class OpportunityTests(APITestCase):
    """`OpportunityViewSet` behavior at `/api/opportunities/`.

    Sign-in is required for everything (no public listings). Reads
    need authentication; mutations are further gated by
    `OpportunityPermission`: only PMs can create; only the creator can
    update (PUT/PATCH); any PM can delete (broader than update so PMs
    can co-moderate abandoned listings).
    """

    def setUp(self):
        self.client = APIClient()
        self.pm_user = make_pm_user()
        self.other_pm_user = make_pm_user(
            username="other_pm",
            email="other_pm@example.com",
            people_depot_user_id="other_pm_pd_id",
        )
        self.regular_user = make_regular_user()
        self.cop = make_cop()
        self.role = make_role(cop=self.cop)
        self.opportunity = make_opportunity(
            role=self.role,
            created_by=self.pm_user,
        )

    # -- Read --------------------------------------------------------

    def test_anonymous_cannot_list_opportunities(self):
        """Anonymous users are rejected: there are no public listings."""
        response = self.client.get("/api/opportunities/")
        self.assertIn(
            response.status_code,
            (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN),
        )

    def test_authenticated_user_can_list_opportunities(self):
        """Any signed-in user (PM or not) can read the listing."""
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get("/api/opportunities/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_list_exposes_card_fields(self):
        """The reshaped card content (`project_name`, `overview`,
        `responsibilities`, `meeting_times`) is part of the read shape."""
        self.client.force_authenticate(user=self.pm_user)
        opp = make_opportunity(
            role=self.role,
            created_by=self.pm_user,
            project_name="Tabler",
            overview="Builds the platform.",
            responsibilities="Code, review, deploy.",
            meeting_times=[
                {"team": "Dev", "day": "Wed", "start": "12:30", "end": "13:30"}
            ],
        )
        response = self.client.get(f"/api/opportunities/{opp.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["project_name"], "Tabler")
        self.assertEqual(response.data["overview"], "Builds the platform.")
        self.assertEqual(response.data["responsibilities"], "Code, review, deploy.")
        self.assertEqual(response.data["meeting_times"][0]["day"], "Wed")

    def test_detail_returns_404_for_missing_id(self):
        """GET on an unknown opportunity UUID returns 404 (when signed in)."""
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get(
            "/api/opportunities/00000000-0000-0000-0000-000000000000/"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # -- Create ------------------------------------------------------

    def test_pm_can_create_opportunity(self):
        """PMs can POST a new opportunity; the response carries the new row."""
        self.client.force_authenticate(user=self.pm_user)
        payload = {
            "project_name": "Tabler",
            "role": str(self.role.id),
            "body": "Backend engineer for the Tabler project.",
            "min_experience_required": "mid-level",
            "min_hours_required": 8,
            "work_environment": "remote",
            "status": "open",
        }
        response = self.client.post("/api/opportunities/", payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["body"], payload["body"])
        self.assertEqual(response.data["project_name"], "Tabler")

    def test_create_without_status_defaults_to_draft(self):
        """Omitting `status` on POST yields `status="draft"` (the model default)."""
        self.client.force_authenticate(user=self.pm_user)
        payload = {
            "project_name": "Food Oasis",
            "role": str(self.role.id),
            "body": "Draft-by-default check.",
            "min_hours_required": 5,
            "work_environment": "hybrid",
        }
        response = self.client.post("/api/opportunities/", payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "draft")

    def test_create_on_hold_status_accepted(self):
        """`status="on_hold"` (underscored) is accepted; the literal-space
        legacy value was renamed in migration 0002."""
        self.client.force_authenticate(user=self.pm_user)
        payload = {
            "project_name": "Food Oasis",
            "role": str(self.role.id),
            "body": "On-hold posting.",
            "min_hours_required": 5,
            "work_environment": "in_person",
            "status": "on_hold",
        }
        response = self.client.post("/api/opportunities/", payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "on_hold")

    def test_create_validates_required_fields(self):
        """Missing required fields (role, body, etc.) return 400."""
        self.client.force_authenticate(user=self.pm_user)
        response = self.client.post("/api/opportunities/", {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_regular_user_cannot_create_opportunity(self):
        """Non-PM users get 403 on POST /api/opportunities/."""
        self.client.force_authenticate(user=self.regular_user)
        payload = {
            "project_name": "Tabler",
            "role": str(self.role.id),
            "body": "Unauthorized create attempt",
            "min_experience_required": "senior",
            "min_hours_required": 5,
            "work_environment": "remote",
            "status": "open",
        }
        response = self.client.post("/api/opportunities/", payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # -- Update (PUT / PATCH) ----------------------------------------

    def test_creator_can_put_update(self):
        """The creating PM can PUT a full update to their own opportunity."""
        self.client.force_authenticate(user=self.pm_user)
        payload = {
            "project_name": "Tabler",
            "role": str(self.role.id),
            "body": "Updated description.",
            "min_experience_required": "senior",
            "min_hours_required": 12,
            "work_environment": "hybrid",
            "status": "open",
        }
        response = self.client.put(
            f"/api/opportunities/{self.opportunity.id}/", payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["body"], "Updated description.")

    def test_creator_can_patch_update(self):
        """The creating PM can PATCH a partial update (regression for the
        previous always-403 PATCH gap in `OpportunityPermission`)."""
        self.client.force_authenticate(user=self.pm_user)
        response = self.client.patch(
            f"/api/opportunities/{self.opportunity.id}/",
            {"body": "Patched body only."},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.opportunity.refresh_from_db()
        self.assertEqual(self.opportunity.body, "Patched body only.")

    def test_non_creator_pm_cannot_put_update(self):
        """A PM who didn't create the opportunity cannot PUT it."""
        self.client.force_authenticate(user=self.other_pm_user)
        payload = {
            "project_name": "Tabler",
            "role": str(self.role.id),
            "body": "Hostile takeover.",
            "min_experience_required": "senior",
            "min_hours_required": 5,
            "work_environment": "remote",
            "status": "open",
        }
        response = self.client.put(
            f"/api/opportunities/{self.opportunity.id}/", payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_non_creator_pm_cannot_patch_update(self):
        """A PM who didn't create the opportunity cannot PATCH it either."""
        self.client.force_authenticate(user=self.other_pm_user)
        response = self.client.patch(
            f"/api/opportunities/{self.opportunity.id}/",
            {"body": "Hostile partial takeover."},
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # -- Delete ------------------------------------------------------

    def test_any_pm_can_delete_others_opportunity(self):
        """A PM who didn't create the opportunity can still DELETE it
        (deletion is intentionally broader than update so PMs can
        co-moderate abandoned listings)."""
        self.client.force_authenticate(user=self.other_pm_user)
        response = self.client.delete(f"/api/opportunities/{self.opportunity.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_regular_user_cannot_delete_opportunity(self):
        """Non-PM users get 403 on DELETE."""
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.delete(f"/api/opportunities/{self.opportunity.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
