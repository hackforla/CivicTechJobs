# Deployment & Infrastructure

CivicTechJobs is deployed on Hack for LA's Incubator AWS account (`us-west-2`), managed by the DevOps Community of Practice. The shared infrastructure (ECS cluster, Route53, networking) is provisioned via Terraform in the [hackforla/incubator](https://github.com/hackforla/incubator/tree/main/terraform/projects/civic-tech-jobs) repository. CTJ engineering owns this repo's container Dockerfiles and the deploy workflow; DevOps owns the Terraform module and per-environment configuration values.

**This doc describes the rewrite's Stage 1 *target* deployment topology, not the current deployed app.** The deployed app at `stage.civictechjobs.org` runs the legacy monolithic pattern (single fullstack container, RDS database). The Stage 1 cutover requires Terraform-side work owned by the DevOps CoP.

## Stage taxonomy

Deployment topology mirrors the [backend's stage taxonomy](backend.md#stage-taxonomy):

- **Stage 1 (current PR scope)** - three containers in a shared ECS task: Next.js, Django, Postgres. Auth is Django session-based; no Cognito, no PeopleDepot.
- **Stage 2 (deferred)** - Cognito JWT in the request path; PeopleDepot reachable from the task's network. Postgres remains in-container for now (managed RDS is out of scope for the rewrite).

## Topology (Stage 1)

CTJ runs as three containers in a shared ECS task on the `incubator-prod` cluster:

- **Next.js container** - serves the frontend (App Router pages, server components, server actions).
- **Django container** - serves the CTJ API (`/api/*`) and the Django admin (`/admin/*`).
- **Postgres container** - Postgres 16, the only database in scope for the rewrite.

Containers share the task's network namespace. Cross-container calls hop localhost (Django → Postgres on `localhost:5432`; Next.js → Django on `localhost:8000`). One task instead of three because cross-container traffic stays on localhost (no service discovery, no inter-task networking), and the three containers scale together as a unit.

The ALB does path-based routing: `/api/*` and `/admin/*` go to a Django target group; everything else goes to a Next.js target group. Both target groups are backed by the same ECS task. Postgres has no public ingress; it's reachable only from the Django container inside the task. The browser sees a single origin (`stage.civictechjobs.org`), so CORS isn't a concern.

In Stage 2, the request path additionally calls Cognito (token validation) and PeopleDepot (reference data) from the Django and Next.js containers. No topology change beyond network egress permissions.

## AWS resources

| Resource | Where |
|----------|-------|
| ECS cluster | `incubator-prod` (shared with other Incubator projects); launch type is a DevOps decision |
| ECS service + task definition | CTJ-owned, defined in the Incubator Terraform module |
| ECR repositories | One image per non-Postgres container (`civic-tech-jobs-frontend`, `civic-tech-jobs-backend`); Postgres uses the upstream image |
| Route53 zone | `civictechjobs.org` |
| IAM role | `incubator-cicd-civic-tech-jobs` (assumed via OIDC by the deploy workflow) |

Persistence for the Postgres container is configured in Terraform and owned by the DevOps CoP.

## Deployment workflow

The deploy workflow at [.github/workflows/deploy-stage.yml](https://github.com/hackforla/CivicTechJobs/blob/main/.github/workflows/deploy-stage.yml) runs on every push to `main`:

1. Assumes the `incubator-cicd-civic-tech-jobs` IAM role via GitHub OIDC. OIDC short-lived role assumption rather than long-lived AWS keys; no static AWS credentials live in this repo.
2. Logs into Amazon ECR.
3. Builds the Next.js and Django container images and pushes them to their respective ECR repositories with the `stage` tag. The Postgres container uses the upstream image and is not built here.
4. Forces a redeployment of the ECS service so the new task spec pulls fresh images.

`stage` is the only deployed environment. A production workflow + environment is part of the post-MVP roadmap; both will be added once the Stage 1 deployment is exercised end-to-end.

## Environment variables

Stage values live in Terraform alongside the rest of the Incubator-managed configuration: see [`environment-stage.tf`](https://github.com/hackforla/incubator/blob/main/terraform/projects/civic-tech-jobs/environment-stage.tf). CTJ engineering declares which variables exist; DevOps populates the per-environment values. Adding or editing a deployed-environment variable means changing the Terraform module - not editing anything in this repo.

The local-dev equivalents in [dev/dev.env.example](https://github.com/hackforla/CivicTechJobs/blob/main/dev/dev.env.example) are kept loosely in sync but are not the source of truth for deployed environments.

**Stage 1 variables:**

- **Postgres** (Postgres container init) - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`. Consumed by the upstream `postgres:16` image at first boot to initialize the database role and DB.
- **Postgres** (Django container) - `SQL_HOST` (`localhost` in-task), `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`, `SQL_PORT`. Same credentials as the Postgres container init values; Django connects with them.
- **Django** - `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DJANGO_DEBUG`.
- **Next.js runtime** - server-only values for server actions; `NEXT_PUBLIC_*` for browser-exposed values.

**Stage 2 variables (added when Cognito + PeopleDepot integration lands):**

- **Cognito** - `COGNITO_AWS_REGION`, `COGNITO_USER_POOL`, `COGNITO_APP_CLIENT_ID`. The JWKS URL is derived from region + pool ID at startup. Consumed by both containers; Next.js additionally exposes `NEXT_PUBLIC_COGNITO_CLIENT_ID` and the hosted-UI domain to the browser.
- **PeopleDepot** - base URL and any auth credentials required by the integration surface.

Variable *values* - Cognito pool IDs, PeopleDepot endpoints, Postgres credentials, etc. - are owned by the DevOps CoP and live in Terraform-managed configuration, not in this doc.

## DNS

The stage environment is reachable at https://stage.civictechjobs.org/. The zone (`civictechjobs.org`) and records are managed in Route53 via Terraform in the Incubator repository.

## Local equivalents

The local stage approximation lives in [docker-compose.stage.yml](https://github.com/hackforla/CivicTechJobs/blob/main/docker-compose.stage.yml) and the per-container Dockerfiles under `stage/`. See the [DevOps Architecture](devops.md) doc for the local stage build process.

## Additional Resources

- [Incubator Terraform module for CTJ](https://github.com/hackforla/incubator/tree/main/terraform/projects/civic-tech-jobs)
- [AWS ECS Fargate documentation](https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html)
