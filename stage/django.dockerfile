# Stage container for the Django backend.
#
# Single-stage Poetry install + source copy + entrypoint that runs
# collectstatic, migrations, and Daphne in order. The legacy
# combined-image stage/Dockerfile baked the Vite build into the
# Django container; this file is the half that handles Django alone.

FROM python:3.13-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apk update && apk upgrade && \
    apk add --no-cache \
      gcc g++ musl-dev curl libffi-dev postgresql-dev \
      zlib-dev jpeg-dev freetype-dev jq

SHELL ["/bin/ash", "-o", "pipefail", "-c"]

# Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="${PATH}:/root/.local/bin"

# Python deps
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

# App source + entrypoint
COPY . .
RUN chmod +x entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
