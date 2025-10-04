/* eslint-disable react/no-unescaped-entities */
import React, { FC } from "react";

import { joinusAllPage } from "assets/images/images";


import TopSvg from "./TopSvg";
import JoinUsSteps from "./JoinUsSteps";
import JoinUsFAQ from "./JoinUsFAQ";


const JoinUsPage: FC = () => {

  return (
    <div className="relative flex flex-col">
      {/* Create stacking context for the top SVG */}
      <div className="relative z-0" style={{ minHeight: "300px" }}>
        <div className="absolute inset-0 z-10 flex flex-col sm:flex-row h-full px-10">

          <div className="w-full sm:w-1/3 flex items-center justify-center sm:justify-start text-center sm:text-left">
            <div className="w-1/2"></div>

            <div className="w-3/5 pt-10">
              <h3 className="mb-2 mt-3 text-2xl font-bold sm:text-3xl md:mb-3 md:text-4xl lg:text-5xl xl:text-6xl">
                Volunteer with us!
              </h3>
              <p className="mt-2 text-xs sm:text-sm md:mt-3 md:text-base lg:text-lg xl:text-2xl">
                Civic Tech Jobs, a project within Hack for LA, brings
                together civic-minded volunteers to address local issues
                by helping build digital products, platforms, and services.
              </p>
            </div>
          </div>


          <div className="w-full sm:w-2/3 flex items-end justify-center sm:justify-end">
            <img
              className="w-full max-w-none"
              src={joinusAllPage}
              alt="Join Us All Page"
            />
          </div>

        </div>

        <TopSvg className="w-full flex-none" />
      </div>





      <div className="bg-white4 flex-1">
        <div className="my-4 px-16 py-6 md:px-24 lg:px-32">
        </div>

        <JoinUsSteps/>

      </div>
      <div className="bg-white4 flex-1">
        <div className="my-4 px-16 py-6 md:px-24 lg:px-32">
        </div>

        <JoinUsFAQ/>

      </div>
    </div>
  );
};
export { JoinUsPage };