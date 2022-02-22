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
      <div className="inner-two flex-container ">
        {menu.map((item, idx) => {
          return (
            <>
              <div key={idx} className="img-menu" />
              <a id="a-tag" key={item.id} href={item.link}>
                {item.name}
              </a>
            </>
          );
        })}
      </div>
      <div className="second-div flex-container  ">
        <Button color="primary-dark" href="https://www.google.com" size="sm">
          Donate
        </Button>
      </div>
    </div>
  );
};

export default Footer;
