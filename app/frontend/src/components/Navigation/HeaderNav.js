// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

// Internal Imports
import * as utility from "../Utility/utils";
import { IconHamburgerMenu } from "assets/images/images";
import { Button } from "../Buttons/Button";

function HeaderNav({ logoDesktop, logoMobile, menu }) {
  const [open, setOpen] = useState(false);

  const Logo = () => {
    return (
      <div className="flex-container align-center justify-left">
        <a href="/">
          <img
            className="logo-desktop"
            src={logoDesktop}
            alt="Civic Tech Jobs - Home"
          />
          <img
            className="logo-mobile"
            src={logoMobile}
            alt="Civic Tech Jobs - Home"
          />
        </a>
      </div>
    );
  };

  return (
    <Fragment>
      <header className="header-nav flex-container align-center py-1 px-3">
        <div className="row header-nav-logo">
          <Logo />
        </div>
        <div className="row header-nav-menu justify-right align-center">
          <nav
            className={utility.combineClasses(
              "hamburger-menu"
              //!open && "hidden"
            )}
            aria-label="header-navigation"
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
          </nav>

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
      </header>
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
