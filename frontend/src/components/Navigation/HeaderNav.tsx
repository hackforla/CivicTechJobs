// External Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import { logoHorizontal, logoStacked } from "assets/images/images";
import { IconHamburgerMenu } from "assets/images/images";
import { Button } from "../Buttons/Button";
import { iconArrowLeft } from "assets/images/images";

interface menuObject {
  name?: string;
  link: string;
}

const menuItems: menuObject[] = [
  { name: "Hack for LA", link: "https://www.hackforla.org/" },
  {
    name: "How to Join",
    link: "https://www.hackforla.org/getting-started",
  },
  { name: "Projects", link: "https://www.hackforla.org/projects/" },
];

/** HeaderNav component
 * - changes from default to auth header depending on the path
 * - can't use the Link component from react router because this component
 * is rendered outside of the router context created in Router.tsx
 */

function HeaderNav() {
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

  const DefaultHeader = (
    <header className="h-16 py-1 px-3 w-full flex items-center justify-between shadow-[-1px_1px_2px_rgb(51,51,51,0.2)]">
      <div>
        <Logo />
      </div>

      <div className="flex items-center">
        <nav
          className="max-md:hidden flex items-center justify-center"
          aria-label="header-navigation"
        >
          {menuItems.map((item, index) => {
            return (
              <a
                className="hover:underline font-bold mr-4"
                href={item.link}
                rel="noopener noreferrer"
                key={index}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        <Button href="/login" color="primary" size="sm">
          Log In
        </Button>
        <button
          className="md:hidden ml-3"
          aria-expanded="false"
          aria-controls="menu"
        >
          <IconHamburgerMenu />
        </button>
      </div>
    </header>
  );

  const AuthHeader = (
    <header className="h-16 py-1 px-3 w-full flex items-center justify-center shadow-[-1px_1px_2px_rgb(51,51,51,0.2)]">
      <div className="grow flex justify-center">
        <a href="/">
          <img src={iconArrowLeft} className="w-5" />
        </a>
      </div>
      <div>
        <Logo />
      </div>
      <div className="grow"></div>
    </header>
  );

  if (path === "/login" || path === "/signup") {
    return AuthHeader;
  } else {
    return DefaultHeader;
  }
}

export { HeaderNav };
