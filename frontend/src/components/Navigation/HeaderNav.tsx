// External Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import * as utility from "../Utility/utils";
import { logoHorizontal, logoStacked } from "assets/images/images";
import { IconHamburgerMenu } from "assets/images/images";
import { Button } from "../Buttons/Button";

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

function HeaderNav() {
  const Logo = () => {
    return (
      <div className="flex-center-y justify-left">
        <a href="/" rel="noopener noreferrer">
          <img
            className="logo-desktop"
            src={logoHorizontal}
            alt="Civic Tech Jobs - Home"
          />
          <img
            className="logo-mobile"
            src={logoStacked}
            alt="Civic Tech Jobs - Home"
          />
        </a>
      </div>
    );
  };

  return (
    <Fragment>
      <header className="header-nav flex-center-y py-1 px-3">
        <div className="row header-nav-logo">
          <Logo />
        </div>
        <div className="row header-nav-menu justify-right align-center">
          <nav
            className={utility.combineClasses("hamburger-menu")}
            aria-label="header-navigation"
          >
            {menuItems.map((item, index) => {
              return (
                <a
                  className="header-nav-link mr-4"
                  href={item.link}
                  rel="noopener noreferrer"
                  key={index}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          <Button href="/" color="primary" size="sm">
            Log In
          </Button>
          <button
            className="hamburger-icon ml-3"
            aria-expanded="false"
            aria-controls="menu"
          >
            <IconHamburgerMenu />
          </button>
        </div>
      </header>
      <div aria-hidden="true"></div>
    </Fragment>
  );
}

export { HeaderNav };
