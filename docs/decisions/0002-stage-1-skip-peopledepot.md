# ADR-0002: Stage 1 skips PeopleDepot integration

**Status:** Accepted
**Date:** 2026-05-02

## Context

PeopleDepot (PD) is HfLA's centralized reference-data service. It owns the canonical records for users, projects, practice areas, and (eventually) skills across all HfLA volunteer projects. The CTJ rewrite's eventual end state (Stage 2) depends on PD: user identity comes from PD via Cognito ID-token, projects/roles/practice-areas are sourced from PD at request time, and the skill catalog is synced from PD into a local cache.

PD's prod-deployment posture is unstable upstream ([PeopleDepot Issue #218](https://github.com/hackforla/peopledepot/issues/218)). The OAuth/Cognito JWT-validation flow CTJ would consume is not finalized; PD's API surface is in flux; the data shapes for users/projects/roles aren't locked.

Building CTJ against PD now would mean either pinning to an in-flight PD shape (high churn, integration tax compounds with every PD change) or shimming PD with mocks (carrying the cost of building a fake PD that doesn't validate against the real one).

## Decision

**Stage 1 of the rewrite ships without any PeopleDepot integration. CTJ owns its own User table (via Django's `AbstractUser`-based `CustomUser`), its own Skills catalog, its own Project and Role tables, and uses Django session authentication. PeopleDepot integration is Stage 2, gated on PD's upstream posture stabilizing.**

Concretely, Stage 1:

- `CustomUser` extends `AbstractUser` and is the auth user model. Identity fields (name, email) are locally editable.
- `Skill`, `Role`, `Project`, `CommunityOfPractice` tables are locally curated through Django admin.
- `people_depot_user_id` and `people_depot_project_id` columns exist on `CustomUser` and `Project` as forward-compatibility hooks; in Stage 1 they hold local placeholder strings. In Stage 2 they become real PD UUIDs and the local fields become PD-synced.
- Auth is Django's session + cookie machinery; no Cognito JWT validation.

Stage 2 (deferred) will add a custom DRF authentication backend at `ctj_api/auth.py` that validates Cognito JWTs, a PD client at `ctj_api/clients/peopledepot.py`, a periodic sync job that updates the local Skill catalog from PD, and backfill logic to populate `people_depot_*_id` columns from PD lookups.

## Alternatives considered

- **Integrate PD immediately.** Build CTJ against the in-flight PD API. Discarded because PD's prod posture isn't ready; CTJ would either pin to a snapshot (high integration tax) or chase PD's surface as it changes. Either path also blocks CTJ progress on PD's release schedule.

- **Shim PD with mocks.** Build a fake PD service that CTJ talks to in Stage 1; replace with the real PD in Stage 2. Discarded because the shim carries its own maintenance cost (someone has to keep the fake aligned with the real PD's evolving shape) without producing forward progress. The shim's behavior at integration time would not have been validated against real PD anyway.

- **Defer auth + PD work entirely; ship a PM-only / admin-curated phase.** Effectively what was chosen, except the auth surface is included in Stage 1's eventual scope. The Stage 1 user model (`CustomUser` with `isProjectManager` flag) is real-user-facing, not admin-only.

- **Adopt PD-shaped types but ignore PD-shaped runtime.** Build CTJ's models with PD's UUID types and naming as if PD existed, just not connected. Partially adopted (`people_depot_user_id` and `people_depot_project_id` columns) as forward-compat hooks; the rest of the schema is shaped for CTJ's local needs.

## Consequences

**Accepted:**

- CTJ's Stage 1 User and reference tables drift from PD's eventual shape. The Stage 2 migration has to reconcile (e.g. backfill `people_depot_user_id` for users who signed up locally; deduplicate users who exist in both stores). Mitigated by treating Stage 1 as a finite-lifetime data layer.

- Stage 2 work is real, not "flip a flag." The Cognito validation backend, PD client, sync job, and backfill all need to be built when PD is ready.

- The `people_depot_*_id` columns exist on Stage 1 rows with placeholder values that will be rewritten in Stage 2. Anyone joining on those fields needs to know they're not authoritative yet.

- Documentation makes the staging explicit: every model, every endpoint, every auth surface either says "Stage 1 only" or describes what changes in Stage 2.

**Won:**

- CTJ can ship Stage 1 without waiting for PD. The schedule is decoupled.

- Stage 1's data model is shaped for CTJ's actual needs (recruitment matching, qualifier flow), not for PD's reference-data shape.

- New volunteers can sign up, complete the qualifier flow, and use the matching engine without any PD-side dependency. This is the MVP.
