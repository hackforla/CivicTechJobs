from django.apps import AppConfig
import ctjbackend.uptime


class CtjbackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ctjbackend'
