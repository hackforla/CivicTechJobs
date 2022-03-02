import React from "react";
import { Button } from "../Buttons/Buttons";

const Footer = ({ menu, logoDesktop, logoMobile }) => {
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
            <React.Fragment key={index}>
              <div className="footer-menu-vertical-line"></div>
              <a className="footer-links" href={item.link}>
                {item.name}
              </a>
            </React.Fragment>
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

export default Footer;
