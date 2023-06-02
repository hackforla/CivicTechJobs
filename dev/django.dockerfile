FROM python:3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
WORKDIR /code

RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python3 -

ENV PATH=/opt/poetry/bin:$PATH

COPY pyproject.toml ./
COPY poetry.lock ./

RUN poetry config virtualenvs.create false && poetry install --only main --no-interaction --sync
