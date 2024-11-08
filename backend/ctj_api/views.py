import time

from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from ctj_api.models import Opportunities
from ctj_api.serializers import OpportunitiesSerializer


class OpportunitiesList(generics.ListCreateAPIView):
    queryset = Opportunities.objects.all()
    serializer_class = OpportunitiesSerializer


class OpportunitiesDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunities.objects.all()
    serializer_class = OpportunitiesSerializer


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
