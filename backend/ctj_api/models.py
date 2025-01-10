import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class CommunityOfPractice(models.Model):

    class PracticeAreas(models.TextChoices):
        DATA_SCIENCE = "data_science", "Data Science"
        ENGINEERING = "engineering", "Engineering"
        DEVOPS = "devops", "DevOps"
        PROJECT_MANAGEMENT = "project_management", "Project/Product Management"
        UI_UX = "ui_ux", "UI/UX"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    practice_area = models.CharField(
        max_length=50, choices=PracticeAreas.choices, unique=True
    )
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
    community_of_practice = models.ForeignKey(
        CommunityOfPractice, on_delete=models.CASCADE, related_name="roles"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "roles"

    def __str__(self):
        return (
            f"{self.title} ({self.community_of_practice.get_practice_area_display()})"
        )


class Skill(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)
    communities_of_practice = models.ManyToManyField(
        CommunityOfPractice, related_name="skills"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "skills"

    def __str__(self):
        return self.name


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    people_depot_project_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=50)
    meeting_times = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "projects"

    def __str__(self):
        return self.name


class SkillMatrix(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    skill_matrix = models.JSONField(
        default=dict,  # {skill_id: rating (integer 1-5)}
        help_text="Skill matrix mapping Skill id to a mastery level (1-5).",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "skill_matrices"
        verbose_name = "Skill Matrix"
        verbose_name_plural = "Skill Matrices"

    def __str__(self):
        return f"Skill matrix ID: {self.id}"


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    people_depot_user_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    community_of_practice = models.ForeignKey(
        CommunityOfPractice,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="user",
    )
    skills_learned_matrix = models.OneToOneField(
        SkillMatrix,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="user",
        help_text="User's list of skills mapped to a mastery level (1-5).",
    )
    max_available_hours = models.IntegerField(
        null=True, blank=True, help_text="User's available hours per week."
    )
    meeting_availability = models.JSONField(null=True, blank=True)
    isProjectManager = models.BooleanField(
        default=False,
        help_text="A user that is a PM can create and edit opportunities in the CMS.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "users"
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.name


class Opportunity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="opportunities"
    )
    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        related_name="opportunities",
        help_text="Role.title will be the title of the opportunity.",
    )
    body = models.TextField(help_text="A description of the opportunity.")
    min_experience_required = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        help_text="min_experience_required: junior, senior, mid-level, etc.",
    )
    min_hours_required = models.IntegerField(
        help_text="Minimum hours required per week."
    )
    work_environment = models.CharField(
        max_length=20,
        choices=[
            ("remote", "Remote"),
            ("hybrid", "Hybrid"),
            ("in_person", "In Person"),
        ],
    )
    skills_required_matrix = models.OneToOneField(
        SkillMatrix,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="opportunity",
        help_text="A list of required skills mapped to desired skill level (1-5).",
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ("open", "Open"),
            ("closed", "Closed"),
            ("on hold", "On hold"),
            ("filled", "Filled"),
            ("draft", "Draft"),
        ],
        help_text="Status will determine how the opportunity will be shown publicly.",
    )
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_opportunities",
        help_text="For now, only the creator can make changes to the opportunity.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "opportunities"
        verbose_name = "Opportunity"
        verbose_name_plural = "Opportunities"
