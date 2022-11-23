#!/bin/sh
if [ "$TARGET" = "ECS" ]; then
    ECS_ALLOWED_HOST=$(curl -s "${ECS_CONTAINER_METADATA_URI}" | jq -r .Networks[0].IPv4Addresses[0])
    export ECS_ALLOWED_HOST
fi

python manage.py collectstatic && \
    python manage.py makemigrations && \
    python manage.py migrate && \
    gunicorn config.wsgi --bind 0.0.0.0:8000
