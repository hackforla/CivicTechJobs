"""Django admin registrations for CTJ's domain models.

All six domain models are registered with the default `ModelAdmin`
(no customization). Effect: admins see every field on every row,
with no list filters, search fields, or read-only protections.
Enough for Stage 1 curation of the admin-managed reference tables
(`Skill`, `Role`, `Project`, `CommunityOfPractice`) plus emergency
edits to opportunities. The `CustomUser` admin lives in
`accounts.admin`.

If a model's admin needs filters, list display, or search later,
register it with a dedicated `ModelAdmin` subclass instead of the
default.

`SkillMatrix` is registered here even though its model docstring
classifies it as `internal` (no direct API endpoint). Admin
exposure lets staff view and edit the underlying JSON blob
directly, which is useful for debugging matching-algorithm inputs.
"""

from django.contrib import admin

from .models import (
    CommunityOfPractice,
    Opportunity,
    Project,
    Role,
    Skill,
    SkillMatrix,
)

admin.site.register(CommunityOfPractice)
admin.site.register(Role)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(SkillMatrix)
admin.site.register(Opportunity)
