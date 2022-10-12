# syntax=docker/dockerfile:1
FROM python:3
WORKDIR /code

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

WORKDIR /code/mkdocs-config
RUN python setup.py develop

WORKDIR /code
