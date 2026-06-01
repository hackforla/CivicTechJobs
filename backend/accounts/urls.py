"""URL routing for the `accounts` app; mounted at `/api/` from `backend.urls`.

Exposes:
- `users/<uuid>/`: per-user detail FBV.
- `auth/csrf/`:    set CSRF cookie.
- `auth/signup/`:  create user + auto-login.
- `auth/login/`:   create session.
- `auth/logout/`:  clear session.
- `auth/me/`:      current authenticated user.

Mounted before `ctj_api.urls` in the root urlconf so accounts
patterns match first; ctj_api's `/api/*` catch-all stays in place
for unknown paths.
"""

from django.urls import path

from accounts import views

urlpatterns = [
    path("users/<uuid:pk>/", views.user_detail),
    path("auth/csrf/", views.auth_csrf),
    path("auth/signup/", views.auth_signup),
    path("auth/login/", views.auth_login),
    path("auth/logout/", views.auth_logout),
    path("auth/me/", views.auth_me),
]
