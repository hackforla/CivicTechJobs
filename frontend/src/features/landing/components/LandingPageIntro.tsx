import Link from "next/link";

import IconArrowDown from "@/shared/icons/icon-arrow-down.svg";
import LandingPageFg from "@/shared/images/landing-page-fg.svg";

function LandingPageIntro() {
  return (
    <div className="my-10 flex flex-col">
      <div className="align-center flex flex-grow flex-col text-center">
        <h1 className="my-8 px-10 text-3xl font-bold md:text-5xl md:leading-snug">
          Together,
          <br />
          we can create greater civic change
        </h1>
        <p className="mb-10 w-4/5 text-xl md:w-1/2 md:text-2xl">
          CivicTechJobs unites ambitious technology practitioners with volunteer
          opportunities from a central hub of listings to build digital
          products, programs, and services.
        </p>
        <Link
          href="/qualifier/1"
          className="h-min-12 mb-10 rounded-x-large bg-blue-dark px-14 py-3 text-xl font-bold text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused"
        >
          Join us
        </Link>
        <div
          className="-z-20 flex h-fit w-full items-center justify-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url(/svgs/landing-page-bg.svg)" }}
        >
          <LandingPageFg
            className="-z-10 mt-[-10%] w-10/12"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="align-center flex flex-grow flex-col bg-tan-light py-10 text-center">
        <IconArrowDown className="mb-6 md:hidden" aria-label="Arrow Down Icon" />
        <h2 className="mb-8 text-2xl font-bold leading-normal md:text-4xl">
          Our Mission
        </h2>
        <p className="w-4/5 text-xl md:w-3/5 md:text-2xl">
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
