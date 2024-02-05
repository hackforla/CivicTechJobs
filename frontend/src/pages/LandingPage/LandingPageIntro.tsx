// External Imports
import React from "react";
import { Link } from "react-router-dom";

// Internal Imports
import {
  iconArrowDown,
  LandingPageBg,
  LandingPageFg,
} from "assets/images/images";

function LandingPageIntro() {
  return (
    <div className="my-10 flex flex-col">
      <div className="flex-grow flex flex-col align-center text-center">
        <h1 className="px-10 text-3xl md:text-5xl font-bold md:leading-snug my-8">
          Together,
          <br />
          we can create greater civic change
        </h1>
        <p className="w-4/5 md:w-1/2 text-xl md:text-2xl mb-10">
          CivicTechJobs unites ambitious technology practitioners with volunteer
          opportunities from a central hub of listings to build digital
          products, programs, and services.
        </p>
        <Link
          to="qualifier/1"
          className="h-min-12 px-14 py-3 mb-10 rounded-x-large text-xl font-bold bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused text-white"
        >
          Join us
        </Link>
        <div
          className="w-full h-fit bg-cover bg-no-repeat flex items-center justify-center -z-20"
          style={{ backgroundImage: `url(${LandingPageBg})` }}
        >
          <img className="mt-[-10%] w-10/12 -z-10" src={LandingPageFg} alt="" />
        </div>
      </div>

      <div className="flex-grow flex flex-col align-center  text-center bg-tan-light py-10">
        <img
          className="arrow-down mb-6 md:hidden"
          src={iconArrowDown}
          alt="Arrow Down Icon"
        />
        <h2 className="text-2xl md:text-4xl font-bold leading-normal mb-8">
          Our Mission
        </h2>
        <p className="w-4/5 md:w-3/5 text-xl md:text-2xl">
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
