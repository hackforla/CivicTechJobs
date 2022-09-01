// External Imports
import React, { Fragment, useEffect, useState } from "react";

// Internal Imports
import { ProgressBar, HeaderNav, FooterNav } from "components/components";
import {
  logoHorizontal,
  logoHorizontalOnDark,
  logoStacked,
  logoStackedOnDark,
} from "assets/images/images";
import { QualifierPageCalendar } from "./QualifierPageCalendar";

function QualifierPage() {
  const [page, setPage] = useState(2);

  return (
    <Fragment>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "/" },
          { name: "How to Join", link: "/qualifier" },
          { name: "Projects", link: "/demo" },
        ]}
      />
      <main>
        <ProgressBar label="Page 1" addClass="px-5" />
        <QualifierPageCalendar setPage={setPage} />
      </main>
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

export { QualifierPage };
