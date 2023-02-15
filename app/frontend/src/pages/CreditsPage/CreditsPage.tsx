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
            value="Illustrations"
            onChange={() => console.log("ill")}
          ></Chip>
          <Chip value="Iconography" onChange={() => console.log("icon")}></Chip>
        </div>
        <CreditsRow addClass="my-5" data={["flute", "drums", "snare"]} />
        <CreditsRow addClass="my-5" data={["hello", "hola", "konichiwa"]} />
        <CreditsRow addClass="my-5" data={["celery", "carrot", "onion"]} />
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

interface CreditsRowProps {
  addClass: string;
  data: [string, string, string];
}

function CreditsRow({ addClass, data, ...props }: CreditsRowProps) {
  return (
    <div className={combineClasses("credits-cards", addClass)}>
      {data.map((datum) => {
        return <CreditsCard>{datum}</CreditsCard>;
      })}
    </div>
  );
}

function CreditsCard({ ...props }) {
  return <Card addClass="credits-card col-3 p-5">{props.children}</Card>;
}

export { CreditsPage };
