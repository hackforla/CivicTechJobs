import React, { Fragment } from "react";
import {
  landingPageFg,
  iconDownArrow,
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
} from "assets/images/images";
import { Button, HeaderNav, FooterNav } from "components/components";

function LandingPage() {
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
      <div className="text-center flex-container justify-center">
        <div className="landing-top-content px-4">
          <h1 className="title-1 landing-header-title m-0">
            Together,
            <br />
            we can create greater civic change
          </h1>
          <p className="mb-5 mt-4 paragraph-1 landing-head-paragraph">
            CivicTechJobs unites ambitious technology practitioners with
            volunteer opportunities from a central hub of listings to build
            digital products, programs, and services.{" "}
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
              such as YOU to help local communities and governments. Thanks to
              the power of our volunteers, we are able to positively impact the
              communities of Los Angeles region and beyond!
            </p>
          </div>
        </div>
      </div>
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
