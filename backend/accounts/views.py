"""DRF views for `accounts` endpoints, mounted under `/api/`.

Hosts the per-user detail endpoint (`/api/users/<uuid>/`) and the
Stage 1 auth flow under `/api/auth/`:

- `csrf/`   GET   set the `csrftoken` cookie (frontend reads it
                  back from `document.cookie` and sends it as the
                  `X-CSRFToken` header on subsequent mutations).
- `signup/` POST  create a user + auto-login + return user record.
- `login/`  POST  validate credentials + create session.
- `logout/` POST  clear session.
- `me/`     GET   return the current authenticated user.

Routing for these views lives in `accounts.urls`; permission
classes live in `accounts.permissions`; serializers live in
`accounts.serializers`. Follows the view shape convention from
`ctj_api.views`: narrower-than-CRUD endpoints use function-based
views decorated with `@api_view([...])`.
"""

from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from accounts.models import CustomUser
from accounts.permissions import UserDetailPermission
from accounts.serializers import (
    CustomUserReadSerializer,
    LoginSerializer,
    RegisterSerializer,
)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated, UserDetailPermission])
def user_detail(request, pk):
    """
    Summary:
    - Return a single `CustomUser` record by UUID.
    - Read-only - this view doesn't expose update or delete operations
      on user records.
    - Mutating user data goes through other paths (Django admin,
      future Stage 2 PeopleDepot sync).

    Flow:
    1. Look up the `CustomUser` by primary-key UUID.
    2. Trigger the object-level permission check (own-profile-only).
    3. Serialize and return 200.

    URL:
    - GET /api/users/<uuid:pk>/

    Auth:
    - IsAuthenticated + UserDetailPermission

    Errors:
    - 403: Unauthenticated, OR `UserDetailPermission` denied
      (requester is not the target user).
    - 404: No user exists with the given UUID.
    """
    user = get_object_or_404(CustomUser, pk=pk)
    # @permission_classes covers request-level (`has_permission`); the
    # object-level (`has_object_permission`) check has to be triggered
    # explicitly in FBVs since there's no APIView class to auto-call it.
    request.parser_context["view"].check_object_permissions(request, user)
    serializer = CustomUserReadSerializer(user)
    return Response(serializer.data)


@ensure_csrf_cookie
@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def auth_csrf(request):
    """
    Summary:
    - Set the `csrftoken` cookie on the response.
    - The SPA calls this once on app load. The browser stores the
      cookie; subsequent mutating requests (signup, login, logout,
      etc.) read the cookie value back and send it as the
      `X-CSRFToken` header so DRF's `SessionAuthentication` CSRF
      check passes.
    - `@ensure_csrf_cookie` is the Django decorator that forces the
      cookie to be set even if the view doesn't otherwise touch CSRF
      state.

    Flow:
    1. Return 204 No Content; the cookie is set as a side effect of
       `@ensure_csrf_cookie`.

    URL:
    - GET /api/auth/csrf/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - (none)
    """
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def auth_signup(request):
    """
    Summary:
    - Create a new `CustomUser` from email + password + name.
    - Auto-login on success (the response includes the new session
      cookie). The frontend can navigate to a logged-in state without
      a follow-up `/login/` round-trip.

    Flow:
    1. Validate via `RegisterSerializer` (uniqueness, password
       strength).
    2. Create the user (the serializer's `create()` handles
       `set_password`, the `username = email` mapping, and the
       `people_depot_user_id = local:<uuid>` placeholder).
    3. Call `django.contrib.auth.login(request, user)` to create the
       session.
    4. Return 201 with the user serialized via
       `CustomUserReadSerializer`.

    URL:
    - POST /api/auth/signup/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - 400: Validation error (missing fields, bad email format,
      duplicate email, password fails Django's validators).
    """
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    login(request, user)
    return Response(CustomUserReadSerializer(user).data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def auth_login(request):
    """
    Summary:
    - Validate credentials and create a session cookie.

    Flow:
    1. Validate via `LoginSerializer`, which calls `authenticate()`
       and stashes the resolved `user` on `validated_data`.
    2. `django.contrib.auth.login(request, user)` rotates / sets the
       session.
    3. Return 200 with the user serialized via
       `CustomUserReadSerializer`.

    URL:
    - POST /api/auth/login/

    Auth:
    - Public (`AllowAny`); the credential check is the gate.

    Errors:
    - 400: Validation error (missing fields, bad email format, OR
      bad credentials - intentionally collapsed to a 400 instead of
      401 to keep the error envelope consistent with the rest of the
      DRF validation flow).
    """
    serializer = LoginSerializer(data=request.data, context={"request": request})
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data["user"]
    login(request, user)
    return Response(CustomUserReadSerializer(user).data)


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def auth_logout(request):
    """
    Summary:
    - Clear the session cookie.
    - Idempotent: calling logout when not logged in is a no-op
      (Django's `logout()` clears whatever session state exists,
      including none).

    Flow:
    1. Call `django.contrib.auth.logout(request)`.
    2. Return 204 No Content.

    URL:
    - POST /api/auth/logout/

    Auth:
    - Public (`AllowAny`); the operation is safe regardless of auth
      state.

    Errors:
    - (none)
    """
    logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def auth_me(request):
    """
    Summary:
    - Return the currently authenticated user.
    - The frontend's `AuthContext` calls this on mount to hydrate
      logged-in state from a persisted session cookie.

    Flow:
    1. `request.user` is set by DRF auth.
    2. Serialize via `CustomUserReadSerializer` and return 200.

    URL:
    - GET /api/auth/me/

    Auth:
    - IsAuthenticated.

    Errors:
    - 403: Unauthenticated (DRF's session auth + envelope).
    """
    return Response(CustomUserReadSerializer(request.user).data)
