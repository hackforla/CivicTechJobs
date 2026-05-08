"""DRF views for `accounts` endpoints, mounted under `/api/`.

Hosts the per-user detail endpoint (`/api/users/<uuid>/`). Auth
flow endpoints (signup, login, logout, me, csrf) land in a
follow-up commit.

Routing for these views lives in `accounts.urls`; permission
classes live in `accounts.permissions`; serializers live in
`accounts.serializers`. Follows the view shape convention from
`ctj_api.views`: narrower-than-CRUD endpoints use function-based
views decorated with `@api_view([...])`.
"""

from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from accounts.models import CustomUser
from accounts.permissions import UserDetailPermission
from accounts.serializers import CustomUserReadSerializer


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
