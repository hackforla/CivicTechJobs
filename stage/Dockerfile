FROM node:18-alpine as react-builder
WORKDIR /code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM python:3-alpine as django-builder
COPY requirements.txt ./
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements.txt

FROM python:3-alpine
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY --from=django-builder /wheels /wheels
RUN pip install --no-cache /wheels/*
COPY . .
COPY --from=react-builder /code/frontend/static/frontend/ ./frontend/static/frontend/
COPY --from=react-builder /code/frontend/templates/frontend/ ./frontend/templates/frontend/
ENTRYPOINT ["./entrypoint.sh"]