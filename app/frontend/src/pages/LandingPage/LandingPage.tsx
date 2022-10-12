// External Imports
import React, { Fragment, Suspense } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark
} from "assets/images/images";
import { HeaderNav, FooterNav } from "components/components";
const LandingPageIntro = React.lazy(() => import("./LandingPageIntro"));
import LandingPageCop from "./LandingPageCop";

function LandingPage() {
  return (
    <Fragment>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "/" },
          { name: "How to Join", link: "/qualifier" },
          { name: "Projects", link: "/demo" }
        ]}
      />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPageIntro />
        </Suspense>
        <LandingPageCop />
      </main>
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" }
        ]}
      />
    </Fragment>
  );
}

export { LandingPage };
