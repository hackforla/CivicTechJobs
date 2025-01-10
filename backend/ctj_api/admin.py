from django.contrib import admin

from .models import (
    CommunityOfPractice,
    CustomUser,
    Opportunity,
    Project,
    Role,
    Skill,
    SkillMatrix,
)

# Register your models here.
admin.site.register(CommunityOfPractice)
admin.site.register(Role)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(SkillMatrix)
admin.site.register(CustomUser)
admin.site.register(Opportunity)
