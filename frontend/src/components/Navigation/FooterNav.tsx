// External imports
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Internal imports
import { Button } from "../Buttons/Button";
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

function FooterNav() {
  const Logo = () => {
    return (
      <a className="footer-icons-on-dark" href="/" rel="noopener noreferrer">
        <img
          className="logo-desktop-footer"
          src={logoHorizontalOnDark}
          alt="Civic Tech Jobs - Home"
        />
        <img
          className="logo-mobile-footer"
          src={logoStackedOnDark}
          alt="Civic Tech Jobs - Home"
        />
      </a>
    );
  };

  return (
    <footer className="footer-nav flex-container">
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
