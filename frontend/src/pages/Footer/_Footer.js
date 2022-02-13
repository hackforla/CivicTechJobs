import React from "react";
import "./_Footer.scss";
import { Button } from "../../components/Buttons/Buttons";

const Footer = ({ menu, logoDesktop, logoMobile, logoFooter }) => {
  const Logo = () => {
    return (
      <div>
        <a href="/">
          <img className="logo-desktop-footer" src={logoDesktop} />
          <img className="logo-mobile-footer" src={logoMobile} />
        </a>
      </div>
    );
  };

  return (
    <div className="footer-nav ">
      <div className="inner">
        <Logo />
      </div>

      <div className="inner">
        {menu.map((item, idx) => {
          return (
            <>
              <img className="img-menu" key={idx} src={logoFooter} />

              <a key={item.id} href={item.link}>
                {item.name}
              </a>
            </>
          );
        })}
      </div>
      <div className="inner">
        <Button color="primary-dark" href="https://www.google.com" size="sm">
          Donate
        </Button>
      </div>
    </div>
  );
};

export default Footer;
