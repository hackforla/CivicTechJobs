import uuid

from django.db import models


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
    class ExperienceLevel(models.TextChoices):
        LEANING = "Learning"
        TRAINED = "Trained"
        EXPERIENCED = "Experienced"
        SUPERVISORY = "Supervisory"

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    experience_level = models.CharField(choices=ExperienceLevel.choices, max_length=11)
    title = models.CharField(max_length=100)
    description = models.TextField()
    poster = models.EmailField(max_length=100)
    hours_per_week = models.PositiveSmallIntegerField()
    num_positions_available = models.PositiveSmallIntegerField()
    posted_date = models.DateField(auto_now_add=True)
    project = models.ForeignKey("Project", on_delete=models.CASCADE)
    role = models.ForeignKey("Role", on_delete=models.CASCADE)
    skills = models.ManyToManyField(Skill, through="OpportunityXSkill", blank=True)

    class Meta:
        db_table = "opportunity"


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
