from rest_framework import serializers
from ctj_api.models import Opportunities


class OpportunitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunities
        fields = ["id", "role", "subrole", "project"]
