/**
 * Filter predicates for the `/opportunities` listing surface.
 *
 * Encodes the filter contract from the spec (`blah.`):
 *   - Availability ON/OFF. ON keeps an opportunity if the user can
 *     attend at least one of its meeting times. Opportunities with
 *     no `meeting_times` set (null) never pass when ON, since we
 *     have no slot to match against.
 *   - Project: free-text substring match against `project_name`
 *     (case-insensitive, trimmed). Empty query is a no-op.
 *   - Skills OFF / Partial Match (30% threshold). Partial match
 *     keeps an opportunity if at least 30% of its `skill_names`
 *     also appear in the user's `skill_names` (case-insensitive set
 *     overlap); opportunities with no skills always pass to avoid
 *     hiding listings that haven't tagged any.
 *
 * Pure functions over the live wire shapes (`Opportunity` from
 * `opportunitiesApi` and the current `User` off the auth context).
 */

import type { User } from "@/shared/lib/api/auth";
import type { Opportunity } from "@/shared/lib/api/opportunities";

export type SkillsFilterMode = "off" | "partial_match";

export interface OpportunityFilterState {
  availability: boolean;
  projectQuery: string;
  skillsMode: SkillsFilterMode;
}

const SKILL_PARTIAL_MATCH_THRESHOLD = 0.3;

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function intervalsOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return (
    Math.max(timeToMinutes(aStart), timeToMinutes(bStart)) <
    Math.min(timeToMinutes(aEnd), timeToMinutes(bEnd))
  );
}

function matchesAvailability(opportunity: Opportunity, user: User): boolean {
  if (!opportunity.meeting_times || !user.meeting_availability) return false;
  return opportunity.meeting_times.some((slot) =>
    user.meeting_availability!.some(
      (window) =>
        window.day.toLowerCase() === slot.day.toLowerCase() &&
        intervalsOverlap(slot.start, slot.end, window.start, window.end),
    ),
  );
}

function matchesProject(opportunity: Opportunity, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  return opportunity.project_name.toLowerCase().includes(trimmed);
}

function matchesSkills(
  opportunity: Opportunity,
  user: User,
  mode: SkillsFilterMode,
): boolean {
  if (mode === "off") return true;
  // Don't hide opportunities that haven't tagged any skills - we have
  // no signal to score them against, and excluding them would surprise.
  if (opportunity.skill_names.length === 0) return true;
  const userSkills = new Set(user.skill_names.map((s) => s.toLowerCase()));
  const overlap = opportunity.skill_names.filter((skill) =>
    userSkills.has(skill.toLowerCase()),
  ).length;
  return (
    overlap / opportunity.skill_names.length >= SKILL_PARTIAL_MATCH_THRESHOLD
  );
}

export function applyOpportunityFilters(
  opportunities: Opportunity[],
  user: User,
  filters: OpportunityFilterState,
): Opportunity[] {
  return opportunities.filter((opportunity) => {
    if (filters.availability && !matchesAvailability(opportunity, user)) {
      return false;
    }
    if (!matchesProject(opportunity, filters.projectQuery)) {
      return false;
    }
    if (!matchesSkills(opportunity, user, filters.skillsMode)) {
      return false;
    }
    return true;
  });
}
