import time

from django.conf import settings
from django.http import JsonResponse
from rest_framework import renderers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from ctj_api.models import CommunityOfPractice, Opportunity, Project, Role, Skill
from ctj_api.serializers import (
    CommunityOfPracticeSerializer,
    OpportunitySerializer,
    ProjectSerializer,
    RoleSerializer,
    SkillSerializer,
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


class Healthcheck(APIView):
    start_time = time.time()

    def get(self, request):
        uptime_seconds = time.time() - self.start_time
        uptime_hours = uptime_seconds / 3600
        hostname = request.get_host()

        return Response(
            {
                "message": "healthcheck",
                "uptime": f"{uptime_hours:.2f} hours",
                # "uptime": f"{uptime_seconds:.1f} seconds",
                "version": settings.VERSION,
                "hostname": hostname,
            }
        )


# TODO: Add permissions classes to make sure only project PMs can CRUD opportunities
class OpportunityViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """

    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def highlight(self, request, *args, **kwargs):
        opportunity = self.get_object()
        return Response(opportunity.highlighted)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommunityOfPracticeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    Only admins can modify CoPs data in: civictechjobs.com/admin/
    """

    queryset = CommunityOfPractice.objects.all()
    serializer_class = CommunityOfPracticeSerializer


class RoleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    Only admins can modify roles data in: civictechjobs.com/admin/
    """

    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    Only admins can modify skills data in: civictechjobs.com/admin/
    """

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    Only admins can modify skills data in: civictechjobs.com/admin/
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
