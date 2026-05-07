# ADR-0003: Separate frontend and backend containers, both publicly exposed

**Status:** Accepted
**Date:** 2026-05-02

## Context

Pre-rewrite, CTJ was a single Django container that served both the API (`/api/*`) and the frontend (built React assets via whitenoise + a SPA-catchall view rendering `index.html`). One image, one process, one origin.

The rewrite separates the frontend (Next.js, App Router, server components) from the backend (Django + DRF). Once Next.js is running its own server (for server components, route handlers, image optimization, dev rewrites, etc.), the question is how the two services compose:

- Single combined image with one runtime embedded inside the other.
- One container fronts the other (e.g. Next reverse-proxies the API to Django).
- Two containers, both publicly exposed.

## Decision

**Build two independent Docker images - one for Next.js, one for Django - and expose both publicly. In stage and prod, an ALB-shaped routing layer sits in front and dispatches `/api/*` and `/admin/*` to Django, everything else to Next. Locally, dev and stage use Next's `rewrites` config to mimic the single-origin shape from the browser's POV.**

Concretely:

- `dev/django.dockerfile` and `dev/next.dockerfile` build the dev images. Both run on local ports (Django 8000, Next 3000).
- `stage/django.dockerfile` builds Django for daphne (ASGI). `stage/next.dockerfile` is a three-stage build (deps → build → runner) producing the Next.js standalone output.
- `docker-compose.yml` and `docker-compose.stage.yml` expose both services. Postgres is a third container.
- `BACKEND_INTERNAL_URL` is the inter-container DNS name Next uses to reach Django (e.g. `http://django:8000` in compose). Next's `rewrites` config in `next.config.ts` proxies `/api/*` and `/admin/*` to that URL during local dev and stage so the browser never sees a CORS-relevant cross-origin request.
- Production deployment is owned externally (the `incubator` repo's Terraform + ALB configuration). CTJ's responsibility ends at "the images build and run independently."

## Alternatives considered

- **Keep Django serving both (status quo).** Simplest deployment, single image, single origin. Discarded because Next.js's server-side rendering, server components, and route handlers can't run inside a Django container - Next needs its own Node runtime.

- **Next reverse-proxies the API to Django.** Browser only sees Next's origin; Django sits behind Next. Discarded because (a) Next isn't a load-balancer; using it as one mixes responsibilities; (b) Django admin (`/admin/*`) is a Django concern that shouldn't route through Next; (c) the upstream-Next-as-edge pattern adds latency on every request to a service already handling rendering.

- **Single combined image with Next embedded as a subprocess.** Discarded because the two services have different runtime needs (Python 3.13 vs Node 24), different scaling characteristics, and different deploy cadences. Combining them forces a lockstep that benefits neither.

- **Backend hidden behind Next (not publicly exposed).** Even with Next reverse-proxying to Django, Django could be unpublished. Discarded because Django admin (`/admin/*`) is a real human-facing surface that shouldn't be reachable only through Next.

## Consequences

**Accepted:**

- Two images to build, two health checks, two scaling policies. Mitigated by Docker Compose locally and the deploy machinery in stage/prod.

- The pre-rewrite SPA-catchall + `frontend_dist` + whitenoise machinery is dead weight. A follow-up architectural-cleanup PR drops it.

- Inter-container DNS (`BACKEND_INTERNAL_URL`) is a real environment variable per service. Mistyping it breaks dev rewrites silently; documented in the devops and installation guides.

- Cross-origin work is split: in dev/stage, Next's `rewrites` make it a same-origin problem from the browser's POV. In prod, the ALB does the same. Pure-frontend cross-origin work (CORS headers, preflight) is killed.

**Won:**

- Each service scales, deploys, and is debugged independently. A rebuild of the frontend doesn't restart Django and vice versa.

- Next.js's full feature set (server components, route handlers, edge rendering) is available because Next runs in its own Node process.

- Django admin is a Django concern, served by Django, not piped through Next. The PM-facing CMS path stays simple.

- The deployment story is the standard "ALB with two target groups" shape that HfLA infra already supports.
