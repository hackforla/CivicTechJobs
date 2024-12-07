from django.contrib import admin

from .models import (
    CommunityOfPractice,
    Role,
    Skill,
    Project,
    SkillMatrix,
    CustomUser,
    Opportunity,
)

# Register your models here.
admin.site.register(CommunityOfPractice)
admin.site.register(Role)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(SkillMatrix)
admin.site.register(CustomUser)
admin.site.register(Opportunity)
