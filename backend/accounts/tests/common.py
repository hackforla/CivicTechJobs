"""Shared user factory helpers for `accounts` test files.

Each helper saves a `CustomUser` instance with sensible defaults
that callers can override via keyword arguments. Per-test-file
`setUp` methods import only the helpers they need. Domain factories
(CoP, Role, Skill, Project, Opportunity) live in
`ctj_api.tests.common` and are imported separately when a test
spans both apps.
"""

from accounts.models import CustomUser


def make_pm_user(
    *,
    username: str = "pm_user",
    email: str = "pm_user@example.com",
    password: str = "password123",
    people_depot_user_id: str = "pm_user_pd_id",
) -> CustomUser:
    """Create a project-manager user."""
    return CustomUser.objects.create_user(
        username=username,
        email=email,
        password=password,
        people_depot_user_id=people_depot_user_id,
        isProjectManager=True,
    )


def make_regular_user(
    *,
    username: str = "regular_user",
    email: str = "regular_user@example.com",
    password: str = "password123",
    people_depot_user_id: str = "regular_user_pd_id",
) -> CustomUser:
    """Create a non-PM user."""
    return CustomUser.objects.create_user(
        username=username,
        email=email,
        password=password,
        people_depot_user_id=people_depot_user_id,
        isProjectManager=False,
    )
