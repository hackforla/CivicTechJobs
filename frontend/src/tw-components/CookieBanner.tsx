/* eslint-disable react/no-unescaped-entities */
// External Imports
import React, { useState } from "react";
import Cookies from "js-cookie";

// Internal Imports
import { IconButton } from "./Buttons";
import { iconX } from "assets/images/images";

function CookieBanner() {
  const [hidden, setIsHidden] = useState(
    Cookies.get("cookieConsent") !== undefined,
  );

  const handleAcceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setIsHidden(true);
  };

  const handleDeclineCookies = () => {
    Cookies.set("cookieConsent", "false", { expires: 365 });
    setIsHidden(true);
  };
  return (
    <div
      role="dialog"
      aria-label="cookies banner"
      className={`${
        hidden ? "hidden" : ""
      } fixed bottom-12 left-1/2 z-50 flex w-3/4 -translate-x-1/2 transform flex-col rounded-lg bg-white p-4 shadow-2xl`}
    >
      <div className="max-h-64 min-h-48 justify-between space-y-5 p-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold text-charcoal">
            This site use cookies!
          </p>
          <IconButton
            iconUrl={iconX}
            label="close"
            onClick={() => {
              setIsHidden(true);
            }}
          ></IconButton>{" "}
        </div>
        <p className="max-w-[80%]">
          We use cookies to improve your experience. By clicking "Accept
          Cookies", you are agreeing to the collection of data as described in
          our{" "}
          <a
            href="/privacypolicy"
            className="cursor-pointer text-blue-dark underline hover:text-blue-dark-hover focus:bg-blue-dark-focused"
          >
            Cookie Policy
          </a>
        </p>
        <div className="flex flex-row items-center space-x-12">
          <button
            className="rounded bg-blue-dark px-10 py-1 text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused"
            onClick={handleAcceptCookies}
          >
            Accept
          </button>
          <button
            onClick={handleDeclineCookies}
            className="cursor-pointer text-blue-dark hover:text-blue-dark-hover hover:drop-shadow-lg focus:bg-blue-dark-focused"
          >
            No Thanks
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
