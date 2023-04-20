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

const CreditsPage = () => {
  return (
    <>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "/" },
          { name: "How to Join", link: "/qualifier/1" },
          { name: "Projects", link: "/demo" },
        ]}
      />
      <main>
        <div className="credits-intro-container">

        </div>
        <div className="credits-test">CreditsPage</div>
        <div className="credits-join-us-container">
          
        </div>
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
    </>
  );
};
export { CreditsPage };
