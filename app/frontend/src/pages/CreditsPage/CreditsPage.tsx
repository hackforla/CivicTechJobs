// External Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
  logoHfla,
  creditsPageFg,
} from "assets/images/images";
import { HeaderNav, FooterNav, Chip, Card } from "components/components";
import { illustrations, iconography, creditsData } from "./creditsData";
import { combineClasses } from "components/Utility/utils";

function CreditsPage() {
  const [currentCreditsType, setcurrentCreditsType] = useState("Illustrations");

  const creditsTypes: { [key: string]: any } = {
    Illustrations: illustrations,
    Iconography: iconography,
  };

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
          <div className="col-5">
            <h1 className="mb-3 mt-0">Credits</h1>
            <p className="paragraph-1 mt-0">
              Thank you to all of the artists and sponsors who help make our
              projects successful. Check out all of the illustrations and
              iconography we have used on our site.
            </p>
          </div>
          <div className="col-7 ml-4">
            <img src={creditsPageFg} className="py-5" width="100%" />
          </div>
        </div>
        <h2 className="mt-5 mb-3">Illustrations & Iconography</h2>
        <div className="row">
          {["Illustrations", "Iconography"].map((creditsType) => {
            return (
              <Chip
                addClass="mr-5"
                checked={creditsType == currentCreditsType}
                value={creditsType}
                onChange={(active) => {
                  if (active) setcurrentCreditsType(creditsType);
                }}
              />
            );
          })}
        </div>
        <div className="credits-cards">
          {(creditsTypes[currentCreditsType] || illustrations).map(
            (data: creditsData) => {
              return <CreditsCard data={data} />;
            }
          )}
        </div>
        <div className="row justify-center py-5">
          <div className="row col-6">
            <img src={logoHfla} width="72" />
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

interface CreditsCardProps {
  data: creditsData;
}

function CreditsCard({ data, ...props }: CreditsCardProps) {
  interface TextProps {
    categoryKey: string;
    categoryValue: string;
  }

  function Text({ categoryKey, categoryValue, ...props }: TextProps) {
    return (
      <div className="row">
        <div className="col-6">
          <span className="title-6">{categoryKey}:</span>
        </div>
        <div className="col-6">
          <span>{categoryValue}</span>
        </div>
      </div>
    );
  }

  function Image({ creditSrc, ...props }: { creditSrc: any }) {
    return (
      <div className="credits-card-circle flex-container align-center mb-3">
        <img src={creditSrc} width="100%" />
      </div>
    );
  }

  return (
    <Card addClass="credits-card p-5 my-5">
      <Image creditSrc={data.src} />
      <Text categoryKey="Name" categoryValue={data.name} />
      <Text categoryKey="Used In" categoryValue="Credits Page" />
      <Text categoryKey="Provider" categoryValue={data.provider} />
      <a
        href={data.url}
        className="credits-card-links mt-4 mb-5"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </a>
    </Card>
  );
}

export { CreditsPage };
