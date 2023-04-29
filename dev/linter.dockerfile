FROM alpine:3.15

# install dependencies
RUN apk add --no-cache \
  bash~=5.1 \
  docker~=20.10 \
  git~=2.34 \
  gcc~=10.3 \
  libgcc~=10.3 \
  libstdc++~=10.3 \
  openrc~=0.44 \
  python3~=3.9 \
  python3-dev~=3.9 \
  musl-dev~=1.2 \
  py3-pip~=20.3 \
  nodejs~=16.20 \
  npm~=8.1.3


# install python dependencies
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
RUN ln -sf python3 /usr/bin/python &&\
  python -m ensurepip &&\
  pip3 install --no-cache --no-cache-dir --ignore-installed --upgrade \
  pip==22.1 \
  pre-commit==2.19 \
  setuptools==62.3


WORKDIR /src
ENTRYPOINT ["pre-commit"]
