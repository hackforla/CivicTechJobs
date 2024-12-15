#!/bin/sh

# A script to test the prod/stage env locally, without docker

# This script will only work if you have a `.env` file in the `CivicTechJobs/backend/` folder
# - Example: `CivicTechJobs/backend/.env`
# - This .env can have the same vars as `dev/dev.env`
# - Remember to check if the DEBUG var is True or False, depending on your use case.

# This script builds and starts the django server in your local machine
poetry run python manage.py collectstatic --noinput --clear --link && \
    poetry run python manage.py makemigrations && \
    poetry run python manage.py migrate && \
    poetry run python manage.py generateschema --file openapi-schema.yml && \

    # django runserver - starts the development server:
    # poetry run python manage.py runserver

    # daphne start server command:
    poetry run daphne -b localhost -p 8000 backend.asgi:application

# Run this script with either `python manage.py runserver` or `daphne`. Never both.