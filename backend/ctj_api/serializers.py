"""DRF serializers for CTJ's domain models, consumed by the views in `ctj_api.views`.

Serializer shape convention:
- Each resource has a `XxxReadSerializer` for response shape and a
  `XxxWriteSerializer` for request shape, when both are needed.
- Read-only resources only have a Read serializer; a Write serializer
  is added when a write endpoint is added.
- Auto-managed fields (`id`, `created_at`, `updated_at`) and
  request-stamped fields (e.g. `created_by`) are *absent* from
  `XxxWriteSerializer.Meta.fields` rather than included with
  `read_only=True`. Absence is the contract.

See `docs/developer/backend.md` (`Serializer shape` section) for
the full rule and rationale.
"""

from rest_framework import serializers

from ctj_api.models import (
    CommunityOfPractice,
    CustomUser,
    Opportunity,
    Project,
    Role,
    Skill,
    SkillMatrix,
)


class CustomUserReadSerializer(serializers.ModelSerializer):
    """Read serializer for `CustomUser` records.

    Note: the `opportunities` field is broken - it declares a writable
    `PrimaryKeyRelatedField(many=True)` but `CustomUser` has no
    `opportunities` attribute (the actual reverse relation from
    `Opportunity.created_by` is named `created_opportunities`).
    Reads would fail with `AttributeError`; writes would fail
    attempting to set `instance.opportunities`. Currently masked
    because no exercised code path hits it. The right fix is to drop
    the field entirely - deferred out of this shape-only PR. See
    `archive/feat-auth-stage1` for a worked example of the removal.

    Used by:
    - `user_detail` FBV (`GET /api/users/<uuid>/`).
    """

    opportunities = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Opportunity.objects.all()
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "people_depot_user_id",
            "name",
            "email",
            "community_of_practice",
            "skills_learned_matrix",
            "max_available_hours",
            "meeting_availability",
            "isProjectManager",
            "opportunities",
            "created_at",
            "updated_at",
        ]


class OpportunityReadSerializer(serializers.ModelSerializer):
    """Read serializer for `Opportunity` records.

    `created_by` is exposed as the creator's email string (via
    `source="created_by.email"`) rather than the underlying UUID FK,
    so list/retrieve responses surface a human-readable identity
    rather than an internal ID.

    Used by:
    - `OpportunityViewSet.list` (`GET /api/opportunities/`).
    - `OpportunityViewSet.retrieve` (`GET /api/opportunities/<pk>/`).
    """

    created_by = serializers.ReadOnlyField(source="created_by.email")

    class Meta:
        model = Opportunity
        fields = [
            "id",
            "project",
            "role",
            "body",
            "min_experience_required",
            "min_hours_required",
            "work_environment",
            "skills_required_matrix",
            "status",
            "created_by",
            "created_at",
            "updated_at",
        ]


class OpportunityWriteSerializer(serializers.ModelSerializer):
    """Write serializer for `Opportunity` records.

    Fields absent from `Meta.fields` are the contract for "client
    cannot supply this on write":
    - `id`, `created_at`, `updated_at`: auto-managed by Django.
    - `created_by`: stamped by `OpportunityViewSet.perform_create`
      from `request.user`; clients cannot supply or override it.

    Used by:
    - `OpportunityViewSet.create` (`POST /api/opportunities/`).
    - `OpportunityViewSet.update` / `partial_update`
      (`PUT/PATCH /api/opportunities/<pk>/`). Note: PATCH is currently
      403'd by `OpportunityPermission` (no PATCH branch); flagged for
      fix in `ctj_api.permissions`.
    """

    class Meta:
        model = Opportunity
        fields = [
            "project",
            "role",
            "body",
            "min_experience_required",
            "min_hours_required",
            "work_environment",
            "skills_required_matrix",
            "status",
        ]


class SkillMatrixSerializer(serializers.ModelSerializer):
    """Read/write serializer for `SkillMatrix` records.

    Note: defined but never imported. Not split into Read/Write
    because the class is currently dead code.
    The cleanup PR drops it. If `SkillMatrix` becomes API-exposed
    later, replace this with `SkillMatrixReadSerializer` (and
    `SkillMatrixWriteSerializer` if a write endpoint is added).
    Deferred out of this shape-only PR.

    Used by:
    - (none currently).
    """

    class Meta:
        model = SkillMatrix
        fields = [
            "id",
            "skill_matrix",
            "created_at",
            "updated_at",
        ]


class CommunityOfPracticeReadSerializer(serializers.ModelSerializer):
    """Read serializer for `CommunityOfPractice` records.

    Used by:
    - `community_of_practice_list` FBV (`GET /api/communityOfPractice/`).
    - `community_of_practice_detail` FBV
      (`GET /api/communityOfPractice/<uuid:pk>/`).
    """

    class Meta:
        model = CommunityOfPractice
        fields = [
            "id",
            "practice_area",
            "description",
            "created_at",
            "updated_at",
        ]


class RoleReadSerializer(serializers.ModelSerializer):
    """Read serializer for `Role` records.

    Used by:
    - `role_list` FBV (`GET /api/roles/`).
    - `role_detail` FBV (`GET /api/roles/<uuid:pk>/`).
    """

    class Meta:
        model = Role
        fields = ["id", "title", "community_of_practice", "created_at", "updated_at"]


class SkillReadSerializer(serializers.ModelSerializer):
    """Read serializer for `Skill` records.

    Used by:
    - `skill_list` FBV (`GET /api/skills/`).
    - `skill_detail` FBV (`GET /api/skills/<uuid:pk>/`).
    """

    class Meta:
        model = Skill
        fields = ["id", "name", "communities_of_practice", "created_at", "updated_at"]


class ProjectReadSerializer(serializers.ModelSerializer):
    """Read serializer for `Project` records.

    Used by:
    - `project_list` FBV (`GET /api/projects/`).
    - `project_detail` FBV (`GET /api/projects/<uuid:pk>/`).
    """

    class Meta:
        model = Project
        fields = [
            "id",
            "people_depot_project_id",
            "name",
            "meeting_times",
            "created_at",
            "updated_at",
        ]
