"""URL routing for the CTJ API; mounted at `/api/` from `backend.urls`.

Five resource routers are auto-registered via DRF's `DefaultRouter`,
which generates standard list/detail paths for each ViewSet.
Two explicit `path()` entries (`healthcheck` and `users/<uuid>/`)
sit alongside, and a catch-all `re_path` at the end returns a JSON
404 (via `api_not_found`) for anything else under `/api/*`.

Order matters: the catch-all is last; if it moved up, it would
match before the explicit paths and shadow them.
"""

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
