# CivicTechJobs

CivicTechJobs is a [Hack for LA](https://www.hackforla.org/) project: a platform connecting prospective HfLA volunteers with project opportunities that match their skills, availability, and program area.

## What CivicTechJobs is

CivicTechJobs is a skill-matching layer on top of HfLA's volunteer ecosystem. Project managers post opportunities with skill requirements; volunteers register their skills with proficiency levels; the platform matches the two.

## Why

HfLA's project recruitment currently happens through a mix of Slack threads, ad-hoc conversations, and coordination at the Community-of-Practice (CoP) level. That works at small scale but doesn't surface the right candidates efficiently as the org grows. A dedicated matching layer reduces friction for both PMs (clearer signal about who's available with what skills) and volunteers (clearer signal about which projects match their goals).

## How it's different from existing recruitment

The current process involves several manual steps for both sides. CivicTechJobs streamlines this by:

- Letting PMs post opportunities directly through a CMS without any custom UI work.
- Letting volunteers self-filter roles by availability, skill level, and CoP.
- Surfacing matched opportunities ranked by skill-fit.

## Guiding objectives

1. Give project managers a low-friction way to post, edit, and close open positions.
2. Help potential volunteers self-filter roles based on availability and skills.
3. Surface a ranked list of relevant opportunities to each volunteer.

## Stack

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript 5, styled with CSS Modules.
- **Backend**: Django 5.1 + Django REST Framework 3.15, served via Daphne (ASGI).
- **Database**: PostgreSQL 16.
- **Deployment**: AWS ECS (three containers in one task) on Hack for LA's Incubator account.

See [docs/developer/](docs/developer/) for the full architecture writeup.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow. Short version:

- **Developers**: see the [installation guide](docs/developer/installation.md) and [quickstart](docs/developer/quickstart-guide.md). PRs go against `develop`, not `main`.
- **UX, design, PM**: see [docs/joining-the-team/intro.md](docs/joining-the-team/intro.md) and the broader HfLA onboarding flow.
- Issues land on the [Hack for LA project board](https://github.com/orgs/hackforla/projects/37). New contributor work always branches off `develop`.

## Documentation

Developer docs live in [docs/developer/](docs/developer/):

- [Backend Architecture](docs/developer/backend.md)
- [DevOps Architecture](docs/developer/devops.md)
- [Deployment & Infrastructure](docs/developer/deployment-infra.md)
- [Design System](docs/developer/design-system.md)
- [ESLint Guide](docs/developer/eslint-guide.md)
- [Git Branch Structure](docs/developer/git-branch-structure.md)
- [Installation](docs/developer/installation.md)
- [Quickstart Guide](docs/developer/quickstart-guide.md)

For project resources (Figma, Drive, Slack, board), see [docs/resources.md](docs/resources.md).

## Project context

Slack: `#civictechjobs` and `#civictechjobs-dev`. Team meetings happen at the project's regular checkpoint cadence; new contributors can drop into the Slack channels to introduce themselves.
