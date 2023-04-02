import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class Opportunity(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    project_id = models.IntegerField(unique=True, null=True)  # psudo-foreign_id
    max_commitment = models.IntegerField(null=True)  # hours/wk
    min_commitment = models.IntegerField(null=True)  # hours/wk
    max_duration = models.IntegerField(null=True)  # days
    min_duration = models.IntegerField(null=True)  # days
    positions_available = models.PositiveSmallIntegerField
    description = models.TextField()
    posted_date = models.DateField(auto_now_add=True)
    role_id = models.IntegerField(unique=True, null=True)  # psudo-foreign_id
    experience_id = models.IntegerField(
        unique=True, null=True, verbose_name="Experience Level ID"
    )  # psudo-foreign_id
    is_remote = models.BooleanField(null=True)
    is_active = models.BooleanField(null=True)

    class Meta:
        db_table = "opportunity"


class OpportunityXMeetings(models.Model):
    class MeetingType(models.IntegerChoices):
        NOT_ATTEND = 0, _("Not Attend")
        COULD_ATTEND = 1, _("Could Attend")
        SHOULD_ATTEND = 2, _("Should Attend")

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    opportunity_id = models.ForeignKey("Opportunity", on_delete=models.CASCADE)
    meeting_id = models.IntegerField(unique=True)  # psudo-foreign_id
    meeting_type = models.PositiveSmallIntegerField(choices=MeetingType.choices)


class OpportunityXTech(models.Model):
    class TechType(models.IntegerChoices):
        PREFERRED = 0, _("Preferred")
        REQUIRED = 1, _("Required")

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    opportunity_id = models.ForeignKey("Opportunity", on_delete=models.CASCADE)
    tech_type = models.PositiveSmallIntegerField(choices=TechType.choices)
