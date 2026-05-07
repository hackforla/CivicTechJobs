"""DRF serializers for CTJ's domain models, consumed by the views in `ctj_api.views`."""

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


class CustomUserSerializer(serializers.ModelSerializer):
    """Read serializer for `CustomUser` records.

    Note: the `opportunities` field is broken - it declares a writable
    `PrimaryKeyRelatedField(many=True)` but `CustomUser` has no
    `opportunities` attribute (the actual reverse relation from
    `Opportunity.created_by` is named `created_opportunities`).
    Reads would fail with `AttributeError`; writes would fail
    attempting to set `instance.opportunities`. Currently masked
    because no exercised code path hits it. The right fix is to drop
    the field entirely - deferred out of this docs-only PR. See
    `archive/feat-auth-stage1` for a worked example of the removal.

    Used by:
    - `UserDetail` (`GET /api/users/<uuid>/`).
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


class OpportunitySerializer(serializers.ModelSerializer):
    """Read/write serializer for `Opportunity` records.

    `created_by` is exposed as a read-only string (the creator's email
    via `source="created_by.email"`) rather than as the underlying
    UUID FK. Clients cannot supply or override the field on create or
    update; `OpportunityViewSet.perform_create` stamps it from
    `request.user` automatically.

    Used by:
    - `OpportunityViewSet` (`/api/opportunities/`).
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


class SkillMatrixSerializer(serializers.ModelSerializer):
    """Read/write serializer for `SkillMatrix` records.

    Note: defined but never imported. `SkillMatrix` instances are
    currently surfaced indirectly via `CustomUser.skills_learned_matrix`
    and `Opportunity.skills_required_matrix` (each exposes the FK as
    a UUID through DRF's default PK-related behavior on the parent
    serializer). This serializer is dead code today; either wire it
    up to a dedicated endpoint when one is needed, or remove it.
    Deferred out of this docs-only PR.

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


class CommunityOfPracticeSerializer(serializers.ModelSerializer):
    """Read serializer for `CommunityOfPractice` records.

    Used by:
    - `CommunityOfPracticeViewSet` (`/api/communityOfPractice/`).
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


class RoleSerializer(serializers.ModelSerializer):
    """Read serializer for `Role` records.

    Used by:
    - `RoleViewSet` (`/api/roles/`).
    """

    class Meta:
        model = Role
        fields = ["id", "title", "community_of_practice", "created_at", "updated_at"]


class SkillSerializer(serializers.ModelSerializer):
    """Read serializer for `Skill` records.

    Used by:
    - `SkillViewSet` (`/api/skills/`).
    """

    class Meta:
        model = Skill
        fields = ["id", "name", "communities_of_practice", "created_at", "updated_at"]


class ProjectSerializer(serializers.ModelSerializer):
    """Read serializer for `Project` records.

    Used by:
    - `ProjectViewSet` (`/api/projects/`).
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
