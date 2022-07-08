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
var pattern1 = /\x00/;
var pattern2 = /\x0C/;
const n = 4;
let a;
if (n === 1) {
  a = 1;
} else if (n === 2) {
  a = 1;
} else if (n === 3) {
  a = 1;
} else if (n === 2) {
  a = 1;
} else if (n === 5) {
  a = 1;
}

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
