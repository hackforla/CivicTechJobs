// External imports
import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Internal imports
import { Button } from "../Buttons/Button";

const FooterNav = ({ menu, logoDesktop, logoMobile }) => {
  const Logo = () => {
    return (
      <div className="footer-icons-on-dark">
        <a href="/">
          <img
            className="logo-desktop-footer"
            src={logoDesktop}
            alt="Civic Tech Jobs - Home"
          />
          <img
            className="logo-mobile-footer"
            src={logoMobile}
            alt="Civic Tech Jobs - Home"
          />
        </a>
      </div>
    );
  };

  return (
    <footer className="footer-nav flex-container">
      <Logo />
      <nav
        className="footer-menu flex-container"
        aria-label="footer-navigation"
      >
        {menu.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="footer-menu-vertical-line"></div>
              <a className="footer-links" href={item.link}>
                {item.name}
              </a>
            </Fragment>
          );
        })}
      </nav>
      <div className="footer-donate-button flex-container">
        <Button color="primary-dark" href="https://www.google.com" size="sm">
          Donate
        </Button>
      </div>
    </footer>
  );
};

FooterNav.propTypes = {
  logoDesktop: PropTypes.string.isRequired,
  logoMobile: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    }).isRequired
  ),
};

export { FooterNav };
