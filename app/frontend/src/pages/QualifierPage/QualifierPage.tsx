// External Imports
import React, { Fragment, Suspense, useEffect, useState } from "react";

// Internal Imports
import { ProgressBar, HeaderNav, FooterNav } from "components/components";
import {
  logoHorizontal,
  logoHorizontalOnDark,
  logoStacked,
  logoStackedOnDark
} from "assets/images/images";
const QualifierPageCalendar = React.lazy(
  () => import("./QualifierPageCalendar")
);

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
          { name: "Projects", link: "/demo" }
        ]}
      />
      <main>
        <Suspense fallback={<div>...Loading</div>}>
          <ProgressBar label="Page 1" addClass="px-5" />
          <QualifierPageCalendar setPage={setPage} />
        </Suspense>
      </main>
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" }
        ]}
      />
    </Fragment>
  );
}

export { QualifierPage };
