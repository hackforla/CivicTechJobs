#!/bin/sh
if [ "$TARGET" = "ECS" ]; then
    ECS_ALLOWED_HOST=$(curl -s "${ECS_CONTAINER_METADATA_URI}" | jq -r .Networks[0].IPv4Addresses[0])
    export ECS_ALLOWED_HOST
fi

python manage.py collectstatic --noinput --clear --link && \
    python manage.py makemigrations && \
    python manage.py migrate && \
    python manage.py generateschema --file openapi-schema.yml && \
    daphne -b 0.0.0.0 -p 8000 backend.asgi:application