// External Imports
import React, { Fragment } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
  HowToJoin
} from "assets/images/images";
import { HeaderNav, FooterNav } from "components/components";
import { Card } from "components/Cards/StandardCard";

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
        <div className="text-center credits-intro-container">
          <div className="text-container text-left">
            <h1 className="credits-intro-title mb-3">Credits</h1>
            <p className="paragraph-1 credits-intro-paragraph">
              Thank you to all of the artists and sponsors who help make our
              projects successful. Check out all of the illustrations and
              iconography we have used on our site.
            </p>
          </div>
        </div>
        <div className="credits-test">CreditsPage</div>
        <div className="credits-join-us-container"></div>
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
