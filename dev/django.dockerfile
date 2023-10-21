FROM python:3

# Setup environment
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
WORKDIR /code

#Download Poetry into Path
ENV POETRY_HOME=/usr/local/poetry
ENV PATH="$POETRY_HOME/bin:${PATH}"

# Set up shell for pipe
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Download Poetry into Path
# shellcheck disable=SC2034
RUN curl -sSL https://install.python-poetry.org | POETRY_VERSION=1.3.0 python3 -

# Download dependencies
COPY pyproject.toml ./
COPY poetry.lock ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --sync
