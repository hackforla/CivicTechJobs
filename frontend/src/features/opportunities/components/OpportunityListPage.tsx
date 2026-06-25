/**
 * Top-level component for the `/opportunities` listing page.
 *
 * Two-column layout matching the Figma: a sticky filter sidebar on
 * the left and a results column on the right (results count + card
 * list). Reads live data:
 *   - `useAuth()` for the signed-in user (filter user-side input).
 *   - `opportunitiesApi.list()` for the listing (server-filtered to
 *     `status="open"` opportunities).
 *
 * State branches handled explicitly:
 *   - auth loading -> "Loading..." stub
 *   - anonymous (auth resolved, no user) -> sign-in prompt with link
 *     to `/login`
 *   - opportunities loading -> "Loading..." stub
 *   - opportunities fetch error -> error stub with message
 *   - signed in, opportunities fetched, zero rows after filtering ->
 *     existing "No opportunities match" message
 *
 * Mounted by `/opportunities` in the `(with-nav)` route group.
 */

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { applyOpportunityFilters } from "@/features/opportunities/lib/filters";
import Typography from "@/shared/components/Typography";
import { useAuth } from "@/shared/contexts/AuthContext";
import { ApiError } from "@/shared/lib/api/client";
import { opportunitiesApi } from "@/shared/lib/api/opportunities";

import { OpportunityCard } from "./OpportunityCard";
import { OpportunityFilters } from "./OpportunityFilters";
import styles from "./OpportunityListPage.module.css";

import type {
  OpportunityFilterState,
  SkillsFilterMode,
} from "@/features/opportunities/lib/filters";
import type { Opportunity } from "@/shared/lib/api/opportunities";

const INITIAL_FILTERS: OpportunityFilterState = {
  availability: false,
  projectQuery: "",
  skillsMode: "off",
};

function OpportunityListPage() {
  const { user, loading: authLoading } = useAuth();
  const [filters, setFilters] =
    useState<OpportunityFilterState>(INITIAL_FILTERS);
  const [opportunities, setOpportunities] = useState<Opportunity[] | null>(
    null,
  );
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    opportunitiesApi
      .list()
      .then((rows) => {
        if (!cancelled) setOpportunities(rows);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message =
          err instanceof ApiError
            ? err.message
            : "Failed to load opportunities.";
        setFetchError(message);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const visibleOpportunities = useMemo(() => {
    if (!user || !opportunities) return [];
    return applyOpportunityFilters(opportunities, user, filters);
  }, [opportunities, user, filters]);

  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <Typography.Title3>Opportunities</Typography.Title3>
        <Typography.Paragraph3 className={styles.subtitle}>
          Open project roles across Hack for LA. Sign-in required.
        </Typography.Paragraph3>
      </header>

      {authLoading ? (
        <Typography.Paragraph3 className={styles.notice}>
          Loading...
        </Typography.Paragraph3>
      ) : !user ? (
        <Typography.Paragraph3 className={styles.notice}>
          <Link href="/login">Sign in</Link> to view open opportunities.
        </Typography.Paragraph3>
      ) : (
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
            {fetchError ? (
              <Typography.Paragraph3 className={styles.notice}>
                {fetchError}
              </Typography.Paragraph3>
            ) : opportunities === null ? (
              <Typography.Paragraph3 className={styles.notice}>
                Loading opportunities...
              </Typography.Paragraph3>
            ) : (
              <>
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
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export { OpportunityListPage };
