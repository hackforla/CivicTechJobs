from django.contrib.auth.models import User
from rest_framework import generics, permissions, renderers, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from server.models import Opportunity
from server.serializers import OpportunitySerializer, UserSerializer
import time

class OpportunitiesViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class Healthcheck(APIView):
    start_time = time.time()

    def get(self, request):
        uptime_seconds = time.time() - self.start_time
        uptime_hours = uptime_seconds / 3600

        version = 0.1

        return Response({
            "message": "healthcheck",
            "uptime": f"{uptime_hours:.2f} hours",
            # "uptime": f"{uptime_seconds:.1f} seconds",
            "version": version
        })