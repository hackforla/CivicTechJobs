from django.test import TestCase
from rest_framework.test import RequestsClient

HOST = "http://localhost:8000"
BASE_URI = "/api"


class OpportunityTestCase(TestCase):
    fixtures = [
        "server/fixtures/test_data",
    ]
    host = "http://localhost:8000"
    base_uri = "/api/v1/opportunities/"

    def setUp(self):
        client = RequestsClient()  # noqa: F841 # pylint: disable=W0612

    def test_list_opportunities(self):
        response = self.client.get(f"{self.host}{self.base_uri}")
        self.assertEqual(response.status_code, 200)

    def test_create_opportunity(self):
        # make call to list_opps and get count of results
        response = self.client.get(f"{self.host}{self.base_uri}")
        self.assertEqual(response.status_code, 200)
        opp_count = len(response.data)

        # create opp
        data = {
            "title": "New opp",
            "description": "new opp for testing",
            "poster": "test@abc.com",
            "hours_per_week": 20,
            "num_positions_available": 3,
            "project": "e080d5be-52d8-4dd4-aff5-8ac5f5d21c84",
            "role": "eb4ca87e-a8d0-4118-b4c2-22b8eb5d86c2",
            "experience_level": "Trained",
            "skills": [
                "92df2b94-ed1e-44cc-a664-4f80149c39f0",
                "c56a5f44-fcbf-45e9-a14e-e2d672fc7080",
            ],
        }
        response = self.client.post(
            f"{self.host}{self.base_uri}", data=data, format="json"
        )
        self.assertEqual(response.status_code, 201)

        # make another call to list_opps and validate count has been incremented
        response = self.client.get(f"{self.host}{self.base_uri}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), opp_count + 1)

    def test_create_opportunity_missing_attr(self):
        data = {
            "description": "new opp for testing",
            "poster": "test@abc.com",
            "hours_per_week": 20,
            "num_positions_available": 3,
            "project": "e080d5be-52d8-4dd4-aff5-8ac5f5d21c84",
            "role": "eb4ca87e-a8d0-4118-b4c2-22b8eb5d86c2",
            "experience_level": "Trained",
        }
        response = self.client.post(
            f"{self.host}{self.base_uri}", data=data, format="json"
        )
        self.assertEqual(response.status_code, 400)


class HealthcheckTestCase(TestCase):
    uri = "/healthcheck"

    def test_healthcheck(self):
        response = self.client.get(f"{HOST}{BASE_URI}{self.uri}", format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["message"], "healthcheck")
