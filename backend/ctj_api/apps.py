from django.apps import AppConfig


class CtjApiConfig(AppConfig):
    """Django app config for `ctj_api`, the project's only domain app.

    `default_auto_field` is set to `BigAutoField` to silence Django's
    startup warning about implicit auto field selection, but in
    practice it's unused: every CTJ model declares its own
    `UUIDField` primary key, so no model relies on this default.
    Carried for parity with Django's scaffold; harmless to leave.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "ctj_api"
