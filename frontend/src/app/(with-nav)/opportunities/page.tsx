/**
 * Opportunity listing route at `/opportunities`.
 *
 * Renders inside the `(with-nav)` route group's layout. Defers to the
 * `OpportunityListPage` feature component, which renders the
 * Opportunity listing card. Live data fetching will replace the
 * sample source once the auth-gated `/api/opportunities/` client
 * lands.
 */

import { OpportunityListPage } from "@/features/opportunities/components/OpportunityListPage";

export default function Page() {
  return <OpportunityListPage />;
}
