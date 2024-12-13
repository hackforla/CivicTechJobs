import time

from django.conf import settings
from django.http import JsonResponse
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from ctj_api.models import (
    CustomUser,
    Opportunity,
    CommunityOfPractice,
    Project,
    Role,
    Skill,
)
from ctj_api.permissions import OpportunityPermission, UserDetailPermission
from ctj_api.serializers import (
    CustomUserSerializer,
    OpportunitySerializer,
    CommunityOfPracticeSerializer,
    ProjectSerializer,
    RoleSerializer,
    SkillSerializer,
)


start_time = time.time()


def healthcheck(request):
    uptime_seconds = time.time() - start_time
    uptime_hours = uptime_seconds / 3600
    hostname = request.get_host()
    return JsonResponse(
        {
            "message": "healthcheck",
            "uptime": f"{uptime_hours:.2f} hours",
            # "uptime": f"{uptime_seconds:.1f} seconds",
            "version": settings.VERSION,
            "hostname": hostname,
        },
        status=200,
    )


# Custom error handler for incorrect API routes
def api_not_found(request, exception=None):
    return JsonResponse(
        {
            "error": "API endpoint not found",
            "status_code": 404,
            "message": "The requested API endpoint does not exist",
        },
        status=404,
    )


class UserDetail(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.IsAuthenticated, UserDetailPermission)


class OpportunityViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """

    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        OpportunityPermission,
    )

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CommunityOfPracticeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only admins can modify CoPs data in: civictechjobs.com/admin/
    """

    queryset = CommunityOfPractice.objects.all()
    serializer_class = CommunityOfPracticeSerializer


class RoleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only admins can modify roles data in: civictechjobs.com/admin/
    """

    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only admins can modify skills data in: civictechjobs.com/admin/
    """

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only admins can modify skills data in: civictechjobs.com/admin/
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
