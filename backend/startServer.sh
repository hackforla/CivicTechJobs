#!/bin/sh

# A script to test the prod/stage env locally, without docker

# This script builds and starts the django server in your local machine
poetry run python manage.py collectstatic --noinput --clear --link && \
    poetry run python manage.py makemigrations && \
    poetry run python manage.py migrate && \
    poetry run python manage.py generateschema --file openapi-schema.yml && \

    # django runserver start command:
    # poetry run python manage.py runserver

    # daphne start command:
    poetry run daphne -b localhost -p 8000 backend.asgi:application

# Run this script with either django runserver or daphne run. Never both.