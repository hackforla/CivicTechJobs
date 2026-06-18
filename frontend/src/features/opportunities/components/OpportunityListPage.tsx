/**
 * Top-level component for the `/opportunities` listing page.
 *
 * Currently renders the reshaped Opportunity card against static
 * sample data (see `sampleOpportunities`). The sample source will be
 * swapped for a live fetch of the auth-gated `/api/opportunities/`
 * endpoint once the API client lands.
 *
 * Mounted by `/opportunities` in the `(with-nav)` route group.
 */

import { sampleOpportunities } from "@/features/opportunities/data/sampleOpportunities";
import Typography from "@/shared/components/Typography";

import { OpportunityCard } from "./OpportunityCard";
import styles from "./OpportunityListPage.module.css";

function OpportunityListPage() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <Typography.Title3>Opportunities</Typography.Title3>
        <Typography.Paragraph3 className={styles.subtitle}>
          Listing preview &mdash; static sample data. In the app this surface
          requires sign-in (no public listings).
        </Typography.Paragraph3>
      </header>

      <section className={styles.list}>
        {sampleOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </section>
    </main>
  );
}

export { OpportunityListPage };
