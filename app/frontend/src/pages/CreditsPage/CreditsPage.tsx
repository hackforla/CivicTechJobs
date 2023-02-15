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
import { illustrations, iconnography } from "./creditsData";
import { combineClasses } from "components/Utility/utils";

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
        <h1 className="mb-3">Credits</h1>
        <div className="row">
          <p className="paragraph-1 col-6 mt-0">
            Thank you to all of the artists and sponsors who help make our
            projects successful. Check out all of the illustrations and
            iconography we have used on our site.
          </p>
          <div className="col-6 ovflow-hidden">
            <img src={logoHorizontal} width="100%" />
          </div>
        </div>
        <h2 className="mt-5 mb-3">Illustrations & Iconography</h2>
        <div className="row">
          <Chip
            addClass="mr-5"
            value="Illustrations"
            onChange={() => console.log("ill")}
          />
          <Chip value="Iconography" onChange={() => console.log("icon")} />
        </div>
        <div className="credits-cards">
          {iconnography.map((data) => {
            return (
              <CreditsCard>
                <div className="row">
                  <div className="col-6">
                    <span className="title-6">Name:</span>
                  </div>
                  <div className="col-6">
                    <span>{data.name}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <span className="title-6">Used In:</span>
                  </div>
                  <div className="col-6">
                    <span>{"Credits Page"}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <span className="title-6">Provider:</span>
                  </div>
                  <div className="col-6">
                    <span>{data.provider}</span>
                  </div>
                </div>
              </CreditsCard>
            );
          })}
        </div>
        <div className="row justify-center py-5">
          <div className="row col-6">
            <img src={logoHorizontal} width="72" />
            <div className="pl-3">
              <h3>Join Us!</h3>
              <p className="paragraph-2">
                Civic Tech Jobs is one of the many projects at Hack for LA, Code
                for America's Los Angeles chapter.
              </p>
            </div>
          </div>
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
    </Fragment>
  );
}

function CreditsCard({ ...props }) {
  return <Card addClass="credits-card p-5 my-5">{props.children}</Card>;
}

export { CreditsPage };
