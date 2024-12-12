import time

from django.conf import settings

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from ctj_api.models import Opportunity
from ctj_api.serializers import OpportunitySerializer


class OpportunityList(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer


class OpportunityDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer


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
