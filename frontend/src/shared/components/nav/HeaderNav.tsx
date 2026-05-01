import Link from "next/link";

import LogoHorizontal from "@/shared/images/logos/logo-horizontal.svg";
import IconHamburgerMenu from "@/shared/icons/icon-hamburger-menu.svg";
import { Button } from "@/shared/components/Buttons";

interface MenuObject {
  name: string;
  link: string;
}

const menuItems: MenuObject[] = [
  { name: "Hack for LA", link: "https://www.hackforla.org/" },
  { name: "How to Join", link: "https://www.hackforla.org/getting-started" },
  { name: "Projects", link: "https://www.hackforla.org/projects/" },
];

function Logo() {
  return (
    <Link href="/" aria-label="Civic Tech Jobs - Home">
      <LogoHorizontal className="h-p3 w-auto md:h-p4" aria-hidden="true" />
    </Link>
  );
}

function HeaderNav() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-3 py-1 shadow-[-1px_1px_2px_rgb(51,51,51,0.2)] lg:justify-around">
      <div>
        <Logo />
      </div>

      <div className="flex items-center">
        <nav
          className="flex items-center justify-center max-md:hidden"
          aria-label="header-navigation"
        >
          {menuItems.map((item) => (
            <a
              className="font-bold hover:underline md:mx-6 lg:mx-8"
              href={item.link}
              rel="noopener noreferrer"
              key={item.link}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <Link href="/login" className="mg:ml-6 lg:ml-8">
          <Button size="small">Log In</Button>
        </Link>
        <button
          className="ml-3 md:hidden"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Menu Options"
        >
          <IconHamburgerMenu />
        </button>
      </div>
    </header>
  );
}

export default HeaderNav;
