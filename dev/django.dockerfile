FROM python:3

# Setup environment
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# Set up shell for pipe
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Download Poetry into Path
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python3 -
ENV PATH=/opt/poetry/bin:$PATH

# Download dependencies
COPY pyproject.toml ./
COPY poetry.lock ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --sync
