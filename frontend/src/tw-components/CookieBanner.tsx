// External Imports
import React, { useState } from "react";

// Internal Imports
import { Button } from "../components/components";
import { IconButton } from "components/components";
import { iconX } from "assets/images/images";

interface CookieBannerProps extends React.PropsWithChildren {}

function CookieBanner(props: CookieBannerProps) {
  //TO-DO - implement functionality for cookie w/ react cookie library
  const [hidden, setIsHidden] = useState(false);

  return (
    //create cookies banner container
    <div
      className={`${
        hidden ? "hidden" : ""
      } fixed flex flex-col bottom-12 left-1/2 transform -translate-x-1/2 bg-white w-3/4 p-4 z-50W rounded-lg shadow-xl`}
    >
      <div className="min-h-48 max-h-64 justify-between space-y-5">
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-bold">This site use cookies!</p>
          <IconButton
            iconUrl={iconX}
            label="close"
            onClick={(e) => {
              setIsHidden(true);
            }}
          ></IconButton>{" "}
        </div>
        <p className="max-w-[80%]">
          We use cookies to improve your experience. By clicking "Accept
          Cookies", you are agreeing to the collection of data as described in
          our <a >Cookie Policy</a>
        </p>
        <div className="flex flex-row items-center space-x-6">
          <Button color="primary" size="md">
            Accept
          </Button>
          <a
            onClick={(e) => {
              setIsHidden(true);
            }}
            className="hover:underline hover:font-bold"
          >
            No Thanks
          </a>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
