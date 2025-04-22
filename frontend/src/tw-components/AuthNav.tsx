// External Imports
import React, { useState } from "react";

// Internal Imports
import { logoHorizontal } from "assets/images/images";
import { iconArrowLeft } from "assets/images/images";

function AuthNav() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [path] = useState(window.location.pathname);

  const Logo = () => {
    return (
      <a href="/" rel="noopener noreferrer">
        <img
          className="max-h-p3 md:max-h-p4"
          src={logoHorizontal}
          alt="Civic Tech Jobs - Home"
        />
      </a>
    );
  };

  return (
    <header className="flex h-16 w-full items-center justify-center px-3 py-1 shadow-[-1px_1px_2px_rgb(51,51,51,0.2)]">
      <div className="flex grow justify-center">
        <a href="/">
          <img src={iconArrowLeft} alt="Back to home arrow" className="w-5" />
        </a>
      </div>
      <div>
        <Logo />
      </div>
      <div className="grow"></div>
    </header>
  );
}

export default AuthNav;
