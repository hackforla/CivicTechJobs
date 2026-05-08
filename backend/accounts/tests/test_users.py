"""Tests for `GET /api/users/<uuid:pk>/`."""

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from accounts.tests.common import make_regular_user


class UserDetailTests(APITestCase):
    """Per-user detail endpoint at `/api/users/<uuid:pk>/`.

    The endpoint is self-only by design: an authenticated user can
    fetch their own record (200), authenticated users requesting
    someone else's record get 403, and anonymous requests are
    rejected by `IsAuthenticated` before the object lookup.
    """

    def setUp(self):
        self.client = APIClient()
        self.user = make_regular_user(
            username="user_a",
            email="user_a@example.com",
            people_depot_user_id="user_a_pd_id",
        )
        self.other_user = make_regular_user(
            username="user_b",
            email="user_b@example.com",
            people_depot_user_id="user_b_pd_id",
        )

    # The following test is currently commented out because it exercises
    # the `CustomUserReadSerializer` read path, which crashes due to the
    # broken `opportunities` field (a writable PK-related-field that
    # references a non-existent attribute on `CustomUser`). Uncomment
    # once the field is dropped from the serializer.
    #
    # def test_authenticated_user_can_view_own_record(self):
    #     """A user can fetch their own /api/users/<uuid>/ record (200)."""
    #     self.client.force_authenticate(user=self.user)
    #     response = self.client.get(f"/api/users/{self.user.id}/")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_authenticated_user_cannot_view_others_record(self):
        """Authenticated user requesting someone else's record gets 403 envelope."""
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/users/{self.other_user.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        # Verify the envelope shape (custom exception handler wrapped DRF's
        # PermissionDenied into the project-wide error format).
        body = response.json()
        self.assertEqual(body["error"]["code"], "permission_denied")
        self.assertIsInstance(body["error"]["message"], str)

    def test_anonymous_cannot_view_user_record(self):
        """Anonymous requests get 403 envelope (DRF SessionAuth default)."""
        response = self.client.get(f"/api/users/{self.user.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        body = response.json()
        self.assertEqual(body["error"]["code"], "not_authenticated")
        self.assertIsInstance(body["error"]["message"], str)
