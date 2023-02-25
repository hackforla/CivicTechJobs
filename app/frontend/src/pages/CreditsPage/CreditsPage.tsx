// External Imports
import React, { Fragment } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
  logoHfla,
  creditsPageFg,
} from "assets/images/images";
import { HeaderNav, FooterNav } from "components/components";
import { CreditsCards } from "./CreditsPageCreditsCards";

function CreditsPage() {
  return (
    <Fragment>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "/" },
          { name: "How to Join", link: "/qualifier" },
          { name: "Projects", link: "/demo" },
        ]}
      />
      <main className="flex-column px-5">
        <div className="row align-center">
          <div className="col-6">
            <h1 className="mb-3 mt-0">Credits</h1>
            <p className="paragraph-1 mt-0">
              Thank you to all of the artists and sponsors who help make our
              projects successful. Check out all of the illustrations and
              iconography we have used on our site.
            </p>
          </div>
          <div className="col-6 ml-4">
            <img src={creditsPageFg} className="py-5" width="100%" alt="" />
          </div>
        </div>
        <h2 className="mt-5 mb-3">Illustrations & Iconography</h2>
        <CreditsCards />
        <div className="row justify-center py-5">
          <div className="row col-6">
            <img src={logoHfla} width="72" alt="HackForLA logo" />
            <div className="pl-3">
              <h3>Join Us!</h3>
              <p className="paragraph-2">
                Civic Tech Jobs is one of the many projects at{" "}
                <a href="https://www.hackforla.org/">Hack for LA</a>, Code for
                America's Los Angeles chapter.
              </p>
            </div>
          </div>
        </div>
      </main>
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/credits" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" },
        ]}
      />
    </Fragment>
  );
}

export { CreditsPage };
