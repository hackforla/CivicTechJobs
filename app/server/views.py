from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from server.models import Opportunity
from server.serializers import OpportunitySerializer


class OpportunityList(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer


class Healthcheck(APIView):
    def get(self, request):
        return Response({"message": "healthcheck"})
