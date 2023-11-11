// External Imports
import React, { useState } from "react";
import Cookies from 'js-cookie';

// Internal Imports
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
      } fixed flex flex-col bottom-12 left-1/2 transform -translate-x-1/2 bg-white w-3/4 p-4 z-50 rounded-lg shadow-2xl shadow-inner`}
    >
      <div className="min-h-48 max-h-64 justify-between space-y-5 p-6">
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-bold text-charcoal">This site use cookies!</p>
          <IconButton
            iconUrl={iconX}
            label="close"
            onClick={(e) => { setIsHidden(true)}}
          ></IconButton>{" "}
        </div>
        <p className="max-w-[80%]">
          We use cookies to improve your experience. By clicking "Accept
          Cookies", you are agreeing to the collection of data as described in
          our <a href='/privacypolicy' className="text-blue-dark underline cursor-pointer hover:text-blue-dark-hover focus:bg-blue-dark-focused">Cookie Policy</a>
        </p>
        <div className="flex flex-row items-center space-x-12">
          <button className="rounded px-10 py-1 bg-blue-dark text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused" onClick={handleAcceptCookies}>
            Accept
          </button>
          <button
            onClick={handleDeclineCookies}
            className="text-blue-dark cursor-pointer hover:text-blue-dark-hover focus:bg-blue-dark-focused hover:drop-shadow-lg"
          >
            No Thanks
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
