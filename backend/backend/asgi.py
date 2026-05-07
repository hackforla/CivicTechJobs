"""ASGI config for the backend project (the entry point used by `daphne`).

In CTJ this module is the production entry point - `entrypoint.sh`
runs `daphne -b 0.0.0.0 -p 8000 backend.asgi:application` to start
the server. The dev server (`python manage.py runserver`) also
routes through ASGI here because `daphne` is first in
`INSTALLED_APPS`, which makes Django's `runserver` use daphne's
ASGI handler instead of the default WSGI one.

Exposes the ASGI callable as a module-level variable named
`application`.

For more on ASGI deployment:
https://docs.djangoproject.com/en/6.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

application = get_asgi_application()
