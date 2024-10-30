/* eslint-disable react/no-unescaped-entities */
import React, { useState, FC } from "react";

import { logoHfLA, creditsPageHighFive } from "assets/images/images";
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
      "h-6 px-4 sm:h-10 sm:px-7 rounded text-xs sm:text-base border hover:bg-blue-dark-hover hover:border-blue-dark-hover hover:text-white focus:border-blue-dark-focused focus:bg-blue-dark-focused focus:text-white",
    buttonActive: "border-blue-dark bg-blue-dark text-white",
    buttonInactive: "border-grey-dark bg-white text-grey-dark",
  };

  return (
    <div className="relative flex flex-col">
      {/* Create stacking context for the top SVG */}
      <div className="relative z-0" style={{ minHeight: "300px" }}>
        <div className="xl:top-22 absolute left-0 right-0 top-5 z-10 flex flex-col items-center justify-around pl-16 pr-8 sm:top-8 sm:flex-row sm:items-start md:top-10 lg:top-16">
          <div className="flex-column w-full text-center sm:w-1/2 sm:text-left md:w-1/2">
            <h3 className="mb-2 mt-3 text-2xl font-bold sm:text-3xl md:mb-3 md:text-4xl lg:text-5xl xl:text-6xl">
              Credits
            </h3>
            <p className="mt-2 text-xs sm:text-sm md:mt-3 md:text-base lg:text-lg xl:text-2xl">
              Thank you to all of the artists and sponsors who help make our
              projects successful. Check out all of the illustrations and
              iconography we have used on our site.
            </p>
          </div>
          <img
            className="w-1/2 md:mx-2 md:mr-4 md:w-2/5"
            src={creditsPageHighFive}
            alt="High Five Illustration"
          />
        </div>

        {/* Top SVG */}
        {/* Overlay div for extending background color on small screens */}
        <div className="h-24 w-full flex-none bg-tan-bg sm:h-8"></div>
        <TopSvg className="w-full flex-none" />
      </div>

      <div className="bg-white4 flex-1">
        <div className="my-4 px-16 py-6 md:px-24 lg:px-32">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Illustrations & Icongraphy
          </h1>

          <div className="my-5">
            <div>
              <button
                className={`
                  ${styleClasses.buttonDefault}
                  ${
                    activeButton === "illustrations"
                      ? styleClasses.buttonActive
                      : styleClasses.buttonInactive
                  } 
                  mr-4`}
                onClick={handleClickIllustrationButton}
              >
                Illustrations
              </button>

              <button
                className={`
                            ${styleClasses.buttonDefault}
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
        </div>

        <div className="mx-auto grid w-full grid-cols-1 place-items-stretch content-center gap-x-8 gap-y-10 px-8 xs:w-10/12 sm:w-4/5 sm:grid-cols-2 sm:px-0 md:w-4/5 md:grid-cols-3 md:gap-x-8 lg:gap-x-12 xl:gap-x-20 ">
          {activeData.map((cardData) => (
            <Card
              key={cardData.id}
              name={cardData.name}
              usedIn={cardData.usedIn}
              provider={cardData.provider}
              imgSrc={cardData.imgSrc}
              imgStyleClasses={`${
                activeButton === "icons" ? "w-1/6" : "w-2/3"
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
        <div className="absolute bottom-5 left-0 right-0 z-10 flex flex-col items-center justify-center sm:bottom-1/4 sm:flex-row sm:items-center">
          <img
            className="flex-column mb-0 mr-2 w-8 sm:w-16 md:mb-2 md:mr-4 md:w-24 lg:w-32"
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

        <BottomSvg className="relative flex-none md:w-full" />
      </div>
    </div>
  );
};
export { CreditsPage };
