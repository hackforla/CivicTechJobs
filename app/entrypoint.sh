#!/bin/sh
python manage.py collectstatic && \
    python manage.py makemigrations && \
    python manage.py migrate && \
    gunicorn config.wsgi --bind 0.0.0.0:8000
