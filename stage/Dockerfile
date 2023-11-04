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
SHELL ["/bin/sh", "-o", "pipefail", "-c"]

# hadolint ignore=DL3018
RUN apk update && apk add --no-cache curl gcc musl-dev libffi-dev jq postgresql-dev
# I could not make the linter accept 4006, so I will put this here. Whoever is interested should find a way to resolve this without ignoring. 
# hadolint ignore=DL4006
RUN curl -sSL https://install.python-poetry.org | python3 -

COPY backend/pyproject.toml .
COPY backend/poetry.lock .
RUN poetry config virtualenvs.create false && poetry install --with staging --no-interaction --sync

COPY ./backend/ .
COPY --from=react-builder /code/static/ ./frontend/static/frontend/
COPY --from=react-builder /code/templates/ ./frontend/templates/frontend/
ENTRYPOINT ["./entrypoint.sh"]
