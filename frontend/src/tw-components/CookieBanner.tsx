// External Imports
import React, { useState } from "react";
import Cookies from 'js-cookie';

// Internal Imports
import { Button } from "../components/components";
import { IconButton } from "components/components";
import { iconX } from "assets/images/images";

interface CookieBannerProps extends React.PropsWithChildren {}

function CookieBanner(props: CookieBannerProps) {
  const [hidden, setIsHidden] = useState(Cookies.get('cookieConsent') !== undefined);

  const handleAcceptCookies = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365})
    setIsHidden(true)
  }

  const handleDeclineCookies = () => {
    Cookies.set('cookieConsent', 'false', { expires: 365})
    setIsHidden(true)
  }

  return (
    <div
      role='dialog'
      aria-label="cookies banner"
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
            onClick={(e) => { setIsHidden(true)}}
          ></IconButton>{" "}
        </div>
        <p className="max-w-[80%]">
          We use cookies to improve your experience. By clicking "Accept
          Cookies", you are agreeing to the collection of data as described in
          our <a href='/' className="text-blue-dark-hover underline cursor-pointer hover:text-blue-dark-focused">Cookie Policy</a>
        </p>
        <div className="flex flex-row items-center space-x-6">
          <Button color="primary" size="md" onClick={handleAcceptCookies}>
            Accept
          </Button>
          <button
            onClick={handleDeclineCookies}
            className="text-blue-dark-hover cursor-pointer hover:text-blue-dark-focused pl-2"
          >
            No Thanks
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
