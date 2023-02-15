// External Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
} from "assets/images/images";
import {
  ProgressBar,
  HeaderNav,
  FooterNav,
  Chip,
  Card,
} from "components/components";

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
      <main className="flex-column">
        <h1>Credits</h1>
        <div className="row">
          <p className="paragraph-1 col-6">
            Thank you to all of the artists and sponsors who help make our
            projects successful. Check out all of the illustrations and
            iconography we have used on our site.
          </p>
          <div className="col-6 ovflow-hidden">
            <img src={logoHorizontal} />
          </div>
        </div>
        <h2>Illustrations & Iconography</h2>
        <div className="row">
          <Chip
            value="Illustrations"
            onChange={() => console.log("ill")}
          ></Chip>
          <Chip value="Iconography" onChange={() => console.log("icon")}></Chip>
        </div>
        <div className="credits-cards my-5">
          <CreditsCard>Hello</CreditsCard>
          <CreditsCard>Hello</CreditsCard>
          <CreditsCard>Hello</CreditsCard>
        </div>
        <div className="credits-cards my-5">
          <CreditsCard>Hello</CreditsCard>
          <CreditsCard>Hello</CreditsCard>
          <CreditsCard>Hello</CreditsCard>
        </div>
        <h3>Join Us!</h3>
        <p className="paragraph-2">
          Civic Tech Jobs is one of the many projects at Hack for LA, Code for
          America's Los Angeles chapter.
        </p>
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

function CreditsCard({ ...props }) {
  return <Card addClass="credits-card col-3 p-5">{props.children}</Card>;
}

export { CreditsPage };
