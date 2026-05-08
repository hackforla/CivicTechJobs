"""Identity model for the CTJ platform.

Defines `CustomUser`, the project's `AUTH_USER_MODEL`. The
domain-table FKs that the user model holds (community of practice,
skills learned matrix) reference models that live in `ctj_api` -
keeping the user record on its own table while still tying it to
the domain taxonomy.

Stage 1 / Stage 2 boundary: `CustomUser` is locally owned in Stage
1 (email + password signup) and reconciles to a PeopleDepot user
record in Stage 2 via `people_depot_user_id`. See the class
docstring for the full lifecycle.
"""

import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from ctj_api.models import CommunityOfPractice, SkillMatrix


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
