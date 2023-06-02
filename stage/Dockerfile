FROM node:18-alpine as react-builder
WORKDIR /code
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM python:3-alpine as django-builder

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# Download Poetry into Path
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH "/root/.local/bin:$PATH"

COPY backend/poetry.toml ./
COPY backend/poetry.lock ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --sync

COPY . .
COPY --from=react-builder /code/frontend/static/frontend/ ./frontend/static/frontend/
COPY --from=react-builder /code/frontend/templates/frontend/ ./frontend/templates/frontend/
# hadolint ignore=DL3018
RUN apk --no-cache add curl
# hadolint ignore=DL3018
RUN apk --no-cache add jq
ENTRYPOINT ["./entrypoint.sh"]
