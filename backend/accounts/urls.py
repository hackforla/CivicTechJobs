"""URL routing for the `accounts` app; mounted at `/api/` from `backend.urls`.

Currently exposes:
- `users/<uuid>/`: per-user detail FBV.

Auth flow endpoints (signup, login, logout, me, csrf) land in a
follow-up commit under `auth/`.

Mounted before `ctj_api.urls` in the root urlconf so accounts
patterns match first; ctj_api's `/api/*` catch-all stays in place
for unknown paths.
"""

from django.urls import path

from accounts import views

urlpatterns = [
    path("users/<uuid:pk>/", views.user_detail),
]
