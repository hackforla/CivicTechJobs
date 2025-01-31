from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from ctj_api.models import (
    CommunityOfPractice,
    Role,
    Skill,
    Project,
    Opportunity,
    CustomUser,
)


class APIBasicTests(APITestCase):
    def setUp(self):
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
        """Test the healthcheck endpoint."""
        response = self.client.get("/api/healthcheck")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_json = response.json()
        self.assertIn("uptime", response_json)

    def test_read_only_community_of_practice(self):
        """Test that Communities of Practice can be listed."""
        response = self.client.get("/api/communityOfPractice/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["practice_area"], "engineering")

    def test_read_only_roles(self):
        """Test that roles can be listed."""
        response = self.client.get("/api/roles/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Developer")

    def test_read_only_skills(self):
        """Test that skills can be listed."""
        response = self.client.get("/api/skills/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Python")

    def test_read_only_projects(self):
        """Test that projects can be listed."""
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Civic Tech Jobs")

    def test_list_opportunities(self):
        """Test listing opportunities as an unauthenticated user."""
        self.client.logout()
        response = self.client.get("/api/opportunities/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_create_opportunity_as_regular_user(self):
        """Test that a regular user cannot create an opportunity."""
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

    # def test_user_can_access_own_details(self):
    #     """Test that a user can access their own details."""
    #     self.client.force_authenticate(user=self.regular_user1)
    #     response = self.client.get(f"/api/users/{self.regular_user1.id}/")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_access_other_user_details(self):
        """Test that a user can't access another user's details."""
        self.client.force_authenticate(user=self.regular_user1)
        response = self.client.get(f"/api/users/{self.regular_user2.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_access_user_details(self):
        """Test that unauthenticated users can't access user details."""
        self.client.logout()
        response = self.client.get(f"/api/users/{self.regular_user1.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
