// External Imports
import React, { Fragment, useState, FC, SVGProps } from "react";

// Internal Imports
import { logoHfLA, creditsPageHighFive } from "assets/images/images";
// import { Card } from "components/Cards/StandardCard";
import { iconData } from "api_data/creditsIconData";
import { illustrationData } from "api_data/creditsIllustrationData";
import Card from "tw-components/StandardCard";

import TopSvg from "./TopSvg";
import BottomSvg from "./BottomSvg";

const CreditsPage: FC = () => {
  const [activeData, setActiveData] = useState(illustrationData);
  const [imgSize, setImgSize] = useState("32");
  const [activeButton, setActiveButton] = useState("illustrations");

  const handleClickIllustrationButton = () => {
    setActiveButton("illustrations");
    setActiveData(illustrationData);
    setImgSize("32");
  };

  const handleClickIconButton = () => {
    setActiveData(iconData);
    setActiveButton("icons");
    setImgSize("2");
  };

  const styleClasses = {
    buttonDefault:
      "h-10 px-7 rounded text-base border hover:bg-blue-dark-hover hover:border-blue-dark-hover hover:text-white focus:border-blue-dark-focused focus:bg-blue-dark-focused focus:text-white",
    buttonActive: "border-blue-dark bg-blue-dark text-white",
    buttonInactive: "border-grey-dark bg-white text-grey-dark",
  };

  return (
    <div className="relative flex flex-col">
      {/* Create stacking context for the top SVG */}
      <div className="relative z-0">
        {/* Top SVG */}
        <TopSvg className="flex-none w-full relative">
          {/* Content that goes below the top SVG */}
        </TopSvg>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white px-3 xs:px-24 md:px-12 lg:px-24">
        {/* Your main content goes here */}
        <h1 className="text-4xl font-bold">Hello, World!</h1>

        {/* Add more content as needed */}
        <div className="pt-5 mt-5">
          <h2>Illustrations & Iconography</h2>
          <div>
            <button
              className={`${styleClasses.buttonDefault}
              ${
                activeButton === "illustrations"
                  ? styleClasses.buttonActive
                  : styleClasses.buttonInactive
              } mr-4`}
              onClick={handleClickIllustrationButton}
            >
              Illustrations
            </button>

            <button
              className={`${styleClasses.buttonDefault}
              ${
                activeButton === "icons"
                  ? styleClasses.buttonActive
                  : styleClasses.buttonInactive
              }`}
              onClick={handleClickIconButton}
            >
              Iconography
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 content-center md:grid-cols-3 sm:gap-8 md:gap-8 xl:gap-x-20 place-items-stretch p-6 xl:px-20">
          {activeData.map((cardData) => (
            // name, usedIn, provider, imgSrc, learnMoreLink
            <Card
              key={cardData.id}
              name={cardData.name}
              usedIn={cardData.usedIn}
              provider={cardData.provider}
              imgSrc={cardData.imgSrc}
              imgStyleClasses={`${
                activeButton === "icons" ? "w-1/6" : "w-5/6"
              } h-auto place-self-center`}
              imgContainerStyleClasses={`${
                activeButton === "illustrations"
                  ? "bg-grey-light"
                  : "bg-tan-light"
              } 
              w-24 h-24 sm:w-36 sm:h-36 md:w-36 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full grid
              `}
              learnMoreLink={cardData.link}
            />
          ))}
        </div>
      </div>

      {/* Create stacking context for the bottom SVG */}
      <div className="relative" style={{ minHeight: "200px" }}>
        <div className="absolute bottom-5 sm:bottom-1/4 left-0 right-0 z-10 flex flex-col items-center justify-center sm:flex-row sm:items-center">
          <img
            className="flex-column mb-0 mr-2 w-8 sm:w-16 md:w-24 md:mb-2 md:mr-4 lg:w-32"
            src={logoHfLA}
            alt="Hack for LA logo"
          />
          <div className="flex-column text-center sm:text-left">
            <h3 className="font-semi-bold mb-1 sm:text-lg md:mb-3 md:text-2xl lg:text-3xl">
              Join us!
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">
              Civic Tech Jobs is one of the many projects at{" "}
              <a className="links" href="https://www.hackforla.org/">
                Hack for LA
              </a>
              ,<br />
              Code for America's Los Angeles chapter.
            </p>
          </div>
        </div>

        {/* Bottom SVG */}
        <BottomSvg className="flex-none md:w-full relative"></BottomSvg>
      </div>
    </div>
  );
};
export { CreditsPage };
