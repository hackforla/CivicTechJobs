from rest_framework import serializers

from ctj_api.models import CommunityOfPractice, Opportunities, Project, Role, Skill


class OpportunitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunities
        fields = ["id", "role", "subrole", "project"]


class CommunityOfPracticeSerializer(serializers.ModelSerializer):
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
            "meeting_times",
            "created_at",
            "updated_at",
        ]
