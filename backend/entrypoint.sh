#!/bin/sh

# Prod + stage Docker container entrypoint script

# Set ECS environment variables
if [ "$TARGET" = "ECS" ]; then
    ECS_ALLOWED_HOST=$(curl -s "${ECS_CONTAINER_METADATA_URI}" | jq -r .Networks[0].IPv4Addresses[0])
    export ECS_ALLOWED_HOST
fi

# Next 4 lines build the django server
python manage.py collectstatic --noinput --clear --link && \
    python manage.py makemigrations && \
    python manage.py migrate && \
    python manage.py generateschema --file openapi-schema.yml && \
    
    # This command starts the daphne ASGI server
    daphne -b 0.0.0.0 -p 8000 backend.asgi:application
