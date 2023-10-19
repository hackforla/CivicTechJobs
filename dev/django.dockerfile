FROM python:3

# Setup environment
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# Set up shell for pipe
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Download Poetry into Path
# shellcheck disable=SC2034
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry POETRY_VERSION=1.3.0 python3 -
ENV PATH=/opt/poetry/bin:$PATH

# Download dependencies
COPY pyproject.toml ./
COPY poetry.lock ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --sync
