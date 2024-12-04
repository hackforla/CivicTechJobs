from django.contrib import admin

from .models import Opportunities, CommunityOfPractice, Role, Skill, Project

# Register your models here.
admin.site.register(Opportunities)
admin.site.register(CommunityOfPractice)
admin.site.register(Role)
admin.site.register(Skill)
admin.site.register(Project)
