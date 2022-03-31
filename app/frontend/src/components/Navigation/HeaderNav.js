// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

// Internal Imports
import * as utility from "../Utility/utils";
import { IconHamburgerMenu } from "../../assets/images/images";
import { Button } from "../Buttons/Buttons";

function HeaderNav({ logoDesktop, logoMobile, menu }) {
  const [open, setOpen] = useState(false);

  const Logo = () => {
    return (
      <div className="flex-container align-center justify-left">
        <a href="/">
          <img className="logo-desktop" src={logoDesktop} />
          <img className="logo-mobile" src={logoMobile} />
        </a>
      </div>
    );
  };

  return (
    <Fragment>
      <nav className="header-nav flex-container align-center py-1 px-3">
        <div className="row header-nav-logo">
          <Logo />
        </div>
        <div className="row header-nav-menu justify-right align-center">
          <div
            className={utility.combineClasses(
              "hamburger-menu"
              //!open && "hidden"
            )}
          >
            {menu.map((item, index) => {
              return (
                <a
                  className="header-nav-link mr-4"
                  href={item.link}
                  key={index}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          <Button href="https://www.google.com/" color="primary" size="sm">
            Log In
          </Button>
          <button
            className="hamburger-icon ml-3"
            aria-expanded="false"
            aria-controls="menu"
            onClick={() => {
              setOpen(false);
              alert("menu is now open");
            }}
          >
            <IconHamburgerMenu />
          </button>
        </div>
      </nav>
      <div aria-hidden="true"></div>
    </Fragment>
  );
}

HeaderNav.propTypes = {
  logoDesktop: PropTypes.string.isRequired,
  logoMobile: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    }).isRequired
  ),
};

export { HeaderNav };
