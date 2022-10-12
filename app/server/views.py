from rest_framework import generics

from server.models import Opportunity
from server.serializers import OpportunitySerializer


class OpportunityList(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
