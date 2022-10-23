from rest_framework import generics

from server.models import (
    ExperienceLevel,
    Opportunity,
    Project,
    RecurringEvent,
    Role,
    Skill,
)
from server.serializers import (
    ExperienceLevelSerializer,
    OpportunitySerializer,
    ProjectSerializer,
    RecurringEventSerializer,
    RoleSerializer,
    SkillSerializer,
)


class ExperienceLevelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExperienceLevel.objects.all()
    serializer_class = ExperienceLevelSerializer


class ExperienceLevelList(generics.ListCreateAPIView):
    queryset = ExperienceLevel.objects.all()
    serializer_class = ExperienceLevelSerializer


class OpportunityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer


class OpportunityList(generics.ListCreateAPIView):
    serializer_class = OpportunitySerializer
    queryset = Opportunity.objects.all()


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectList(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class RecurringEventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RecurringEvent.objects.all()
    serializer_class = RecurringEventSerializer


class RecurringEventList(generics.ListCreateAPIView):
    queryset = RecurringEvent.objects.all()
    serializer_class = RecurringEventSerializer


class RoleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class RoleList(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class SkillDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class SkillList(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
