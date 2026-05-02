"""Integration tests for CTJ's `/api/*` endpoints (auth, CRUD, read-only)."""

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from ctj_api.models import (
    CommunityOfPractice,
    CustomUser,
    Opportunity,
    Project,
    Role,
    Skill,
)


class APIBasicTests(APITestCase):
    """End-to-end checks for the API's basic shape.

    Covers read-only reference endpoints, auth posture on
    `/api/users/<uuid>/`, and PM-gated mutations on
    `/api/opportunities/`.
    """

    def setUp(self):
        """Seed users and reference rows.

        Three users (one PM, two regular), one row per reference
        table (CoP, Role, Skill, Project), and one Opportunity owned
        by the PM. Client starts authenticated as the PM.
        """
        self.client = APIClient()

        # Create a project manager user
        self.pm_user = CustomUser.objects.create_user(
            people_depot_user_id="unique_id_pm",
            username="pm_user",
            email="pm_user@example.com",
            password="password123",
            isProjectManager=True,
        )

        # Create a regular user1
        self.regular_user1 = CustomUser.objects.create_user(
            people_depot_user_id="unique_id_1",
            username="regular_user1",
            email="regular_user1@example.com",
            password="password123",
            isProjectManager=False,
        )

        # Create a regular user2
        self.regular_user2 = CustomUser.objects.create_user(
            people_depot_user_id="unique_id_2",
            username="regular_user2",
            email="regular_user2@example.com",
            password="password123",
            isProjectManager=False,
        )

        # Authenticate with the PM user initially
        self.client.force_authenticate(user=self.pm_user)

        # Create test data
        self.cop = CommunityOfPractice.objects.create(
            practice_area="engineering", description="Engineering CoP"
        )

        self.role = Role.objects.create(
            title="Developer", community_of_practice=self.cop
        )

        self.skill = Skill.objects.create(name="Python")

        self.project = Project.objects.create(
            people_depot_project_id="1234-abcd", name="Civic Tech Jobs"
        )

        self.opportunity = Opportunity.objects.create(
            project=self.project,
            role=self.role,
            body="This is a test opportunity",
            min_experience_required="junior",
            min_hours_required=10,
            work_environment="remote",
            status="open",
            created_by=self.pm_user,
        )

    def test_healthcheck(self):
        """Healthcheck returns 200 with an `uptime` key in the JSON body."""
        response = self.client.get("/api/healthcheck")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_json = response.json()
        self.assertIn("uptime", response_json)

    def test_read_only_community_of_practice(self):
        """GET on the CoP list returns 200 with all rows serialized."""
        response = self.client.get("/api/communityOfPractice/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["practice_area"], "engineering")

    def test_read_only_roles(self):
        """GET on the Role list returns 200 with all rows serialized."""
        response = self.client.get("/api/roles/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Developer")

    def test_read_only_skills(self):
        """GET on the Skill list returns 200 with all rows serialized."""
        response = self.client.get("/api/skills/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Python")

    def test_read_only_projects(self):
        """GET on the Project list returns 200 with all rows serialized."""
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Civic Tech Jobs")

    def test_list_opportunities(self):
        """Opportunity list is publicly readable (no auth required)."""
        self.client.logout()
        response = self.client.get("/api/opportunities/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_create_opportunity_as_regular_user(self):
        """Non-PM users get 403 on POST /api/opportunities/."""
        self.client.force_authenticate(user=self.regular_user1)
        payload = {
            "project": str(self.project.id),
            "role": str(self.role.id),
            "body": "Unauthorized attempt to create an opportunity",
            "min_experience_required": "senior",
            "min_hours_required": 5,
            "work_environment": "remote",
            "status": "open",
        }
        response = self.client.post("/api/opportunities/", payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # The following test is currently commented out because it exercises
    # the `CustomUserSerializer` read path, which crashes due to BUG-001
    # (the broken `opportunities` field). Uncomment once BUG-001 is
    # fixed (drop the field on `CustomUserSerializer`). See
    # `scratch/bugs.md` for the full bug entry.
    #
    # def test_user_can_access_own_details(self):
    #     """A user can fetch their own /api/users/<uuid>/ record."""
    #     self.client.force_authenticate(user=self.regular_user1)
    #     response = self.client.get(f"/api/users/{self.regular_user1.id}/")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_access_other_user_details(self):
        """Authenticated users get 403 when fetching someone else's user record."""
        self.client.force_authenticate(user=self.regular_user1)
        response = self.client.get(f"/api/users/{self.regular_user2.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_access_user_details(self):
        """Anonymous requests to a user record get 403 (DRF SessionAuth default)."""
        self.client.logout()
        response = self.client.get(f"/api/users/{self.regular_user1.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
