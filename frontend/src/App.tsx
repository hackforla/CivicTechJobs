import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "router/App";

import { HeaderNav, FooterNav } from "components/components";
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
} from "assets/images/images";

export default function App() {
  return (
    <>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "https://www.hackforla.org/" },
          {
            name: "How to Join",
            link: "https://www.hackforla.org/getting-started",
          },
          { name: "Projects", link: "https://www.hackforla.org/projects/" },
        ]}
      />
      <RouterProvider router={router} />
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" },
        ]}
      />
    </>
  );
}
