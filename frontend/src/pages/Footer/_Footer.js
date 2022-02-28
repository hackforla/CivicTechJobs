import React from "react";
import "./_Footer.scss";
import { Button } from "../../components/Buttons/Buttons";

const Footer = ({ menu, logoDesktop, logoMobile, logoFooter }) => {
  const Logo = () => {
    return (
      <div className="inner-one">
        <a href="/">
          <img className="logo-desktop-footer" src={logoDesktop} />
          <img className="logo-mobile-footer" src={logoMobile} />
        </a>
      </div>
    );
  };

  return (
    <div className="footer-nav flex-container ">
      <Logo />
      <div className="footer-menu">
        {menu.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <div className="img-menu" />
              <a className="footer-a-tag" key={idx} href={item.link}>
                {item.name}
              </a>
            </React.Fragment>
          );
        })}
      </div>
      <div className="footer-donate-button flex-container  ">
        <Button color="primary-dark" href="https://www.google.com" size="sm">
          Donate
        </Button>
      </div>
    </div>
  );
};

export default Footer;
