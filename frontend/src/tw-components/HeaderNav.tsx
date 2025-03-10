// External Imports
import React from "react";

// Internal Imports
import { logoHorizontal } from "assets/images/images";
import { IconHamburgerMenu } from "assets/images/images";
import { Button } from "../components/components";
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

function HeaderNav() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-3 py-1 shadow-[-1px_1px_2px_rgb(51,51,51,0.2)] lg:justify-around">
      <div>
        <Logo />
      </div>

      <div className="flex items-center">
        <nav
          className="flex items-center justify-center max-md:hidden"
          aria-label="header-navigation"
        >
          {menuItems.map((item, index) => {
            return (
              <a
                className="font-bold hover:underline md:mx-6 lg:mx-8"
                href={item.link}
                rel="noopener noreferrer"
                key={index}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        <Link to="/login" className="mg:ml-6 lg:ml-8">
          <Button color="primary" size="sm">
            Log In
          </Button>
        </Link>
        <button
          className="ml-3 md:hidden"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Menu Options"
        >
          <IconHamburgerMenu />
        </button>
      </div>
    </header>
  );
}

export default HeaderNav;
