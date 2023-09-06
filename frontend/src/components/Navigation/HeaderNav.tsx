// External Imports
import React from "react";

// Internal Imports
import { logoHorizontal } from "assets/images/images";
import { IconHamburgerMenu } from "assets/images/images";
import { Button } from "../Buttons/Button";
import { Link } from "react-router-dom";

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
 * @dev changes from default to auth header depending on the path
 * @dev can't use the Link component from react router because this component
 * is rendered outside of the router context created in Router.tsx
 */

function HeaderNav() {
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

        <Link to="/login">
          <Button color="primary" size="sm">
            Log In
          </Button>
        </Link>
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
}

export { HeaderNav };
