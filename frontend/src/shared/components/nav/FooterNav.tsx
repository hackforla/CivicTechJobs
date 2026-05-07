import { Fragment } from "react";
import Link from "next/link";

import LogoHorizontalOnDark from "@/shared/images/logos/logo-horizontal-on-dark.svg";
import LogoStackedOnDark from "@/shared/images/logos/logo-stacked-on-dark.svg";
import { Button } from "@/shared/components/Buttons";

interface MenuObject {
  name: string;
  link: string;
}

const menuItems: MenuObject[] = [
  { name: "Credits", link: "/credits" },
  { name: "Sitemap", link: "#" },
  { name: "Join Us", link: "/qualifier/1" },
];

function Logo() {
  return (
    <Link className="block" href="/" aria-label="Civic Tech Jobs - Home">
      <LogoHorizontalOnDark
        className="hidden h-p7 w-auto sm:block"
        aria-hidden="true"
      />
      <LogoStackedOnDark
        className="h-p9 w-auto sm:hidden"
        aria-hidden="true"
      />
    </Link>
  );
}

function FooterNav() {
  return (
    <footer className="box-border flex flex-col items-center gap-6 bg-blue-dark py-8 lg:flex-row lg:px-[176px]">
      <Logo />
      <nav
        className="flex max-lg:order-3 max-lg:w-[220px]"
        aria-label="footer-navigation"
      >
        {menuItems.map((item) => (
          <Fragment key={item.link}>
            <div className="visible m-auto block w-5 rotate-90 border border-white first:hidden lg:invisible lg:w-p5 lg:first:visible lg:first:block"></div>
            <Link className="text-[16px] font-bold text-white" href={item.link}>
              {item.name}
            </Link>
          </Fragment>
        ))}
      </nav>
      <div className="mx-0 flex lg:ml-auto">
        <Button
          size="small"
          variant="primary-dark"
          href="https://www.hackforla.org/donate/"
        >
          Donate
        </Button>
      </div>
    </footer>
  );
}

export default FooterNav;
