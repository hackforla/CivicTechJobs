from rest_framework import generics

from ctj_api.models import Opportunities
from ctj_api.serializers import OpportunitiesSerializer


class OpportunitiesList(generics.ListCreateAPIView):
    queryset = Opportunities.objects.all()
    serializer_class = OpportunitiesSerializer


class OpportunitiesDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunities.objects.all()
    serializer_class = OpportunitiesSerializer
