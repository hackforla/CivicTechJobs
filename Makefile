.PHONY: build start stop build-linter lint migrations migrate db-shell test-server test-frontend

# Run commands with `make <target>`

build:
	docker compose build

start:
	docker compose up

stop:
	docker compose down

build-linter:
	docker compose build linter

lint:
	docker compose up linter

# Below commands require the docker containers to be running

migrations:
	docker compose exec django python manage.py makemigrations

migrate:
	docker compose exec django python manage.py migrate

db-shell:
	docker compose exec django python manage.py shell

test-frontend:
	docker compose run -T -w /code/frontend webpack npm run test

test-server:
	docker exec django python manage.py test server.tests