FROM alpine:3.15

# install docker
RUN apk add --update docker openrc
RUN rc-update add docker boot

# install python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --no-cache gcc musl-dev python3-dev
RUN python -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# install git
RUN apk update
RUN apk add git

# install bash
RUN apk add --no-cache bash

# install pre-commit
RUN pip install pre-commit

WORKDIR /src
ENTRYPOINT ["pre-commit"]
