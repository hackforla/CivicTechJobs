import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class Skill(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    name = models.SlugField(max_length=100)

    class Meta:
        db_table = "skill"

    def __str__(self):
        return self.name


class Role(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    name = models.SlugField(max_length=100)

    class Meta:
        db_table = "role"

    def __str__(self):
        return self.name


class Opportunity(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    project_id = models.IntegerField(unique=True)  # psudo-foreign_id
    max_commitment = models.IntegerField()  # hours/wk
    min_commitment = models.IntegerField()  # hours/wk
    max_duration = models.IntegerField()  # days
    min_duration = models.IntegerField()  # days
    positions_available = models.PositiveSmallIntegerField
    description = models.TextField()
    posted_date = models.DateField(auto_now_add=True)
    role_id = models.IntegerField(unique=True)  # psudo-foreign_id
    experience_level_id = models.IntegerField(unique=True)  # psudo-foreign_id
    is_remote = models.BooleanField()
    is_active = models.BooleanField()

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


class Project(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    name = models.SlugField(max_length=100)
    description = models.TextField()

    class Meta:
        db_table = "project"

    def __str__(self):
        return self.name


class RecurringEvent(models.Model):
    class DaysOfWeek(models.TextChoices):
        SUNDAY = "Sunday"
        MONDAY = "Monday"
        TUESDAY = "Tuesday"
        WEDNESDAY = "Wednesday"
        THURSDAY = "Thursday"
        FRIDAY = "Friday"
        SATURDAY = "Saturday"

    id = models.CharField(primary_key=True, max_length=100)
    name = models.SlugField(max_length=100)
    day_of_week = models.CharField(choices=DaysOfWeek.choices, max_length=9)
    start_time = models.TimeField()
    duration_in_minutes = models.PositiveSmallIntegerField()
    project = models.ForeignKey(
        "Project", related_name="recurring_events", on_delete=models.CASCADE
    )
    roles = models.ManyToManyField(Role, through="RoleXRecurringEvent", blank=True)

    class Meta:
        db_table = "recurring_event"


class RoleXRecurringEvent(models.Model):
    recurring_event = models.ForeignKey(RecurringEvent, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    class Meta:
        db_table = "role__recurring_event"
        unique_together = ("role", "recurring_event")


class OpportunityXSkill(models.Model):
    opportunity = models.ForeignKey(
        Opportunity, related_name="opp_to_skill", on_delete=models.CASCADE
    )
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    is_required = models.BooleanField(blank=True, null=True)

    class Meta:
        db_table = "opportunity__skill"
        unique_together = ("opportunity", "skill")
