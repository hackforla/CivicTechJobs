/**
 * Landing page top-level component.
 *
 * Composes the two main sections: `LandingPageIntro` (hero with
 * CTA) and `LandingPageCop` (Communities-of-Practice showcase).
 * Mounted by `/` in the `(with-nav)` route group.
 */

import { LandingPageCop } from "./LandingPageCop";
import { LandingPageIntro } from "./LandingPageIntro";

function LandingPage() {
  return (
    <main>
      <LandingPageIntro />
      <LandingPageCop />
    </main>
  );
}

export { LandingPage };
