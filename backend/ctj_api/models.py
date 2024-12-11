import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class CommunityOfPractice(models.Model):

    class PracticeAreas(models.TextChoices):
        DATA_SCIENCE = "data_science", "Data Science"
        ENGINEERING = "engineering", "Engineering"
        OPS = "ops", "Ops"
        PROJECT_MANAGEMENT = "project_management", "Project/Product Management"
        UI_UX = "ui_ux", "UI/UX"

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
    name = models.CharField(max_length=50)
    roles = models.ManyToManyField("Role", related_name="skills")
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


class SkillMatrix(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner_type = models.CharField(
        max_length=20,
        choices=[
            ("user", "User"),
            ("opportunity", "Opportunity"),
        ],
        help_text="Type of the owner is either user or opportunity.",
    )
    owner_id = models.UUIDField(help_text="ID of the related user or opportunity.")
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
        return f"Skill matrix for {self.owner_type} (ID: {self.owner_id})"


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    people_depot_user_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # AbstractUser already includes password field with methods like set_password and check_password
    skills_learned_matrix = models.OneToOneField(
        "SkillMatrix",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="user",
    )
    community_of_practice = models.ForeignKey(
        CommunityOfPractice,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="user",
    )
    max_available_hours = models.IntegerField(
        null=True, blank=True, help_text="User's available hours per week."
    )
    meeting_availability = models.JSONField(null=True, blank=True)
    project = models.ManyToManyField("Project", related_name="users")

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
        Role, on_delete=models.CASCADE, related_name="opportunities"
    )
    min_experience_required = models.CharField(max_length=50)
    work_environment = models.CharField(
        max_length=20,
        choices=[
            ("remote", "Remote"),
            ("hybrid", "Hybrid"),
            ("in_person", "In Person"),
        ],
    )
    min_hours_required = models.IntegerField()
    skills_learned_matrix = models.OneToOneField(
        "SkillMatrix",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="opportunity",
    )
    description = models.TextField()
    status = models.CharField(max_length=20)
    created_by_id = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_opportunities",
    )
    updated_by_id = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="updated_opportunities",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "opportunities"
        verbose_name = "Opportunity"
        verbose_name_plural = "Opportunities"
