# App

Contains the source code for the backend piece of Civic Tech Jobs

---
## Overview
TBD

---
## Getting Started
### Pre-requisites
- python 3.X
  - pip
  - venv
- docker
  - docker-compose

### Setup Local Environment
- Clone this repo
- Navigate into this directory
  - `cd ./CivicTechJobs/app`
- Setup your python virtual environment and install dependencies
  - `python -m venv .venv`
  - `source .venv/bin/activate`
  - `pip install -r ./requirements.txt`
    - To deactivate virtual environment, type `deactivate`
- Setup git hooks for pre-commit (only has to be done once)
  - `pre-commit install`
  - `pre-commit autoupdate`
  - `pre-commit run --all-files`
    - run to test it's working. should return no errors
- 