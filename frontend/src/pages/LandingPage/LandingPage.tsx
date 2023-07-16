// External Imports
import React, { Fragment } from "react";

import { LandingPageIntro } from "./LandingPageIntro";
import { LandingPageCop } from "./LandingPageCop";

function LandingPage() {
  return (
    <Fragment>
      <main>
        <LandingPageIntro />
        <LandingPageCop />
      </main>
    </Fragment>
  );
}

export { LandingPage };
