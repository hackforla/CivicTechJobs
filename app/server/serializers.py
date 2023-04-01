from rest_framework import serializers
from server.models import (
    Opportunity,
    OpportunityXSkill,
    Project,
    RecurringEvent,
    Role,
    Skill,
)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"

    def __str__(self):
        return self.name  # pylint: disable=E1101


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class RecurringEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecurringEvent
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    recurring_events = RecurringEventSerializer(many=True)

    class Meta:
        model = Project
        fields = ["id", "name", "description", "recurring_events"]

    def to_representation(self, instance):
        response = super().to_representation(instance)

        # grab list of roles and build mapping from id to name
        roles_dict = {}
        roles = Role.objects.all()
        if len(roles) > 0:
            for role in roles:
                roles_dict[role.id] = role.name

        # get skill response and remove project attr, and retrieve role name from id
        recurring_events = response["recurring_events"]
        for event in recurring_events:
            event.pop("id")
            event.pop("project")
            event_roles = event["roles"]
            new_event_roles = []
            for role_id in event_roles:
                role = {"id": role_id, "name": roles_dict[role_id]}
                new_event_roles.append(role)
            event["roles"] = new_event_roles
        response["recurring_events"] = recurring_events

        return response


class OpportunityXSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunityXSkill
        fields = "__all__"


class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = "__all__"

    skills = OpportunityXSkillSerializer(
        source="opp_to_skill", many=True, required=False
    )

    def to_representation(self, instance):
        response = super().to_representation(instance)

        project = ProjectSerializer(instance.project).data
        response["project"] = project

        role = RoleSerializer(instance.role).data
        role_response = {"id": role["id"], "name": role["name"]}
        response["role"] = role_response

        # grab list of skills and build mapping from id to name
        skill_dict = {}
        skill_names = list(instance.skills.all().values())
        if len(skill_names) > 0:
            for skill in skill_names:
                # id = "%s" % skill["id"]
                skill_dict[skill["id"]] = skill["name"]

        # get skills response, remove opportunity attr, and retrieve skill name from id
        skills = response["skills"]
        if len(skills) > 0:
            for skill_res in skills:
                skill_res.pop("opportunity")
                skill_id = skill_res.pop("skill")
                skill_res["id"] = skill_id
                skill_res["name"] = skill_dict[skill_id]
        response["skills"] = skills
        return response
