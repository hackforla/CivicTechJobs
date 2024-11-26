import uuid

from django.db import models
from django.utils import timezone


class Opportunities(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=255, default="default-role")
    subrole = models.CharField(max_length=255, default="default-subrole")
    project = models.CharField(max_length=255, default="default-project")
    meetings_times = models.JSONField(default=list)
    difficulty_level = models.IntegerField(default=0)
    details = models.JSONField(default=dict)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    updated_by = models.CharField(max_length=255)

    class Meta:
        db_table = "opportunities"


class CommunityOfPractice(models.Model):

    class PracticeAreas(models.TextChoices):
        DATA_SCIENCE = 'data_science', 'Data Science'
        ENGINEERING = 'engineering', 'Engineering'
        OPS = 'ops', 'Ops'
        PROJECT_MANAGEMENT = 'project_management', 'Project/Product Management'
        UI_UX = 'ui_ux', 'UI/UX'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    practice_area = models.CharField(max_length=50, choices=PracticeAreas.choices)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "community_of_practice"
        verbose_name = "Community of Practice"
        verbose_name_plural = "Communities of Practice"

    def __str__(self):
        return f"{self.get_practice_area_display()}"


class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50)
    community_of_practice = models.ForeignKey(CommunityOfPractice, on_delete=models.CASCADE,  related_name="roles")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "roles"
    
    def __str__(self):
        return f"{self.title} ({self.community_of_practice.get_practice_area_display()})"


class Skill(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    roles = models.ManyToManyField('Role', related_name='skills')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "skills"

    def __str__(self):
        return self.name


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    people_depot_project_id = models.CharField(max_length=255)
    name = models.CharField(max_length=50)
    meeting_times = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "projects"

    def __str__(self):
        return self.name
