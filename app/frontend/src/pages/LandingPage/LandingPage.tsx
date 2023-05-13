// External Imports
import React, { Fragment } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
} from "assets/images/images";
import { HeaderNav, FooterNav } from "components/components";
import { LandingPageIntro } from "./LandingPageIntro";
import { LandingPageCop } from "./LandingPageCop";

function LandingPage() {
  return (
    <Fragment>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "https://www.hackforla.org/" },
          {
            name: "How to Join",
            link: "https://www.hackforla.org/getting-started",
          },
          { name: "Projects", link: "https://www.hackforla.org/projects/" },
        ]}
      />
      <main>
        <LandingPageIntro />
        <LandingPageCop />
      </main>
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" },
        ]}
      />
    </Fragment>
  );
}

export { LandingPage };
