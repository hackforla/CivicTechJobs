from django.urls import path

from server import views

urlpatterns = [
    path("v1/experienceLevels/", views.ExperienceLevelList.as_view()),
    path("v1/experienceLevels/<uuid:pk>/", views.ExperienceLevelDetail.as_view()),
    path("v1/opportunities/", views.OpportunityList.as_view()),
    path("v1/opportunities/<uuid:pk>/", views.OpportunityDetail.as_view()),
    path("v1/projects/", views.ProjectList.as_view()),
    path("v1/projects/<uuid:pk>/", views.ProjectDetail.as_view()),
    path("v1/recurringEvents/", views.RecurringEventList.as_view()),
    path("v1/recurringEvents/<uuid:pk>/", views.RecurringEventDetail.as_view()),
    path("v1/roles/", views.RoleList.as_view()),
    path("v1/roles/<uuid:pk>/", views.RoleDetail.as_view()),
    path("v1/skills/", views.SkillList.as_view()),
    path("v1/skills/<uuid:pk>/", views.SkillDetail.as_view()),
]
