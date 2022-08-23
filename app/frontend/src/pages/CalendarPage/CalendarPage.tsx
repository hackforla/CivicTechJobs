// External Imports
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import {
  Checkbox,
  Dropdown,
  DropdownOption,
  TextField,
  ProgressBar,
  Calendar,
  IconButton,
  HeaderNav,
  FooterNav,
} from "components/components";
import {
  logoHorizontal,
  logoHorizontalOnDark,
  logoStacked,
  logoStackedOnDark,
} from "assets/images/images";

function CalendarPage() {
  return (
    <Fragment>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "/demo" },
          { name: "How to Join", link: "/" },
          { name: "Projects", link: "/" },
        ]}
      />
      <main>Calendar Page</main>
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" },
        ]}
      />
    </Fragment>
  );
}

export { CalendarPage };
