# syntax=docker/dockerfile:1
FROM python:3
WORKDIR /code

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .
RUN cd mkdocs-config && python setup.py develop