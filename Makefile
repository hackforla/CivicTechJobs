.PHONY: help \
	local-check-prereqs \
	local-install local-install-frontend local-install-backend \
	local-run-frontend local-run-backend local-check-db \
	local-stop-docker-frontend local-stop-docker-backend \
	local-makemigrations local-superuser \
	local-test local-test-backend local-test-frontend \
	local-clean local-kill-ports \
	docker-up db-up docker-down docker-logs docker-watch \
	db-migrate db-makemigrations db-reset db-reset-hard db-grant-test-db-perms \
	stage-smoke stage-up stage-down \
	docker-shell-backend docker-shell-frontend docker-shell-db \
	lint install-hooks

BACKEND_DIR := backend
FRONTEND_DIR := frontend
DEV_ENV := dev/dev.env
# Source dev env vars before invoking poetry so host Django targets get the same
# config docker-compose loads via env_file: dev/dev.env. SQL_HOST is overridden
# because dev.env's `pgdb` is a docker-network DNS name; on host, pgdb's port
# is published on localhost.
BACKEND_RUN := set -a; . $(DEV_ENV); SQL_HOST=localhost; set +a; cd $(BACKEND_DIR) && poetry run
DEV_COMPOSE ?= docker compose
STAGE_COMPOSE ?= docker compose -f docker-compose.stage.yml
STAGE_ENV := stage/stage.env
DB_SERVICE ?= pgdb
BACKEND_SERVICE ?= django
FRONTEND_SERVICE ?= next
LOCAL_KILL_PORTS ?= 3000 8000 5432

# ============================================================================
# HELP
# ============================================================================

help:
	@echo "civictechjobs - command reference"
	@echo ""
	@echo "Core Local Workflow (host processes; rapid iteration)"
	@echo "  make local-check-prereqs    Verify host has node 24 / python 3.13 / poetry / docker"
	@echo "  make local-install          Install frontend + backend dependencies"
	@echo "  make local-run-frontend     Stop docker frontend, run Next.js on host"
	@echo "  make local-run-backend      Stop docker backend, run Django on host"
	@echo "  make local-test             Run backend tests + frontend tests"
	@echo "  make local-makemigrations   Create Django migration files (host)"
	@echo "  make local-superuser        Create Django admin user (host)"
	@echo ""
	@echo "Core Dev Docker Workflow"
	@echo "  make docker-up              Start full dev stack (detached, with build)"
	@echo "  make db-up                  Start only the postgres service"
	@echo "  make docker-down            Stop dev stack"
	@echo "  make docker-logs            Stream dev stack logs"
	@echo "  make docker-watch           Run compose watch (live host->container sync)"
	@echo "  make db-migrate             Apply Django migrations against dev DB"
	@echo "  make db-makemigrations      Create Django migration files (in container)"
	@echo "  make db-reset               Truncate all app data (keeps schema + migrations)"
	@echo "  make db-reset-hard          Drop dev DB volume and recreate DB container"
	@echo "  make db-grant-test-db-perms Grant test-DB CREATEDB perms (for Django tests)"
	@echo ""
	@echo "Stage smoke test (local simulation of production-shaped builds; deploy lives in incubator)"
	@echo "  make stage-smoke            PRIMARY: build + up + probe healthchecks + tear down (one-shot pass/fail)"
	@echo "  make stage-up               Bring stage stack up for debugging (only when stage-smoke fails)"
	@echo "  make stage-down             Tear stage stack down"
	@echo ""
	@echo "Lint and hooks"
	@echo "  make lint                   Run pre-commit across all files (full suite)"
	@echo "  make install-hooks          Install pre-commit git hook"
	@echo ""
	@echo "Shell Access"
	@echo "  make docker-shell-backend   Shell into dev backend container"
	@echo "  make docker-shell-frontend  Shell into dev frontend container"
	@echo "  make docker-shell-db        psql shell into dev DB container"
	@echo ""
	@echo "Local Utilities"
	@echo "  make local-clean            Clear local build/cache artifacts"
	@echo "  make local-kill-ports       Manual rescue for ports $(LOCAL_KILL_PORTS)"

# ============================================================================
# LOCAL (HOST PROCESSES)
# ============================================================================

local-check-prereqs:
	@status=0; \
	echo "Checking host prerequisites:"; \
	echo ""; \
	if command -v node >/dev/null 2>&1; then \
		v=$$(node --version | sed 's/v//'); maj=$${v%%.*}; \
		if [ "$$maj" -ge 24 ]; then echo "  [OK]       node       $$v"; \
		else echo "  [OUTDATED] node       $$v (need >=24)"; status=1; fi; \
	else echo "  [MISSING]  node       (need >=24)"; status=1; fi; \
	if command -v python3.13 >/dev/null 2>&1; then \
		echo "  [OK]       python3.13 $$(python3.13 --version | awk '{print $$2}')"; \
	else echo "  [MISSING]  python3.13 (poetry / Django require ^3.13)"; status=1; fi; \
	if command -v poetry >/dev/null 2>&1; then \
		echo "  [OK]       poetry     $$(poetry --version 2>&1 | awk '{print $$3}' | tr -d ')')"; \
	else echo "  [MISSING]  poetry     (https://python-poetry.org/docs/#installation)"; status=1; fi; \
	if command -v docker >/dev/null 2>&1; then \
		echo "  [OK]       docker     $$(docker --version | awk '{print $$3}' | tr -d ',')"; \
	else echo "  [MISSING]  docker     (required for db-up and full dev stack)"; status=1; fi; \
	echo ""; \
	if [ "$$status" -eq 0 ]; then echo "All prerequisites satisfied."; \
	else echo "Missing or outdated prerequisites - see docs/developer/installation.md"; exit 1; fi

local-install: local-install-frontend local-install-backend

local-install-frontend:
	rm -rf $(FRONTEND_DIR)/node_modules
	npm ci --prefix $(FRONTEND_DIR)

local-install-backend:
	rm -rf $(BACKEND_DIR)/.venv
	cd $(BACKEND_DIR) && python3.13 -m venv .venv && poetry install

local-stop-docker-frontend:
	@$(DEV_COMPOSE) stop $(FRONTEND_SERVICE) >/dev/null 2>&1 || true

local-stop-docker-backend:
	@$(DEV_COMPOSE) stop $(BACKEND_SERVICE) >/dev/null 2>&1 || true

local-run-frontend: local-stop-docker-frontend
	cd $(FRONTEND_DIR) && npm run dev

local-run-backend: local-stop-docker-backend local-check-db
	$(BACKEND_RUN) python manage.py runserver

local-check-db:
	@nc -z localhost 5432 2>/dev/null || (echo "DB not reachable on :5432. Run 'make db-up' first."; exit 1)

local-makemigrations:
	$(BACKEND_RUN) python manage.py makemigrations

local-superuser:
	$(BACKEND_RUN) python manage.py createsuperuser

local-test: local-test-backend local-test-frontend

local-test-backend:
	$(BACKEND_RUN) python manage.py test ctj_api.tests --keepdb --noinput

local-test-frontend:
	cd $(FRONTEND_DIR) && npx vitest run

local-clean:
	rm -rf $(FRONTEND_DIR)/.next $(FRONTEND_DIR)/node_modules
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	@echo "Clean complete."

local-kill-ports:
	@echo "Stopping listeners on ports: $(LOCAL_KILL_PORTS)"
	@for port in $(LOCAL_KILL_PORTS); do \
		if command -v fuser >/dev/null 2>&1; then \
			echo "Port $$port: sending TERM"; \
			fuser -k -TERM $$port/tcp 2>/dev/null || true; \
			sleep 1; \
			if fuser $$port/tcp >/dev/null 2>&1; then \
				echo "Port $$port: still busy, sending KILL"; \
				fuser -k -KILL $$port/tcp 2>/dev/null || true; \
			fi; \
		elif command -v lsof >/dev/null 2>&1; then \
			pids=$$(lsof -tiTCP:$$port -sTCP:LISTEN 2>/dev/null || true); \
			if [ -n "$$pids" ]; then \
				echo "Port $$port: sending TERM to PID(s) $$pids"; \
				kill -TERM $$pids 2>/dev/null || true; \
				sleep 1; \
				pids=$$(lsof -tiTCP:$$port -sTCP:LISTEN 2>/dev/null || true); \
				if [ -n "$$pids" ]; then \
					echo "Port $$port: still busy, sending KILL to PID(s) $$pids"; \
					kill -KILL $$pids 2>/dev/null || true; \
				fi; \
			else \
				echo "Port $$port: no listener"; \
			fi; \
		else \
			echo "Port $$port: skipped (install fuser or lsof)"; \
		fi; \
	done

# ============================================================================
# DOCKER DEV
# ============================================================================

docker-up:
	$(DEV_COMPOSE) up -d --build

db-up:
	$(DEV_COMPOSE) up -d $(DB_SERVICE)

docker-down:
	$(DEV_COMPOSE) down --remove-orphans

docker-logs:
	$(DEV_COMPOSE) logs -f --tail=200

docker-watch:
	$(DEV_COMPOSE) watch

db-migrate:
	$(DEV_COMPOSE) exec $(BACKEND_SERVICE) python manage.py migrate

db-makemigrations:
	$(DEV_COMPOSE) exec $(BACKEND_SERVICE) python manage.py makemigrations

db-reset:
	@echo "This will truncate all app data (schema + migrations preserved). Type 'yes' to confirm:"
	@read ans && [ "$$ans" = "yes" ] || (echo "Aborted."; exit 1)
	$(DEV_COMPOSE) exec $(BACKEND_SERVICE) python manage.py flush --noinput

db-reset-hard:
	@echo "This will destroy the DB volume and all data. Type 'yes' to confirm:"
	@read ans && [ "$$ans" = "yes" ] || (echo "Aborted."; exit 1)
	$(DEV_COMPOSE) down -v --remove-orphans
	$(DEV_COMPOSE) up -d $(DB_SERVICE)

db-grant-test-db-perms:
	$(DEV_COMPOSE) exec -T $(DB_SERVICE) psql -U $${POSTGRES_USER:-postgres} -d $${POSTGRES_DB:-postgres} -c "ALTER USER $${POSTGRES_USER:-postgres} CREATEDB;"

# ============================================================================
# STAGE (LOCAL SIMULATION OF THE STAGE-DEPLOYED SHAPE)
# ============================================================================
# Real stage deployment lives in HfLA's incubator repo (Terraform). These
# targets exercise the production-shaped images and compose locally so we
# can catch image / config / migration issues before pushing.
#
# stage-smoke is the primary tool: builds, ups, probes, tears down, exits
# 0 on green. stage-up / stage-down exist for debugging when smoke fails.

stage-smoke:
	@if [ ! -f $(STAGE_ENV) ]; then \
		echo "ERROR: $(STAGE_ENV) does not exist."; \
		echo "Copy stage/stage.env.example to $(STAGE_ENV) and fill in the placeholders before running stage-smoke."; \
		exit 1; \
	fi
	@echo "[stage-smoke] building images..."
	$(STAGE_COMPOSE) build
	@echo "[stage-smoke] starting stack..."
	$(STAGE_COMPOSE) up -d
	@echo "[stage-smoke] probing django (/api/healthcheck/)..."
	@for i in $$(seq 1 60); do \
		if curl -fsS http://localhost:8000/api/healthcheck/ >/dev/null 2>&1; then \
			echo "  django OK"; break; \
		fi; \
		if [ $$i -eq 60 ]; then \
			echo "  django did not respond after 120s"; \
			$(STAGE_COMPOSE) logs --tail=80; \
			$(STAGE_COMPOSE) down --remove-orphans; \
			exit 1; \
		fi; \
		sleep 2; \
	done
	@echo "[stage-smoke] probing next (/)..."
	@for i in $$(seq 1 60); do \
		if curl -fsS http://localhost:3000/ >/dev/null 2>&1; then \
			echo "  next OK"; break; \
		fi; \
		if [ $$i -eq 60 ]; then \
			echo "  next did not respond after 120s"; \
			$(STAGE_COMPOSE) logs --tail=80; \
			$(STAGE_COMPOSE) down --remove-orphans; \
			exit 1; \
		fi; \
		sleep 2; \
	done
	@echo "[stage-smoke] all probes passed; tearing down..."
	$(STAGE_COMPOSE) down --remove-orphans
	@echo "[stage-smoke] OK"

stage-up:
	@if [ ! -f $(STAGE_ENV) ]; then \
		echo "ERROR: $(STAGE_ENV) does not exist."; \
		echo "Copy stage/stage.env.example to $(STAGE_ENV) and fill in the placeholders."; \
		exit 1; \
	fi
	$(STAGE_COMPOSE) up -d --build

stage-down:
	$(STAGE_COMPOSE) down --remove-orphans

# ============================================================================
# LINT AND HOOKS
# ============================================================================

lint:
	$(BACKEND_DIR)/.venv/bin/pre-commit run --all-files

install-hooks:
	$(BACKEND_DIR)/.venv/bin/pre-commit install

# ============================================================================
# SHELL ACCESS
# ============================================================================

docker-shell-backend:
	$(DEV_COMPOSE) exec $(BACKEND_SERVICE) sh

docker-shell-frontend:
	$(DEV_COMPOSE) exec $(FRONTEND_SERVICE) sh

docker-shell-db:
	$(DEV_COMPOSE) exec $(DB_SERVICE) psql -U $${POSTGRES_USER:-postgres} -d $${POSTGRES_DB:-postgres}

.DEFAULT_GOAL := help
