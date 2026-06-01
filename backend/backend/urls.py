"""Top-level URL routing for the backend Django project.

Mounts:
- `/admin/` for the Django admin site.
- `/api/` delegates to `accounts.urls` then `ctj_api.urls` for the
  full CTJ API surface.
- Everything else falls through to the SPA catchall in
  `backend.views`, which serves an HTML template.

Order matters in two places:
- The SPA catchall is last so the explicit `/admin/` and `/api/`
  mounts win first.
- `accounts.urls` is mounted BEFORE `ctj_api.urls` because
  `ctj_api.urls` ends with a `/api/*` catch-all (`api_not_found`)
  that would otherwise shadow accounts routes.

Architectural note: the SPA catchall is a remnant from the
pre-rewrite monolithic setup, when Django served both the API and
the rendered SPA shell from one process. The post-rewrite
architecture runs the frontend as a separate Next.js container that
handles all non-API traffic; anyone hitting the backend service
directly at a non-`/admin/`, non-`/api/` path is probably misrouted.
The catchall is preserved for now but is a candidate for removal -
deferred.
"""

from django.contrib import admin
from django.urls import include, path, re_path

from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("accounts.urls")),
    path("api/", include("ctj_api.urls"), name="api"),
    # Catch-all for frontend (React)
    re_path(
        r"^.*$",
        views.catchall,
        name="index",
    ),
]
