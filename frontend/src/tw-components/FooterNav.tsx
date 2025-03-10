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
    <footer className="box-border flex flex-col items-center gap-6 bg-blue-dark py-8 lg:flex-row lg:px-[176px]">
      <Logo />
      <nav
        className="flex max-lg:order-3 max-lg:w-[220px]"
        aria-label="footer-navigation"
      >
        {menuItems.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="visible m-auto block w-5 rotate-90 border border-white first:hidden lg:invisible lg:w-p5 lg:first:visible lg:first:block"></div>
              <Link className="text-[16px] font-bold text-white" to={item.link}>
                {item.name}
              </Link>
            </Fragment>
          );
        })}
      </nav>
      <div className="mx-0 flex lg:ml-auto">
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

export default FooterNav;
