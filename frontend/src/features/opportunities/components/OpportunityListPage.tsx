/**
 * Top-level component for the `/opportunities` listing page.
 *
 * Currently renders the reshaped Opportunity card against static
 * sample data (see `sampleOpportunities`) and a stand-in current user
 * (see `sampleCurrentUser`) that the Availability and Skills filters
 * compare against. The sample sources will be swapped for a live
 * fetch of the auth-gated `/api/opportunities/` endpoint and the
 * signed-in user once the API client lands.
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
      />

      <section className={styles.list}>
        {visibleOpportunities.length === 0 ? (
          <Typography.Paragraph3 className={styles.empty}>
            No opportunities match the current filters.
          </Typography.Paragraph3>
        ) : (
          visibleOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))
        )}
      </section>
    </main>
  );
}

export { OpportunityListPage };
