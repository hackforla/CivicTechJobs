// External imports
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Internal imports
import { Button } from "components/components";
import { logoHorizontalOnDark, logoStackedOnDark } from "assets/images/images";

interface menuObject {
  name?: string;
  link: string;
}

const menuItems: menuObject[] = [
  { name: "Credits", link: "credits" },
  { name: "Sitemap", link: "#" },
  { name: "Join Us", link: "qualifier/1" },
];

const Logo = () => {
  return (
    <Link className="block" to="/">
      <img
        className="hidden sm:block"
        src={logoHorizontalOnDark}
        alt="Civic Tech Jobs - Home"
      />
      <img
        className="sm:hidden"
        src={logoStackedOnDark}
        alt="Civic Tech Jobs - Home"
      />
    </Link>
  );
};

function FooterNav() {
  return (
    <footer className="footer-nav flex-container px-[176px]">
      <Logo />
      <nav
        className="footer-menu flex-container"
        aria-label="footer-navigation"
      >
        {menuItems.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="footer-menu-vertical-line"></div>
              <Link className="footer-links" to={item.link}>
                {item.name}
              </Link>
            </Fragment>
          );
        })}
      </nav>
      <div className="footer-donate-button flex-container">
        <Button
          color="primary-dark"
          href="https://www.hackforla.org/donate/"
          size="sm"
        >
          Donate
        </Button>
      </div>
    </footer>
  );
}

export { FooterNav };
