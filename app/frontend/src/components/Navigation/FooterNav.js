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
          <img className="logo-desktop-footer" src={logoDesktop} />
          <img className="logo-mobile-footer" src={logoMobile} />
        </a>
      </div>
    );
  };

  return (
    <div className="footer-nav flex-container">
      <Logo />
      <div className="footer-menu flex-container">
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
      </div>
      <div className="footer-donate-button flex-container">
        <Button color="primary-dark" href="https://www.google.com" size="sm">
          Donate
        </Button>
      </div>
    </div>
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
