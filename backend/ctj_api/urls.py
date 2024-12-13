from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from ctj_api import views

router = DefaultRouter()
router.register(r"opportunities", views.OpportunityViewSet)
router.register(r"communityOfPractice", views.CommunityOfPracticeViewSet)
router.register(r"roles", views.RoleViewSet)
router.register(r"skills", views.SkillViewSet)
router.register(r"projects", views.ProjectViewSet)

urlpatterns = [
    path("healthcheck", views.healthcheck, name="healthcheck"),
    re_path(r"^", include(router.urls)),
    path("users/<uuid:pk>/", views.UserDetail.as_view()),
    # Catch-all for incorrect API routes
    re_path(r"^.*$", views.api_not_found),
]
