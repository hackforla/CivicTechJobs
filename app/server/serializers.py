from rest_framework import serializers

from server.models import (
    ExperienceLevel,
    Opportunity,
    Project,
    RecurringEvent,
    Role,
    Skill,
)


class ExperienceLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceLevel
        fields = "__all__"


class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)

        experience_level = ExperienceLevelSerializer(instance.experience_level).data
        response["experience_level"] = experience_level

        project = ProjectSerializer(instance.project).data
        response["project"] = project

        role = RoleSerializer(instance.role).data
        response["role"] = role

        response["skills"] = []
        for skill in (instance.skills).all():
            response["skills"].append(SkillSerializer(skill).data)

        return response


class RecurringEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecurringEvent
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)

        response["recurring_events"] = []
        for event in RecurringEvent.objects.filter(project=instance.pk):
            response["recurring_events"].append(RecurringEventSerializer(event).data)

        return response


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"
