// External Imports
import React from "react";

// Internal Imports
import { iconArrowDown } from "assets/images/images";
import { Button } from "components/components";

function LandingPageIntro() {
  return (
    <div className="landing-container my-5">
      <div className="flex-column align-center text-center landing-intro-container">
        <h1 className="landing-intro-title mb-4">
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
          href="/qualifier/1"
        >
          Join us
        </Button>
      </div>
      <div className="flex-column align-center text-center pb-5 landing-mission-container">
        <img className="arrow-down mb-3" src={iconArrowDown} alt="" />
        <h2 className="landing-mission-title mb-4">Our Mission</h2>
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
