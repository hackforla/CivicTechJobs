"""DRF views for CTJ's domain endpoints, mounted under `/api/`.

This module hosts the read/write endpoints for the recruitment
catalog: opportunities, projects, roles, the skill catalog, the
community-of-practice taxonomy, and per-user detail. It also
provides the unauthenticated `healthcheck` endpoint and a
JSON-shaped catch-all 404 handler for unknown `/api/*` paths.

Routing for these views lives in `ctj_api.urls` (mounted at
`/api/` from `backend.urls`); permission classes live in
`ctj_api.permissions`. Most read endpoints are public; mutations
are gated per-view by DRF permission classes.
"""

import time

from django.conf import settings
from django.http import JsonResponse
from rest_framework import generics, permissions, viewsets

from ctj_api.models import (
    CommunityOfPractice,
    CustomUser,
    Opportunity,
    Project,
    Role,
    Skill,
)
from ctj_api.permissions import OpportunityPermission, UserDetailPermission
from ctj_api.serializers import (
    CommunityOfPracticeSerializer,
    CustomUserSerializer,
    OpportunitySerializer,
    ProjectSerializer,
    RoleSerializer,
    SkillSerializer,
)

start_time = time.time()


def healthcheck(request):
    """
    Summary:
    - Liveness probe for the Django process.
    - Used by orchestration (Docker health checks, load balancers, the
      Next.js dev rewrite verification flow) to confirm the process is
      alive and reachable.
    - Returns process metadata as JSON: a fixed `message` string, the
      number of hours since the process started (computed from the
      module-level `start_time`), the configured app version, and the
      request's reported hostname.
    - Uptime is measured per-process; a restart resets the counter,
      and multi-worker deployments report different uptimes per worker.
    - No CSRF, no database access.

    Flow:
    1. Compute uptime from the module-level `start_time`.
    2. Read the request's reported hostname.
    3. Return a JSON 200 with metadata.

    URL:
    - GET /api/healthcheck

    Auth:
    - Public

    Errors:
    - (none)
    """
    uptime_seconds = time.time() - start_time
    uptime_hours = uptime_seconds / 3600
    hostname = request.get_host()
    return JsonResponse(
        {
            "message": "healthcheck",
            "uptime": f"{uptime_hours:.2f} hours",
            "version": settings.VERSION,
            "hostname": hostname,
        },
        status=200,
    )


def api_not_found(request, exception=None):
    """
    Summary:
    - Fallback 404 handler for unknown `/api/*` paths.
    - Django's default 404 page returns HTML, which is unhelpful for a
      JSON API. This handler returns a JSON body with a fixed shape so
      frontend code can parse the error consistently.
    - Mounted as the catch-all in `ctj_api.urls` (the `^.*$` regex
      pattern after the router).
    - The `exception` parameter is required by Django's URL-resolver
      error-handler signature but isn't used in the response.

    Flow:
    1. Return a fixed JSON 404 payload.

    URL:
    - ANY /api/<unmatched>

    Auth:
    - Public

    Errors:
    - (none)
    """
    return JsonResponse(
        {
            "error": "API endpoint not found",
            "status_code": 404,
            "message": "The requested API endpoint does not exist",
        },
        status=404,
    )


class UserDetail(generics.RetrieveAPIView):
    """
    Summary:
    - Return a single `CustomUser` record by UUID.
    - Read-only - this view doesn't expose update or delete operations
      on user records.
    - Mutating user data goes through other paths (Django admin,
      future Stage 2 PeopleDepot sync).

    Flow:
    - Standard DRF `RetrieveAPIView` handling; `UserDetailPermission`
      further restricts which records the requester is allowed to see.

    URL:
    - GET /api/users/<uuid:pk>/

    Auth:
    - IsAuthenticated + UserDetailPermission

    Errors:
    - 401: Unauthenticated.
    - 403: `UserDetailPermission` denied (requester not allowed to
      view the target user).
    - 404: No user exists with the given UUID.
    """

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.IsAuthenticated, UserDetailPermission)


class OpportunityViewSet(viewsets.ModelViewSet):
    """
    Summary:
    - Full-CRUD endpoint for the `Opportunity` recruitment catalog.
    - Reads are public; mutations are gated by `OpportunityPermission`
      (in `ctj_api.permissions`): only project managers can create,
      only the creator can update, and any PM can delete.

    Flow:
    - Standard DRF `ModelViewSet` CRUD.
    - On POST, `perform_create` is overridden to stamp `created_by`
      with the requesting user automatically, so the API client
      doesn't supply (and can't override) the field on creation.

    URL:
    - /api/opportunities/

    Methods:
    - GET                   list all opportunities
    - POST                  create a new opportunity
    - GET    <id>/          retrieve one
    - PUT    <id>/          full update
    - PATCH  <id>/          partial update
    - DELETE <id>/          delete

    Auth:
    - IsAuthenticatedOrReadOnly + OpportunityPermission

    Errors:
    - 400: Validation error on create/update (`OpportunitySerializer`
      rejected the payload).
    - 401: Unauthenticated mutation.
    - 403: `OpportunityPermission` denied (e.g. non-PM trying to
      create, non-creator trying to update). Note: PATCH is always
      403'd due to a gap in `OpportunityPermission` (no PATCH branch);
      flagged for fix in `ctj_api.permissions`.
    - 404: No opportunity exists with the given ID.
    """

    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        OpportunityPermission,
    )

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CommunityOfPracticeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Summary:
    - Public read-only listing of the `CommunityOfPractice` taxonomy.
    - The CoP taxonomy is locked to a fixed set of five values (see
      `CommunityOfPractice.PracticeAreas`).
    - Admins edit the table itself through Django admin (`/admin/`),
      not through this API.

    Flow:
    - Standard DRF `ReadOnlyModelViewSet` handling (list and retrieve
      only).

    URL:
    - /api/communityOfPractice/

    Methods:
    - GET           list all CoPs
    - GET <id>/     retrieve one

    Auth:
    - Public

    Errors:
    - 404: No CoP exists with the given ID.
    """

    queryset = CommunityOfPractice.objects.all()
    serializer_class = CommunityOfPracticeSerializer


class RoleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Summary:
    - Public read-only listing of the `Role` table.
    - Admins curate the role list through Django admin (`/admin/`);
      the API itself is read-only.

    Flow:
    - Standard DRF `ReadOnlyModelViewSet` handling (list and retrieve
      only).

    URL:
    - /api/roles/

    Methods:
    - GET           list all roles
    - GET <id>/     retrieve one

    Auth:
    - Public

    Errors:
    - 404: No role exists with the given ID.
    """

    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Summary:
    - Public read-only listing of the `Skill` catalog.
    - Stage 1: admins curate the catalog through Django admin
      (`/admin/`).
    - Stage 2: the catalog source moves to PeopleDepot and this view
      continues to read from the local synced cache.

    Flow:
    - Standard DRF `ReadOnlyModelViewSet` handling (list and retrieve
      only).

    URL:
    - /api/skills/

    Methods:
    - GET           list all skills
    - GET <id>/     retrieve one

    Auth:
    - Public

    Errors:
    - 404: No skill exists with the given ID.
    """

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Summary:
    - Public read-only listing of the `Project` table.
    - Stage 1: admins curate the project list through Django admin
      (`/admin/`).
    - Stage 2: the project source moves to PeopleDepot.

    Flow:
    - Standard DRF `ReadOnlyModelViewSet` handling (list and retrieve
      only).

    URL:
    - /api/projects/

    Methods:
    - GET           list all projects
    - GET <id>/     retrieve one

    Auth:
    - Public

    Errors:
    - 404: No project exists with the given ID.
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
