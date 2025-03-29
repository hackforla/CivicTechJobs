# Quickstart Guide

This is a quickstart guide with instructions for how to get the various environments of the application up and running on your machine.

Before doing any of these, make sure to first follow the [Installation Instructions](developer/installation/).

## How to run the app in development mode

First, make sure that `dev.env` is in the `dev` folder with the correct variables.

Start the application in development mode:
```sh
docker compose up --watch
```

Test client with this URL:
```
http://localhost:5175
```

Test server with these URLs:
```
http://localhost:8000/api/opportunities/

http://localhost:8000/api/healthcheck
```
- If you request a non-existent api endpoint, eg. `localhost:8000/api/asdf`, it should return an API error response JSON:
	- `{"error": "API endpoint not found", "status_code": 404, "message": "The requested API endpoint does not exist"}`

## Run the app in dev mode without Docker

Make sure you have python, poetry, node.js, and npm installed on your machine.

Steps to run the **backend** without docker:

1. In a terminal, navigate to the backend folder with `cd backend`.
2. Inside this folder, run the backend dev server start command below.
3. The server should be running on `localhost:8000` now.

Backend dev server start command:
```sh
poetry run python manage.py runserver localhost:8000
```

<br>

Steps to run the **frontend** without docker:

1. In a separate terminal, navigate to the frontend folder with `cd frontend`.
2. Inside this folder, run the frontend dev server start command below.
3. The client dev server should be running on `localhost:5175` now.

Frontend dev server start command:
```sh
npm run dev
```

## Local Django ADMIN url and credentials 

Use the below to log in to your local django server admin portal:

```
http://localhost:8000/admin/
```
- This should work with and without docker

Create an admin user with: 
```
python manage.py createsuperuser
```
- It will prompt you to enter a username, email, and password to create an admin user. Make sure to write these down
- You can now use these credentials to log into your local server's admin portal.
- These credentials are saved into your local postgres instance database, so if this data ever gets deleted or reset, you will have to create an admin user again.
- Reference: [Writing your first Django app, part 2 | Django documentation | Django](https://docs.djangoproject.com/en/5.1/intro/tutorial02/#introducing-the-django-admin)


## Mkdocs

Start mkdocs development server:

```sh
docker compose -f docker-compose.docs.yml up --watch
```

- Test with: `http://localhost:8005/CivicTechJobs/`


## Backend - Linting script

Run these commands inside the `/backend` folder, in the following order:

```
poetry install
poetry run isort .
poetry run black .
poetry run flake8
```

- These should ideally be run before making a PR
- `isort`: sorts the import statements
- `black`: automatically formats python code
- `flake8`: lints python code


## Staging environment

You can view the staging deployment with the following URL: [https://civictechjobs-stage.vrms.io/](https://civictechjobs-stage.vrms.io/)

How to run the stage environment locally:

1. Make sure you have a `stage.env` file inside the `/stage` folder of your local repository. It should be configured with the correct variables.
2. Run the staging environment in your local machine:

```
docker compose -f docker-compose.stage.yml up
```

Notes:
- [Feature: Set up stage environment in docker by LoTerence · Pull Request #613 · hackforla/CivicTechJobs · GitHub](https://github.com/hackforla/CivicTechJobs/pull/613)

