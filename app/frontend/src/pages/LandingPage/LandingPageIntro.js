// External Imports
import React, { Fragment } from "react";

// Internal Imports
import { landingPageFg, iconDownArrow } from "assets/images/images";
import { Button } from "components/components";

function LandingPageIntro() {
  return (
    <div className="flex-container landing-container align-center text-center">
      <h1 className="title-1 landing-header-title mb-4">
        Together,
        <br />
        we can create greater civic change
      </h1>
      <p className="paragraph-1 landing-head-paragraph mb-5">
        CivicTechJobs unites ambitious technology practitioners with volunteer
        opportunities from a central hub of listings to build digital products,
        programs, and services.
      </p>
      <Button length="long" size="lg" addClass="landing-action-btn">
        Join us
      </Button>
      <img className="down-arrow mb-3" src={iconDownArrow} alt="" />
      <h1 className="title-2 landing-mission-title">Our Misson</h1>
      <p className="paragraph-2 landing-mission-paragraph">
        We bring together civic-minded volunteers from diverse backgrounds such
        as YOU to help local communities and governments. Thanks to the power of
        our volunteers, we are able to positively impact the communities of Los
        Angeles region and beyond!
      </p>
    </div>
  );
}

export { LandingPageIntro };
