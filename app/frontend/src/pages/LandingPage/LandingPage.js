import React, { Fragment, useState, useEffect } from "react";

import {
  landingPageFg,
  iconDownArrow,
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
} from "assets/images/images";

import {
  Button,
  CircleCard,
  CopCard,
  Dialog,
  HeaderNav,
  FooterNav,
  InnerCopCard,
} from "components/components";

import { fetchAllCopData, fetchCopDataById } from "./copData";
import { InnerCopNav } from "./InnerCopNav";

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

function LandingPageIntro() {
  const LandingImage = () => {
    return (
      <div className="landing-image-parent">
        <div className="svg-group-layer">
          <img className="landing-group-image " src={landingPageFg} />
        </div>
      </div>
    );
  };

  return (
    <div className="text-center">
      <div className="landing-top-content px-4">
        <h1 className="title-1 landing-header-title m-0">
          Together,
          <br />
          we can create greater civic change
        </h1>
        <p className="mb-5 paragraph-1 landing-head-paragraph">
          CivicTechJobs unites ambitious technology practitioners with volunteer
          opportunities from a central hub of listings to build digital
          products, programs, and services.
        </p>
        <Button length="long" size="lg" addClass="landing-action-btn">
          Join us
        </Button>
      </div>
      <LandingImage />
      <div className="landing-mission-section flex-container">
        <div className="landing-mission-content px-4 align-center text-center">
          <img className="down-arrow mb-3" src={iconDownArrow} />
          <h1 className="title-2 landing-mission-title">Our Misson</h1>
          <p className="paragraph-2 mission-paragraph">
            We bring together civic-minded volunteers from diverse backgrounds
            such as YOU to help local communities and governments. Thanks to the
            power of our volunteers, we are able to positively impact the
            communities of Los Angeles region and beyond!
          </p>
        </div>
      </div>
    </div>
  );
}

function LandingPageCop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copData, setCopData] = useState([]);
  const [currentDatum, setCurrentDatum] = useState({});

  useEffect(() => {
    setCopData(fetchAllCopData());
  }, []);

  function handleCopData(id) {
    const copDatum = fetchCopDataById(id);
    setCurrentDatum(copDatum);
  }

  return (
    <div className="flex-container align-center justify-center my-5">
      <div className="title-2 col-12 text-center my-4">
        Communities of Practice (COP)
      </div>
      <div className="row paragraph-1 text-center mb-5 landing-cop-description">
        A Community of Practice (CoP) is a group of volunteers who share a
        common interest in a topic and meet regularly to fulfill both individual
        and group goals. We use CoPs to share effective practices and relevant
        domain knowledge to help our members grow.
      </div>
      <div className="row m-5 landing-cop-circle-container">
        {copData.map((cop) => {
          return (
            <CircleCard
              key={cop.id}
              size="lg"
              addClass="m-4"
              onClick={() => {
                handleCopData(cop.id);
                setIsModalOpen(true);
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="pb-3 row justify-center">
                  <cop.icon strokeWidth="0.2" height="65" />
                </div>
                <div className="title-4 landing-cop-circle-title text-center">
                  {cop.title}
                </div>
              </div>
            </CircleCard>
          );
        })}
      </div>
      <Dialog open={isModalOpen}>
        <CopCard hidden={false} size="lg" onClick={() => setIsModalOpen(false)}>
          <div className="flex-container">
            <div className="col-3">
              <InnerCopNav
                activeCop={currentDatum.id}
                copData={copData}
                onClick={(id) => handleCopData(id)}
              ></InnerCopNav>
            </div>
            <div className="col-9 ml-2">
              <InnerCopCard>
                <div className="title-3">{currentDatum.title}</div>
                {currentDatum.description}
              </InnerCopCard>
            </div>
          </div>
        </CopCard>
      </Dialog>
    </div>
  );
}

export { LandingPage };
