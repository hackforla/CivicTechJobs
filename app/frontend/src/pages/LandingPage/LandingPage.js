import React, { Fragment } from "react";

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
          { name: "Hack for LA", link: "/" },
          { name: "How to Join", link: "/" },
          { name: "Projects", link: "/" },
        ]}
      />
      <LandingPageIntro />
      <LandingPageCop />
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
