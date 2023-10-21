FROM node:18-alpine as react-builder
WORKDIR /code

# Install deps
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install

# Set up env and build
ARG MODE
ARG DEVTOOL
COPY ./frontend/ .
RUN npm run build

FROM python:3-alpine as django-builder

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# Download Poetry into Path
ENV POETRY_HOME=/usr/local/poetry
ENV PATH="$POETRY_HOME/bin:${PATH}"

# Set up shell for pipe
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

# hadolint ignore=DL3018
RUN apk update && apk add --no-cache curl gcc musl-dev libffi-dev jq && pip install psycopg2-binary==2.9.9

# Disabling shellcheck SC2034 because it considers the unused variables POETRY_HOME and POETRY_VERSION as a bug
# shellcheck disable=SC2034
RUN curl -sSL https://install.python-poetry.org | POETRY_VERSION=1.3.0 python3 -

COPY backend/pyproject.toml .
COPY backend/poetry.lock .
RUN poetry config virtualenvs.create false && poetry install --with staging --no-interaction --sync

COPY ./backend/ .
COPY --from=react-builder /code/static/ ./frontend/static/frontend/
COPY --from=react-builder /code/templates/ ./frontend/templates/frontend/
ENTRYPOINT ["./entrypoint.sh"]
