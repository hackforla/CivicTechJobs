"""Domain models for the CTJ platform.

This module defines the seven Django models that back CTJ's core
flows: the practice-area taxonomy (`CommunityOfPractice`, `Role`),
the skill system (`Skill`, `SkillMatrix`), the recruitment catalog
(`Project`, `Opportunity`), and the user / identity model
(`CustomUser`, which is the project's `AUTH_USER_MODEL`).

Stage 1 / Stage 2 boundary: several of these tables are locally
curated in Stage 1 and migrate to PeopleDepot-backed shapes in
Stage 2. See each class's docstring for its specific lifecycle, and
docs/developer/backend.md for the full migration plan.
"""

import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class CommunityOfPractice(models.Model):
    """
    Summary:
    - A practice-area taxonomy entry that groups volunteers and skills.

    Business workflow:
    - HfLA volunteers are organized into Communities of Practice (CoPs)
      that group people by what they do.
    - Each user picks one CoP as their primary practice area during the
      qualifier flow.
    - Roles anchor to CoPs (1:N) and Skills are M:N across CoPs.

    Current policy:
    - Locked to the five values in `PracticeAreas` (Data Science,
      Engineering, DevOps, Project/Product Management, UI/UX).
    - Adding a value requires a code change and a migration; the
      friction is intentional to keep the taxonomy small.

    Lifecycle control:
    - `admin-managed` (edit through Django admin).

    Visibility:
    - `public-read` via `/api/communities-of-practice/`.
    """

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
    """
    Summary:
    - A job-title-shaped position scoped to a single Community of Practice.

    Business workflow:
    - Represents the kind of position someone might fill ("Backend
      Engineer" within Engineering, "Product Designer" within UI/UX).
    - When an Opportunity is posted, it picks a Role and that Role's
      title becomes the title of the opportunity.

    Current policy:
    - Stage 1: local table, admin-managed.
    - Stage 2: replaced by PeopleDepot UUID references on Opportunity;
      this table goes away.

    Lifecycle control:
    - `admin-managed` (Stage 1).

    Visibility:
    - `public-read` via `/api/roles/`.
    """

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
    """
    Summary:
    - A single skill in CTJ's skill catalog (e.g. "Python", "Figma").

    Business workflow:
    - The building block for `SkillMatrix`, which maps skill UUIDs to
      mastery levels (1 through 5).
    - Most skills span practice areas, hence M:N with `CommunityOfPractice`
      ("Python" applies to Engineering and Data Science; "Figma"
      applies to UI/UX and Project Management).

    Current policy:
    - Stage 1: locally curated by admins through Django admin.
    - Stage 2: source of truth moves to PeopleDepot; this table becomes
      a synced cache (kept locally for query performance and resilience
      to PD outages), and admin loses CRUD in favor of read-only
      inspection.

    Lifecycle control:
    - `admin-managed` (Stage 1) -> `pd-synced` (Stage 2).

    Visibility:
    - `public-read` via `/api/skills/`.
    """

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
    """
    Summary:
    - A real-world HfLA project that opportunities are posted under.

    Business workflow:
    - HfLA runs many concurrent civic-tech projects (Tabler, Food
      Oasis, CivicTechJobs itself, etc.); each owns its own
      opportunities and meeting cadence.
    - `people_depot_project_id` is the link to the upstream PeopleDepot
      project record (PD owns project metadata; CTJ stores only what
      it needs locally for the qualifier flow).

    Current policy:
    - Stage 1: local table populated alongside PD.
    - Stage 2: `Opportunity.project` swaps to a PeopleDepot UUID
      reference and this table goes away.

    Lifecycle control:
    - `admin-managed` (Stage 1).

    Visibility:
    - `public-read` via `/api/projects/`.
    """

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
    """
    Summary:
    - A `{skill_uuid: mastery_level}` mapping (mastery is 1 through 5).

    Business workflow:
    - Used in two directions: `CustomUser.skills_learned_matrix` is what
      a user *has* (self-reported during the qualifier flow);
      `Opportunity.skills_required_matrix` is what an opportunity
      *needs* (the required level is a floor - "Python: 3" matches
      users with Python at 3 or higher).
    - The matching algorithm operates on both matrices at once.

    Current policy:
    - Stored as a JSON blob, not a join table. The matching algorithm
      consumes the whole structure at once; per-row queries against a
      separate ratings table would just rebuild the same dict in
      Python. Ratings are also sparse (a user has tens of skills, not
      the whole catalog), so the JSON shape is naturally compact.
    - Skill UUIDs reference the `Skill` catalog (locally curated in
      Stage 1, PD-synced in Stage 2); the matrix shape itself doesn't
      change between stages.

    Lifecycle control:
    - `user-managed` for `skills_learned_matrix`.
    - `creator-managed` for `skills_required_matrix`.

    Visibility:
    - `internal` (no direct API endpoint; accessed via `CustomUser`
      and `Opportunity` records).
    """

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
    """
    Summary:
    - CTJ's user / identity model (the project's `AUTH_USER_MODEL`).

    Business workflow:
    - Created at signup via email + password (Stage 1) or via Cognito
      (Stage 2).
    - Identity reconciles to a PeopleDepot user record in Stage 2 via
      the `people_depot_user_id` field; Stage 1 self-registered users
      carry a `local:<uuid>` placeholder until that reconciliation.
    - `isProjectManager` gates the ability to post opportunities in
      the CMS (see `OpportunityPermission`).

    Current policy:
    - Subclasses Django's `AbstractUser` rather than extending the
      default `User` via a OneToOne profile model. The trade-off is
      that all user-shaped fields - identity, practice area, skills,
      availability - live on a single table; reads are simpler
      (`request.user.name` works directly, no join required), at the
      cost of locking in the choice from day 1.
    - `username` (inherited from `AbstractUser`) is set to the user's
      email at signup time. That's what lets Django's default
      `ModelBackend` resolve `authenticate(username=email,
      password=...)` without writing a custom auth backend. Stage 2
      (Cognito) replaces the password-based auth path entirely, so
      this coupling is temporary.
    - `people_depot_user_id` is unique-not-null; the `local:<uuid>`
      placeholder satisfies the constraint until Stage 2 reconciliation.
      The cleaner long-term fix is making the field nullable; deferred
      to a schema migration.
    - `isProjectManager` is camelCase intentionally; renaming would
      require a schema migration and isn't worth the disruption solo.

    Lifecycle control:
    - `user-managed` (self-registration in Stage 1).

    Visibility:
    - `auth-required` via `/api/users/<uuid>/`; restricted further by
      `UserDetailPermission`.
    """

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
    """
    Summary:
    - An open volunteer position posted under a Project.

    Business workflow:
    - The recruitment-catalog row that the matching algorithm ranks
      against a user's `SkillMatrix`.
    - Belongs to one `Project` (the team it's part of), takes the
      title of one `Role` (the kind of position), declares its
      required skills via a `SkillMatrix` reference, and tracks
      status through a small enum (open / closed / on hold / filled /
      draft).
    - Posted by a project manager; viewable publicly in the catalog.

    Current policy:
    - `created_by` uses `on_delete=SET_NULL`: deleting a user does not
      cascade-delete their posted opportunities. Loss of authorship
      is preferable to losing the public-facing listings.
    - `min_experience_required` is currently a nullable `CharField`,
      which violates Django's "use empty string for missing
      `CharField`" convention (DJ001). The TODO inline is to drop
      `null=True` in a follow-up migration; the `noqa` keeps current
      state lint-clean until then.
    - Stage 2: `project` and `role` swap to PeopleDepot UUID references;
      local `Project` and `Role` tables go away.

    Lifecycle control:
    - `creator-managed` (only the creator can update; any PM can
      delete) - see `OpportunityPermission` in `ctj_api.permissions`.

    Visibility:
    - `public-read` for browsing.
    - `pm-write` for creation; `creator-write` for updates;
      `pm-delete` for deletion.
    """

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
    # TODO: drop null=True (Django convention is "" for missing CharField);
    # requires a migration, deferred to a follow-up PR.
    min_experience_required = models.CharField(  # noqa: DJ001
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

    def __str__(self):
        return f"{self.role.title} @ {self.project.name}"
