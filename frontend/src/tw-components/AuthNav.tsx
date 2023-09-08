// External Imports
import React, { useState } from "react";

// Internal Imports
import { logoHorizontal } from "assets/images/images";
import { iconArrowLeft } from "assets/images/images";

function AuthNav() {
  const [path] = useState(window.location.pathname);

  const Logo = () => {
    return (
      <a href="/" rel="noopener noreferrer">
        <img
          className="max-h-[24px] md:max-h-[32px]"
          src={logoHorizontal}
          alt="Civic Tech Jobs - Home"
        />
      </a>
    );
  };

  return (
    <header className="h-16 py-1 px-3 w-full flex items-center justify-center shadow-[-1px_1px_2px_rgb(51,51,51,0.2)]">
      <div className="grow flex justify-center">
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
