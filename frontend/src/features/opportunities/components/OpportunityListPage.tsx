/**
 * Top-level component for the `/opportunities` listing page.
 *
 * Two-column layout matching the Figma: a sticky filter sidebar on
 * the left and a results column on the right (results count + card
 * list). Currently renders the reshaped Opportunity card against
 * static sample data (see `sampleOpportunities`) and a stand-in
 * current user (see `sampleCurrentUser`) that the Availability and
 * Skills filters compare against. Both sample sources go away in the
 * same swap once the API client + auth wire-up land.
 *
 * Mounted by `/opportunities` in the `(with-nav)` route group.
 */

"use client";

import { useMemo, useState } from "react";

import { sampleCurrentUser } from "@/features/opportunities/data/sampleCurrentUser";
import { sampleOpportunities } from "@/features/opportunities/data/sampleOpportunities";
import { applyOpportunityFilters } from "@/features/opportunities/lib/filters";
import Typography from "@/shared/components/Typography";

import { OpportunityCard } from "./OpportunityCard";
import { OpportunityFilters } from "./OpportunityFilters";
import styles from "./OpportunityListPage.module.css";

import type {
  OpportunityFilterState,
  SkillsFilterMode,
} from "@/features/opportunities/lib/filters";

const INITIAL_FILTERS: OpportunityFilterState = {
  availability: false,
  projectQuery: "",
  skillsMode: "off",
};

function OpportunityListPage() {
  const [filters, setFilters] =
    useState<OpportunityFilterState>(INITIAL_FILTERS);

  const visibleOpportunities = useMemo(
    () =>
      applyOpportunityFilters(sampleOpportunities, sampleCurrentUser, filters),
    [filters],
  );

  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <Typography.Title3>Opportunities</Typography.Title3>
        <Typography.Paragraph3 className={styles.subtitle}>
          Listing preview &mdash; static sample data. In the app this surface
          requires sign-in (no public listings).
        </Typography.Paragraph3>
      </header>

      <div className={styles.layout}>
        <div className={styles.filterRail}>
          <OpportunityFilters
            filters={filters}
            onAvailabilityChange={(availability) =>
              setFilters((prev) => ({ ...prev, availability }))
            }
            onProjectQueryChange={(projectQuery) =>
              setFilters((prev) => ({ ...prev, projectQuery }))
            }
            onSkillsModeChange={(skillsMode: SkillsFilterMode) =>
              setFilters((prev) => ({ ...prev, skillsMode }))
            }
            onClearAll={() => setFilters(INITIAL_FILTERS)}
          />
        </div>

        <section className={styles.results} aria-label="Opportunity results">
          <Typography.Paragraph3 className={styles.resultsCount}>
            {visibleOpportunities.length}{" "}
            {visibleOpportunities.length === 1 ? "result" : "results"}
          </Typography.Paragraph3>

          <div className={styles.list}>
            {visibleOpportunities.length === 0 ? (
              <Typography.Paragraph3 className={styles.empty}>
                No opportunities match the current filters.
              </Typography.Paragraph3>
            ) : (
              visibleOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export { OpportunityListPage };
