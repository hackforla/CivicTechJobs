from django.test import TestCase
from rest_framework.test import RequestsClient

HOST = "http://localhost:8000"
BASE_URI = "/api"


class ProjectTestCase(TestCase):
    fixtures = [
        "server/fixtures/test_data",
    ]
    uri = "/v1/projects/"

    def setUp(self):
        client = RequestsClient()  # noqa: F841 # pylint: disable=W0612

    def test_list_projects(self):
        response = self.client.get(f"{HOST}{BASE_URI}{self.uri}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    # project model doesn't contain recurring_events, but serializer should return them
    def test_project_contains_recurring_events(self):
        response = self.client.get(f"{HOST}{BASE_URI}{self.uri}")
        for project in response.json():
            if project["id"] == "620997442720480f934e4362":
                self.assertEqual(len(project["recurring_events"]), 4)
                self.assertEqual(
                    project["recurring_events"][0]["project"],
                    "620997442720480f934e4362",
                )
                self.assertIn("start_time", project["recurring_events"][0])
            elif project["id"] == "5edeac78ce228b001778facd":
                self.assertEqual(len(project["recurring_events"]), 3)
                self.assertEqual(
                    project["recurring_events"][0]["project"],
                    "5edeac78ce228b001778facd",
                )
                self.assertIn("start_time", project["recurring_events"][0])
            else:
                self.fail("unexpected project - update test if added data via fixture")


class OpportunityTestCase(TestCase):
    fixtures = [
        "server/fixtures/test_data",
    ]
    uri = "/v1/opportunities/"

    def setUp(self):
        client = RequestsClient()  # noqa: F841 # pylint: disable=W0612

    def test_list_opportunities(self):
        response = self.client.get(f"{HOST}{BASE_URI}{self.uri}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)

    def test_get_opportunity(self):
        response = self.client.get(
            f"{HOST}{BASE_URI}{self.uri}d7afff27-7c99-4f67-b3db-94211b51fef8/"
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], "d7afff27-7c99-4f67-b3db-94211b51fef8")
        self.assertEqual(response.json()["title"], "UI/UX practitioners needed")

    def test_get_opportunity_404(self):
        response = self.client.get(f"{HOST}{BASE_URI}{self.uri}invalid-id/")
        self.assertEqual(response.status_code, 404)

    def test_create_opportunity(self):
        # make call to list_opps and get count of results
        response = self.client.get(f"{HOST}{BASE_URI}{self.uri}")
        self.assertEqual(response.status_code, 200)
        opp_count = len(response.data)

        # create opp
        data = {
            "title": "New opp",
            "description": "new opp for testing",
            "poster": "test@abc.com",
            "hours_per_week": 20,
            "num_positions_available": 3,
            "project": "620997442720480f934e4362",
            "role": "53d7334b-f416-40a8-b5c1-8a1747bad04d",
            "experience_level": "dccc60af-3e28-427b-b138-7b190300d1ea",
            "skills": [
                "7f1c5bdc-6871-4834-b2ba-6e3907f3aeab",
            ],
        }
        response = self.client.post(
            f"{HOST}{BASE_URI}{self.uri}", data=data, format="json"
        )
        self.assertEqual(response.status_code, 201)

        # make another call to list_opps and validate count has been incremented
        response = self.client.get(f"{HOST}{BASE_URI}{self.uri}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), opp_count + 1)

    def test_create_opportunity_missing_attr(self):
        data = {
            "description": "new opp for testing",
            "poster": "test@abc.com",
        }
        response = self.client.post(
            f"{HOST}{BASE_URI}{self.uri}", data=data, format="json"
        )
        self.assertEqual(response.status_code, 400)

    # opportunity's experience_level field should be JSON obj and not just foreign key
    def test_experienece_level_is_serialized(self):
        response = self.client.get(
            f"{HOST}{BASE_URI}{self.uri}0e5ee547-754e-490b-8f6c-6194858f0e8f/"
        )
        experience_level = response.json()["experience_level"]
        self.assertIn("id", experience_level)
        self.assertIn("name", experience_level)

    # opportunity's role field should be JSON obj and not just foreign key
    def test_role_level_is_serialized(self):
        response = self.client.get(
            f"{HOST}{BASE_URI}{self.uri}0e5ee547-754e-490b-8f6c-6194858f0e8f/"
        )
        role = response.json()["role"]
        self.assertIn("id", role)
        self.assertIn("name", role)

    # opportunity's skills field should be JSON obj and not just foreign key
    def test_skill_level_is_serialized(self):
        response = self.client.get(
            f"{HOST}{BASE_URI}{self.uri}0e5ee547-754e-490b-8f6c-6194858f0e8f/"
        )
        skill = response.json()["skills"][0]
        self.assertIn("id", skill)
        self.assertIn("name", skill)

    # opportunity's project field should be JSON obj and not just foreign key
    def test_project_level_is_serialized(self):
        response = self.client.get(
            f"{HOST}{BASE_URI}{self.uri}0e5ee547-754e-490b-8f6c-6194858f0e8f/"
        )
        project = response.json()["project"]
        self.assertIn("id", project)
        self.assertIn("name", project)
        self.assertIn("github_url", project)
