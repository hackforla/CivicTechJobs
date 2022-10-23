import uuid

from django.db import models


class ExperienceLevel(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "experience_level"

    def __str__(self):
        return self.name


class Skill(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "skill"

    def __str__(self):
        return self.name


class Role(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "role"

    def __str__(self):
        return self.name


class Project(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField()
    github_url = models.URLField()
    slack_url = models.URLField()
    google_drive_url = models.URLField()
    video_conference_link = models.URLField()
    project_status = models.CharField(max_length=100)

    class Meta:
        db_table = "project"

    def __str__(self):
        return self.name


class Opportunity(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    poster = models.EmailField(max_length=100)
    hours_per_week = models.PositiveSmallIntegerField()
    num_positions_available = models.PositiveSmallIntegerField()
    posted_date = models.DateField(auto_now_add=True)
    experience_level = models.ForeignKey(ExperienceLevel, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    skills = models.ManyToManyField(Skill, blank=True)

    class Meta:
        db_table = "opportunity"

    def __str__(self):
        return self.title


class RecurringEvent(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    hours = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    roles = models.ManyToManyField(Role)

    class Meta:
        db_table = "recurring_event"

    def __str__(self):
        return self.name
