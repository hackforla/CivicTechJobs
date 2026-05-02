"""WSGI config for the backend project (currently unused).

CTJ runs `daphne` (an ASGI server) in dev, stage, and prod, so
this WSGI entry point is unreferenced today. Django's
`startproject` generates this file by default; it's preserved
here in case CTJ ever switches to a WSGI-only server (gunicorn,
uwsgi). If the ASGI choice is permanent, this file can be
removed; deferred out of this docs-only PR.

Exposes the WSGI callable as a module-level variable named
`application`.

For more on WSGI deployment:
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

application = get_wsgi_application()
