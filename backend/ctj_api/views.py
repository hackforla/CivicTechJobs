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

View shape convention:
- Full-CRUD resources (>=4 actions of list/create/retrieve/update/
  destroy) use `ModelViewSet` and register on `DefaultRouter` in
  `ctj_api.urls`.
- Anything narrower (single method, list-only, retrieve-only,
  list+retrieve) uses a function-based view decorated with
  `@api_view([...])`, routed explicitly in `ctj_api.urls`.
- Non-resource endpoints (health, fallbacks) use plain Django views.
"""

import time

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

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
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)


class OpportunityViewSet(viewsets.ModelViewSet):
    """
    Summary:
    - Full-CRUD endpoint for the `Opportunity` recruitment catalog.
    - Reads are public; mutations are gated by `OpportunityPermission`
      (in `ctj_api.permissions`): only project managers can create,
      only the creator can update, and any PM can delete.
    - Kept as a `ModelViewSet` per ADR-0010 because the view exposes
      the full CRUD surface; narrower views use FBVs.

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


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def community_of_practice_list(request):
    """
    Summary:
    - Public list of the `CommunityOfPractice` taxonomy.
    - The CoP taxonomy is locked to a fixed set of five values (see
      `CommunityOfPractice.PracticeAreas`).
    - Admins edit the table itself through Django admin (`/admin/`),
      not through this API.

    Flow:
    1. Fetch all `CommunityOfPractice` rows.
    2. Serialize via `CommunityOfPracticeSerializer` and return 200.

    URL:
    - GET /api/communityOfPractice/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - (none)
    """
    cops = CommunityOfPractice.objects.all()
    serializer = CommunityOfPracticeSerializer(cops, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def community_of_practice_detail(request, pk):
    """
    Summary:
    - Public retrieval of a single `CommunityOfPractice` row by UUID.

    Flow:
    1. Look up the row by primary-key UUID.
    2. Serialize via `CommunityOfPracticeSerializer` and return 200.

    URL:
    - GET /api/communityOfPractice/<uuid:pk>/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - 404: No CoP exists with the given UUID.
    """
    cop = get_object_or_404(CommunityOfPractice, pk=pk)
    serializer = CommunityOfPracticeSerializer(cop)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def role_list(request):
    """
    Summary:
    - Public list of the `Role` table.
    - Stage 1: admins curate the role list through Django admin
      (`/admin/`); the API itself is read-only.
    - Stage 2: the role concept is replaced by PeopleDepot UUID
      references on `Opportunity`; this endpoint is retired.

    Flow:
    1. Fetch all `Role` rows.
    2. Serialize via `RoleSerializer` and return 200.

    URL:
    - GET /api/roles/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - (none)
    """
    roles = Role.objects.all()
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def role_detail(request, pk):
    """
    Summary:
    - Public retrieval of a single `Role` row by UUID.

    Flow:
    1. Look up the row by primary-key UUID.
    2. Serialize via `RoleSerializer` and return 200.

    URL:
    - GET /api/roles/<uuid:pk>/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - 404: No role exists with the given UUID.
    """
    role = get_object_or_404(Role, pk=pk)
    serializer = RoleSerializer(role)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def skill_list(request):
    """
    Summary:
    - Public list of the `Skill` catalog.
    - Stage 1: admins curate the catalog through Django admin
      (`/admin/`).
    - Stage 2: the catalog source moves to PeopleDepot and this
      endpoint continues to read from the local synced cache.

    Flow:
    1. Fetch all `Skill` rows.
    2. Serialize via `SkillSerializer` and return 200.

    URL:
    - GET /api/skills/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - (none)
    """
    skills = Skill.objects.all()
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def skill_detail(request, pk):
    """
    Summary:
    - Public retrieval of a single `Skill` row by UUID.

    Flow:
    1. Look up the row by primary-key UUID.
    2. Serialize via `SkillSerializer` and return 200.

    URL:
    - GET /api/skills/<uuid:pk>/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - 404: No skill exists with the given UUID.
    """
    skill = get_object_or_404(Skill, pk=pk)
    serializer = SkillSerializer(skill)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def project_list(request):
    """
    Summary:
    - Public list of the `Project` table.
    - Stage 1: admins curate the project list through Django admin
      (`/admin/`).
    - Stage 2: the project source moves to PeopleDepot.

    Flow:
    1. Fetch all `Project` rows.
    2. Serialize via `ProjectSerializer` and return 200.

    URL:
    - GET /api/projects/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - (none)
    """
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def project_detail(request, pk):
    """
    Summary:
    - Public retrieval of a single `Project` row by UUID.

    Flow:
    1. Look up the row by primary-key UUID.
    2. Serialize via `ProjectSerializer` and return 200.

    URL:
    - GET /api/projects/<uuid:pk>/

    Auth:
    - Public (`AllowAny`).

    Errors:
    - 404: No project exists with the given UUID.
    """
    project = get_object_or_404(Project, pk=pk)
    serializer = ProjectSerializer(project)
    return Response(serializer.data)
