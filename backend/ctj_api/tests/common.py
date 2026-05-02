"""Shared factory helpers for `ctj_api` test files.

Each helper saves a model instance with sensible defaults that callers
can override via keyword arguments. The helpers do not return shared
state - each call creates a new row. Callers wire factories together
explicitly when they need relationships (e.g. an `Opportunity` needs
a `Project`, a `Role`, and a `created_by` user; the test's `setUp`
creates the dependencies and passes them in).

Per-test-file `setUp` methods import only the helpers they need.
"""

from ctj_api.models import (
    CommunityOfPractice,
    CustomUser,
    Opportunity,
    Project,
    Role,
    Skill,
)


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


def make_role(*, title: str = "Developer", cop: CommunityOfPractice) -> Role:
    """Create a Role row anchored to the given CoP."""
    return Role.objects.create(title=title, community_of_practice=cop)


def make_skill(*, name: str = "Python") -> Skill:
    """Create a Skill row."""
    return Skill.objects.create(name=name)


def make_project(
    *,
    name: str = "Civic Tech Jobs",
    people_depot_project_id: str = "1234-abcd",
) -> Project:
    """Create a Project row."""
    return Project.objects.create(
        name=name,
        people_depot_project_id=people_depot_project_id,
    )


def make_opportunity(
    *,
    project: Project,
    role: Role,
    created_by: CustomUser,
    body: str = "Test opportunity",
    min_experience_required: str = "junior",
    min_hours_required: int = 10,
    work_environment: str = "remote",
    status: str = "open",
) -> Opportunity:
    """Create an Opportunity row.

    Caller supplies the FK rows (project, role, created_by) explicitly
    because tests typically want to assert against a specific PM user
    or project; default-constructing them inside the helper would
    obscure those references.
    """
    return Opportunity.objects.create(
        project=project,
        role=role,
        body=body,
        min_experience_required=min_experience_required,
        min_hours_required=min_hours_required,
        work_environment=work_environment,
        status=status,
        created_by=created_by,
    )
