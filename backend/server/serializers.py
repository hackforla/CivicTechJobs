from django.contrib.auth.models import User
from rest_framework import serializers
from server.models import Opportunity, OpportunityXMeetings, OpportunityXTech


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class OpportunitySerializer(serializers.ModelSerializer):
    meetings = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Opportunity
        fields = "__all__"


class OpportunityXMeetingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunityXMeetings
        fields = "__all__"


class OpportunityXTechSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunityXTech
        fields = "__all__"
