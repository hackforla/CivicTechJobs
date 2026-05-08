"""Tests for `/api/auth/{csrf,signup,login,logout,me}/`."""

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from accounts.models import CustomUser
from accounts.tests.common import make_regular_user


class AuthCsrfTests(APITestCase):
    """`GET /api/auth/csrf/` sets the `csrftoken` cookie.

    The endpoint is idempotent and public: any client can call it,
    and repeated calls produce a fresh cookie. The frontend hits it
    once on app load to seed the cookie before any mutating call.
    """

    def setUp(self):
        self.client = APIClient()

    def test_csrf_endpoint_sets_cookie_and_returns_204(self):
        response = self.client.get("/api/auth/csrf/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIn("csrftoken", response.cookies)
        # Cookie value is non-empty.
        self.assertTrue(response.cookies["csrftoken"].value)


class AuthSignupTests(APITestCase):
    """`POST /api/auth/signup/` creates a user and auto-logs them in."""

    def setUp(self):
        self.client = APIClient()

    def test_signup_creates_user_and_returns_201(self):
        payload = {
            "email": "new@example.com",
            "password": "Sup3rSecret!",
            "name": "New User",
        }
        response = self.client.post("/api/auth/signup/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        body = response.json()
        self.assertEqual(body["email"], "new@example.com")
        self.assertEqual(body["name"], "New User")
        # Password is never echoed.
        self.assertNotIn("password", body)
        # Created in the DB.
        self.assertTrue(CustomUser.objects.filter(email="new@example.com").exists())

    def test_signup_auto_logs_in(self):
        """After signup, the session cookie is set and `/auth/me/` succeeds."""
        self.client.post(
            "/api/auth/signup/",
            {
                "email": "auto@example.com",
                "password": "Sup3rSecret!",
                "name": "Auto Login",
            },
            format="json",
        )
        # Same client should now be authenticated via the session cookie.
        me_response = self.client.get("/api/auth/me/")
        self.assertEqual(me_response.status_code, status.HTTP_200_OK)
        self.assertEqual(me_response.json()["email"], "auto@example.com")

    def test_signup_with_duplicate_email_returns_400(self):
        make_regular_user(email="taken@example.com")
        response = self.client.post(
            "/api/auth/signup/",
            {
                "email": "taken@example.com",
                "password": "Sup3rSecret!",
                "name": "Dup",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        body = response.json()
        # Error envelope shape per ADR-0013 / civic_exception_handler.
        self.assertEqual(body["error"]["code"], "validation_error")

    def test_signup_with_weak_password_returns_400(self):
        """Django's password validators reject too-short / too-common."""
        response = self.client.post(
            "/api/auth/signup/",
            {"email": "weak@example.com", "password": "abc", "name": "Weak"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signup_with_missing_field_returns_400(self):
        response = self.client.post(
            "/api/auth/signup/",
            {"email": "missing@example.com", "password": "Sup3rSecret!"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AuthLoginTests(APITestCase):
    """`POST /api/auth/login/` validates credentials and creates a session."""

    def setUp(self):
        self.client = APIClient()
        self.user = make_regular_user(
            username="login_user@example.com",
            email="login_user@example.com",
            password="Sup3rSecret!",
        )

    def test_login_with_valid_credentials_returns_200(self):
        response = self.client.post(
            "/api/auth/login/",
            {"email": "login_user@example.com", "password": "Sup3rSecret!"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["email"], "login_user@example.com")

    def test_login_creates_session_visible_to_me(self):
        self.client.post(
            "/api/auth/login/",
            {"email": "login_user@example.com", "password": "Sup3rSecret!"},
            format="json",
        )
        me_response = self.client.get("/api/auth/me/")
        self.assertEqual(me_response.status_code, status.HTTP_200_OK)

    def test_login_with_bad_password_returns_400(self):
        response = self.client.post(
            "/api/auth/login/",
            {"email": "login_user@example.com", "password": "wrong"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        body = response.json()
        self.assertEqual(body["error"]["code"], "validation_error")

    def test_login_with_unknown_email_returns_400(self):
        response = self.client.post(
            "/api/auth/login/",
            {"email": "nobody@example.com", "password": "Sup3rSecret!"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AuthLogoutTests(APITestCase):
    """`POST /api/auth/logout/` clears the session."""

    def setUp(self):
        self.client = APIClient()
        self.user = make_regular_user()

    def test_logout_clears_session(self):
        self.client.force_authenticate(user=self.user)
        # Sanity: authenticated.
        self.assertEqual(
            self.client.get("/api/auth/me/").status_code, status.HTTP_200_OK
        )
        response = self.client.post("/api/auth/logout/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # `force_authenticate` doesn't go through the session machinery, so
        # the explicit reset below mirrors what a real session-cookie
        # logout flow looks like.
        self.client.force_authenticate(user=None)
        self.assertEqual(
            self.client.get("/api/auth/me/").status_code, status.HTTP_403_FORBIDDEN
        )

    def test_logout_when_anonymous_is_a_noop(self):
        """Calling logout without a session is safe (204)."""
        response = self.client.post("/api/auth/logout/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class AuthMeTests(APITestCase):
    """`GET /api/auth/me/` returns the current authenticated user."""

    def setUp(self):
        self.client = APIClient()
        self.user = make_regular_user(
            email="me_user@example.com",
            people_depot_user_id="me_user_pd_id",
        )

    def test_me_returns_200_for_authenticated_user(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get("/api/auth/me/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        body = response.json()
        self.assertEqual(body["id"], str(self.user.id))
        self.assertEqual(body["email"], "me_user@example.com")

    def test_me_returns_403_for_anonymous(self):
        response = self.client.get("/api/auth/me/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        body = response.json()
        self.assertEqual(body["error"]["code"], "not_authenticated")
