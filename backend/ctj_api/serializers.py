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
    Opportunity,
    Role,
    Skill,
)


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
            "project_name",
            "role",
            "overview",
            "body",
            "responsibilities",
            "min_experience_required",
            "min_hours_required",
            "work_environment",
            "meeting_times",
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
      (`PUT/PATCH /api/opportunities/<pk>/`).
    """

    class Meta:
        model = Opportunity
        fields = [
            "project_name",
            "role",
            "overview",
            "body",
            "responsibilities",
            "min_experience_required",
            "min_hours_required",
            "work_environment",
            "meeting_times",
            "skills_required_matrix",
            "status",
        ]


class CommunityOfPracticeReadSerializer(serializers.ModelSerializer):
    """Read serializer for `CommunityOfPractice` records.

    Used by:
    - `community_of_practice_list` FBV (`GET /api/communities-of-practice/`).
    - `community_of_practice_detail` FBV
      (`GET /api/communities-of-practice/<uuid:pk>/`).
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
        fields = [
            "id",
            "title",
            "community_of_practice",
            "created_at",
            "updated_at",
        ]


class SkillReadSerializer(serializers.ModelSerializer):
    """Read serializer for `Skill` records.

    Used by:
    - `skill_list` FBV (`GET /api/skills/`).
    - `skill_detail` FBV (`GET /api/skills/<uuid:pk>/`).
    """

    class Meta:
        model = Skill
        fields = ["id", "name", "communities_of_practice", "created_at", "updated_at"]
