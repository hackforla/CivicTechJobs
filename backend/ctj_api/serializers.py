from rest_framework import serializers
from ctj_api.models import (
    CommunityOfPractice,
    Role,
    Skill,
    Project,
    SkillMatrix,
    CustomUser,
    Opportunity,
)


class CommunityOfPracticeSerializer(serializers.ModelSerializer):
    practice_area = serializers.ChoiceField(
        choices=CommunityOfPractice.PracticeAreas.choices
    )

    class Meta:
        model = CommunityOfPractice
        fields = ["id", "practice_area", "description", "created_at", "updated_at"]


class RoleSerializer(serializers.ModelSerializer):
    community_of_practice = CommunityOfPracticeSerializer(read_only=True)

    class Meta:
        model = Role
        fields = ["id", "title", "community_of_practice", "created_at", "updated_at"]


class SkillSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True, read_only=True)

    class Meta:
        model = Skill
        fields = ["id", "name", "roles", "created_at", "updated_at"]


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


class SkillMatrixSerializer(serializers.ModelSerializer):
    owner_type = serializers.ChoiceField(
        choices=[("user", "User"), ("opportunity", "Opportunity")]
    )

    class Meta:
        model = SkillMatrix
        fields = [
            "id",
            "owner_type",
            "owner_id",
            "skill_matrix",
            "created_at",
            "updated_at",
        ]


class CustomUserSerializer(serializers.ModelSerializer):
    skills_learned_matrix = SkillMatrixSerializer(read_only=True)
    community_of_practice = CommunityOfPracticeSerializer(read_only=True)
    project = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "people_depot_user_id",
            "name",
            "email",
            "max_available_hours",
            "meeting_availability",
            "created_at",
            "updated_at",
        ]


class OpportunitySerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    role = RoleSerializer(read_only=True)
    work_environment = serializers.ChoiceField(
        choices=[("remote", "Remote"), ("hybrid", "Hybrid"), ("in_person", "In Person")]
    )
    skills_required_matrix = SkillMatrixSerializer(read_only=True)
    created_by_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        required=False,
        allow_null=True,
    )
    updated_by_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Opportunity
        fields = [
            "id",
            "project",
            "role",
            "min_experience_required",
            "work_environment",
            "min_hours_required",
            "skills_required_matrix",
            "body",
            "status",
            "created_by_id",
            "updated_by_id",
            "created_at",
            "updated_at",
        ]
