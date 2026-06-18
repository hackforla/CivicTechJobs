"""Shared factory helpers for `ctj_api` test files.

Each helper saves a domain-model instance with sensible defaults that
callers can override via keyword arguments. The helpers do not return
shared state - each call creates a new row. Callers wire factories
together explicitly when they need relationships (e.g. an `Opportunity`
needs a `Role` and a `created_by` user; the test's `setUp` creates the
dependencies and passes them in - the project is now plain free-text).

User factories (`make_pm_user`, `make_regular_user`) live in
`accounts.tests.common` since the `CustomUser` model lives in the
`accounts` app. Tests that span both apps import from both modules.

Per-test-file `setUp` methods import only the helpers they need.
"""

from accounts.models import CustomUser
from ctj_api.models import (
    CommunityOfPractice,
    Opportunity,
    Role,
    Skill,
)


def make_cop(
    *,
    practice_area: str = "engineering",
    description: str = "Engineering CoP",
) -> CommunityOfPractice:
    """Create a Community of Practice row."""
    return CommunityOfPractice.objects.create(
        practice_area=practice_area,
        description=description,
    )


def make_role(
    *,
    title: str = "Developer",
    cop: CommunityOfPractice,
) -> Role:
    """Create a Role row anchored to the given CoP."""
    return Role.objects.create(
        title=title,
        community_of_practice=cop,
    )


def make_skill(*, name: str = "Python") -> Skill:
    """Create a Skill row."""
    return Skill.objects.create(name=name)


def make_opportunity(
    *,
    role: Role,
    created_by: CustomUser,
    project_name: str = "Civic Tech Jobs",
    overview: str = "",
    body: str = "Test opportunity",
    responsibilities: str = "",
    min_experience_required: str = "junior",
    min_hours_required: int = 10,
    work_environment: str = "remote",
    meeting_times: list | None = None,
    status: str = "open",
) -> Opportunity:
    """Create an Opportunity row.

    Caller supplies the FK rows (role, created_by) explicitly because
    tests typically want to assert against a specific PM user; the
    project is now plain free-text (`project_name`). Tests that exercise
    card rendering should pass explicit `overview` / `responsibilities`
    / `meeting_times`.
    """
    return Opportunity.objects.create(
        role=role,
        project_name=project_name,
        overview=overview,
        body=body,
        responsibilities=responsibilities,
        min_experience_required=min_experience_required,
        min_hours_required=min_hours_required,
        work_environment=work_environment,
        meeting_times=meeting_times,
        status=status,
        created_by=created_by,
    )
