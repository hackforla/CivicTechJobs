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


def _resolve_skill_names(matrix):
    """Resolve a `SkillMatrix` to its sorted list of skill names.

    Skill names are sorted alphabetically so consumer rendering is
    stable. Returns `[]` for a `None` matrix or an empty
    `skill_matrix` dict (the underlying field defaults to `{}`).

    Used by both `OpportunityReadSerializer.get_skill_names`
    (matrix is `skills_required_matrix`) and
    `CustomUserReadSerializer.get_skill_names` (matrix is
    `skills_learned_matrix`).
    """
    if matrix is None:
        return []
    skill_ids = list(matrix.skill_matrix.keys())
    if not skill_ids:
        return []
    return list(
        Skill.objects.filter(id__in=skill_ids)
        .order_by("name")
        .values_list("name", flat=True)
    )


class OpportunityReadSerializer(serializers.ModelSerializer):
    """Read serializer for `Opportunity` records.

    `created_by` is exposed as the creator's email string (via
    `source="created_by.email"`) rather than the underlying UUID FK,
    so list/retrieve responses surface a human-readable identity
    rather than an internal ID.

    `role_title` and `skill_names` are derived display-only fields.
    `role_title` saves the client an extra `/api/roles/<uuid>/` fetch
    just to render the opportunity's role title; `skill_names`
    resolves the `skills_required_matrix` to alphabetically-sorted
    skill names so the card can render them without a SkillMatrix
    fetch + N `Skill` lookups. The underlying `role` (UUID) and
    `skills_required_matrix` (UUID) stay on the wire for clients
    that need the references (matching algorithm, future ratings UI).

    Used by:
    - `OpportunityViewSet.list` (`GET /api/opportunities/`).
    - `OpportunityViewSet.retrieve` (`GET /api/opportunities/<pk>/`).
    """

    created_by = serializers.ReadOnlyField(source="created_by.email")
    role_title = serializers.ReadOnlyField(source="role.title")
    skill_names = serializers.SerializerMethodField()

    class Meta:
        model = Opportunity
        fields = [
            "id",
            "project_name",
            "role",
            "role_title",
            "overview",
            "body",
            "responsibilities",
            "min_experience_required",
            "min_hours_required",
            "work_environment",
            "meeting_times",
            "skills_required_matrix",
            "skill_names",
            "status",
            "created_by",
            "created_at",
            "updated_at",
        ]

    def get_skill_names(self, obj):
        return _resolve_skill_names(obj.skills_required_matrix)


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
