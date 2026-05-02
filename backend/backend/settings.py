"""Django settings for the CTJ backend project.

Settings are read from environment variables via `python-decouple`'s
`config()` function. Required vars (no default - server fails to
start if missing): `SECRET_KEY`, `SQL_ENGINE`, `SQL_DATABASE`,
`SQL_USER`, `SQL_PASSWORD`, `SQL_HOST`, `SQL_PORT`. Optional vars
with defaults are inline below. Per
`project_envvars_owned_by_devops`, CTJ engineering declares the
vars; devops populates the values per environment (incubator
repo).

Notable choices:
- `AUTH_USER_MODEL = "ctj_api.CustomUser"` (subclasses
  `AbstractUser` rather than extending the default User).
- `daphne` is first in `INSTALLED_APPS` so Django's `runserver` and
  the production server both route through ASGI - see
  `backend.asgi`.
- `whitenoise` serves static files; the `immutable_file_test`
  function below identifies hashed asset filenames so they can be
  served with long-cache headers.
- HSTS controls are env-driven; defaults are off so dev/stage stay
  unaffected. Production is expected to set `HSTS_ENABLED=True` and
  the three `*_SECURE`/`SECURE_*` flags below.

A few config remnants here are dead post-rewrite (template dir
references to a no-longer-existent `frontend_dist`, plus a
whitenoise storage workaround). See `scratch/bugs.md` (BUG-007 and
BUG-010) for the full bug list.

For Django settings reference:
https://docs.djangoproject.com/en/6.0/ref/settings/
"""

import re
from pathlib import Path

from decouple import config

VERSION = "1.0.0"

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = BASE_DIR

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=False, cast=bool)

ALLOWED_HOSTS = config("DJANGO_ALLOWED_HOSTS", default="localhost").split(" ")

# Application definition
INSTALLED_APPS = [
    "daphne",
    "whitenoise.runserver_nostatic",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "ctj_api.apps.CtjApiConfig",
    "rest_framework",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BACKEND_DIR / "backend/templates/backend",
            BACKEND_DIR / "frontend_dist",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"
ASGI_APPLICATION = "backend.asgi.application"

# Deployment - security checklist
# https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/
# These vars should all be set to `True` in prod
CSRF_COOKIE_SECURE = config("CSRF_COOKIE_SECURE", default=False, cast=bool)
SESSION_COOKIE_SECURE = config("SESSION_COOKIE_SECURE", default=False, cast=bool)
SECURE_SSL_REDIRECT = config("SECURE_SSL_REDIRECT", default=False, cast=bool)
SECURE_HSTS_SECONDS = (
    31536000 if config("HSTS_ENABLED", default=False, cast=bool) else None
)
SECURE_HSTS_INCLUDE_SUBDOMAINS = config("HSTS_ENABLED", default=False, cast=bool)
SECURE_HSTS_PRELOAD = config("HSTS_ENABLED", default=False, cast=bool)


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": config("SQL_ENGINE"),
        "NAME": config("SQL_DATABASE"),
        "USER": config("SQL_USER"),
        "PASSWORD": config("SQL_PASSWORD"),
        "HOST": config("SQL_HOST"),
        "PORT": config("SQL_PORT"),
    }
}

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
        ),
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Enable django custom User model
# https://docs.djangoproject.com/en/5.1/topics/auth/customizing/#substituting-a-custom-user-model
AUTH_USER_MODEL = "ctj_api.CustomUser"

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = BACKEND_DIR / "staticfiles"
STATICFILES_DIRS = [BACKEND_DIR / "frontend_dist" / "static"]

STORAGES = {
    "staticfiles": {
        # "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
        # BUG: whitenoise storage might be causing issues AWS. Temporary fix below:
        "BACKEND": "django.contrib.staticfiles.storage.ManifestStaticFilesStorage",
        # TODO: Go back and fix this after successful deployment to AWS
        # https://whitenoise.readthedocs.io/en/stable/django.html#storage-troubleshoot
    },
}


# Whitenoise settings
# http://whitenoise.evans.io/en/stable/django.html#WHITENOISE_IMMUTABLE_FILE_TEST
def immutable_file_test(path, url):
    """Identify static files with hashed names for whitenoise's immutable-cache headers.

    Matches filenames where the segment immediately before the
    extension looks like a content hash (8-12 alphanumeric chars,
    separator preceded by `.` or `-`). Examples that match:
    `app-CSliV9zW.js`, `chunk.abc12345.css`.

    Note: the original regex was tuned for Vite/rollup-style hashes
    (the dropped pre-rewrite frontend). Whether it correctly matches
    Next.js/webpack hashes depends on the chunk-naming output of the
    current build - and post-rewrite the backend doesn't serve the
    frontend's static files anyway. See BUG-008 in scratch/bugs.md.
    """
    return re.match(r"^.+[.-][0-9a-zA-Z_-]{8,12}\..+$", url)


WHITENOISE_IMMUTABLE_FILE_TEST = immutable_file_test

# DRF: register the custom exception handler so all DRF-raised errors
# render through the CTJ error envelope shape (see ctj_api.exceptions
# and docs/developer/backend.md's 'Error envelope' section).
REST_FRAMEWORK = {
    "EXCEPTION_HANDLER": "ctj_api.exceptions.civic_exception_handler",
}
