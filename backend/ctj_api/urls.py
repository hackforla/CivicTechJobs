"""URL routing for the CTJ API; mounted at `/api/` from `backend.urls`.

One resource (`opportunities`) is auto-routed via DRF's
`DefaultRouter` because it's a full-CRUD `ModelViewSet`. Every
other endpoint is an explicit `path()` entry pointing at a
function-based view (see `ctj_api.views` for the shape rule):

- `healthcheck`: the liveness endpoint.
- `users/<uuid>/`: the per-user detail FBV.
- `communities-of-practice/`, `roles/`, `skills/`, `projects/`:
  list + detail FBV pairs for read-only catalog resources.

A catch-all `re_path` at the end returns a JSON 404 (via
`api_not_found`) for anything else under `/api/*`.

Order matters: the catch-all is last; if it moved up, it would
match before the explicit paths and shadow them. The router
include sits before the catch-all for the same reason.
"""

from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from ctj_api import views

router = DefaultRouter()
router.register(r"opportunities", views.OpportunityViewSet)

urlpatterns = [
    path("healthcheck/", views.healthcheck, name="healthcheck"),
    path("users/<uuid:pk>/", views.user_detail),
    path("communities-of-practice/", views.community_of_practice_list),
    path(
        "communities-of-practice/<uuid:pk>/",
        views.community_of_practice_detail,
    ),
    path("roles/", views.role_list),
    path("roles/<uuid:pk>/", views.role_detail),
    path("skills/", views.skill_list),
    path("skills/<uuid:pk>/", views.skill_detail),
    path("projects/", views.project_list),
    path("projects/<uuid:pk>/", views.project_detail),
    re_path(r"^", include(router.urls)),
    # Catch-all for incorrect API routes
    re_path(r"^.*$", views.api_not_found),
]
