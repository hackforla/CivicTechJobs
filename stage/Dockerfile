# Dockerfile for building the stage env django image

# ----- Stage 1: build the react frontend -----
FROM node:20-alpine3.19 AS react-builder
WORKDIR /code

# Install frontend dependencies
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install

# Build vite static assets
COPY ./frontend/ .
RUN npm run build


# ----- Stage 2: set up django backend -----
FROM python:3.12-alpine AS django-builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set up environment
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1s

# Install system dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache gcc g++ musl-dev curl libffi-dev postgresql-dev zlib-dev jpeg-dev freetype-dev

# Set up the shell to fail on any command error, improving reliability
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

# Download Poetry into Path
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="${PATH}:/root/.local/bin"

# Install python project dependencies with poetry
COPY backend/pyproject.toml .
COPY backend/poetry.lock .
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi
COPY ./backend/ .

# Copy frontend application static files into django project
COPY --from=react-builder /code/dist/ ./frontend_dist/

# Set run permission on entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# ENTRYPOINT contains the start server script
ENTRYPOINT ["./entrypoint.sh"]
