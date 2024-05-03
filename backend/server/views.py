from django.contrib.auth.models import User
from rest_framework import generics, permissions, renderers, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from server.models import Opportunity
from server.serializers import OpportunitySerializer, UserSerializer, PostSerializer
import time
from django.conf import settings

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

        return Response({
            "message": "healthcheck",
            "uptime": f"{uptime_hours:.2f} hours",
            # "uptime": f"{uptime_seconds:.1f} seconds",
            "version": settings.VERSION
        })
    
class CreatePost(APIView):
    def post(self, request, format=None):
        serializer = PostSerializer(data = request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
