// External Imports
import React from "react";

// Internal Imports
import { iconDownArrow } from "assets/images/images";
import { Button } from "components/components";

function LandingPageIntro() {
  return (
    <div className="landing-container my-5">
      <div className="landing-intro-container flex-container align-center text-center py-5">
        <h1 className="title-1 landing-intro-title mb-4">
          Together,
          <br />
          we can create greater civic change
        </h1>
        <p className="paragraph-1 landing-intro-paragraph mb-5">
          CivicTechJobs unites ambitious technology practitioners with volunteer
          opportunities from a central hub of listings to build digital
          products, programs, and services.
        </p>
        <Button
          length="long"
          size="lg"
          addClass="landing-intro-btn"
          href="https://www.google.com"
        >
          Join us
        </Button>
      </div>
      <div className="flex-container align-center text-center landing-mission-container py-5">
        <img className="down-arrow mb-3" src={iconDownArrow} alt="" />
        <h1 className="title-2 landing-mission-title mb-4">Our Misson</h1>
        <p className="paragraph-2 landing-mission-paragraph">
          We bring together civic-minded volunteers from diverse backgrounds
          such as YOU to help local communities and governments. Thanks to the
          power of our volunteers, we are able to positively impact the
          communities of Los Angeles region and beyond!
        </p>
      </div>
    </div>
  );
}

export { LandingPageIntro };
