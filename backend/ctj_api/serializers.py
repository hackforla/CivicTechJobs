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
    created_by = serializers.ReadOnlyField(source="created_by_id.email")

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
    class Meta:
        model = SkillMatrix
        fields = [
            "id",
            "skill_matrix",
            "created_at",
            "updated_at",
        ]


class CommunityOfPracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityOfPractice
        fields = [
            "id",
            "practice_area",
            "description",
            "roles",
            "created_at",
            "updated_at",
        ]


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "title", "skills", "created_at", "updated_at"]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "created_at", "updated_at"]


class ProjectSerializer(serializers.ModelSerializer):
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
