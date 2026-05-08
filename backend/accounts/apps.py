from django.apps import AppConfig


class AccountsConfig(AppConfig):
    """Django app config for `accounts`, the project's identity / auth app.

    Owns the `CustomUser` model (the project's `AUTH_USER_MODEL`),
    the per-user detail endpoint, the auth flow endpoints (signup,
    login, logout, me, csrf), and their permission classes /
    serializers. Domain models (Opportunity, Project, etc.) stay in
    `ctj_api`; cross-app FKs to user use `settings.AUTH_USER_MODEL`
    so the boundary stays explicit.

    `default_auto_field` is `BigAutoField` to silence Django's
    startup warning, but in practice every model declares its own
    `UUIDField` primary key, so it's unused. Kept for parity with
    Django's scaffold.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "accounts"
