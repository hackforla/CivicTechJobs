/**
 * Typed wrappers for the `/api/opportunities/` endpoint.
 *
 * Mirrors `ctj_api.serializers.OpportunityReadSerializer`. The
 * derived display fields `role_title` (from `role.title`) and
 * `skill_names` (alphabetically-sorted skill names resolved from
 * `skills_required_matrix`) save the listing card from N+1
 * lookups against `/api/roles/` and `/api/skills/`; the underlying
 * `role` and `skills_required_matrix` UUIDs stay on the wire for
 * matching-algorithm consumers.
 *
 * The list action filters to `status="open"` server-side
 * (`OpportunityViewSet.get_queryset`) - the listing surface is the
 * volunteer-facing catalog, drafts / on-hold / filled / closed
 * aren't part of it. Retrieve still returns any single opportunity
 * (the PM CMS will read off retrieve later).
 *
 * All wrappers use the shared `apiFetch` client.
 */

import { apiFetch } from "./client";

type OpportunityStatus = "open" | "closed" | "on_hold" | "filled" | "draft";

export type WorkEnvironment = "remote" | "hybrid" | "in_person";

/**
 * One meeting slot on an opportunity. `Opportunity.meeting_times`
 * is a list of these. Parallels `User.meeting_availability` shape
 * minus the `team` key (opportunity-side metadata).
 */
interface MeetingSlot {
  team: string;
  day: string;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

/**
 * Read shape of an opportunity. Mirrors
 * `OpportunityReadSerializer.Meta.fields`.
 */
export type Opportunity = {
  id: string;
  project_name: string;
  role: string;
  role_title: string;
  overview: string;
  body: string;
  responsibilities: string;
  min_experience_required: string;
  min_hours_required: number;
  work_environment: WorkEnvironment;
  meeting_times: MeetingSlot[] | null;
  skills_required_matrix: string | null;
  skill_names: string[];
  status: OpportunityStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export const opportunitiesApi = {
  /** List opportunities (server-filtered to `status="open"`). */
  list: () => apiFetch<Opportunity[]>("/api/opportunities/"),

  /** Retrieve a single opportunity by UUID (any status). */
  retrieve: (id: string) => apiFetch<Opportunity>(`/api/opportunities/${id}/`),
};
