// External Imports
import React, { Fragment, Suspense, useState } from "react";

// Internal Imports
import { ProgressBar, HeaderNav, FooterNav } from "components/components";
import {
  logoHorizontal,
  logoHorizontalOnDark,
  logoStacked,
  logoStackedOnDark,
} from "assets/images/images";

// Lazy Imports
const QualifierPageRoles = React.lazy(() => import("./QualifierPageRoles"));
const QualifierPageCalendar = React.lazy(
  () => import("./QualifierPageCalendar")
);

function QualifierPage() {
  const [page, setPage] = useState(1);

  function Content() {
    if (page == 1) {
      return <QualifierPageRoles setPage={setPage} />;
    } else if (page == 2) {
      return <QualifierPageCalendar setPage={setPage} />;
    } else {
      return <div>404 page</div>;
    }
  }

  return (
    <Fragment>
      <Suspense fallback={<div>...Loading</div>}>
        <HeaderNav
          logoDesktop={logoHorizontal}
          logoMobile={logoStacked}
          menu={[
            { name: "Hack for LA", link: "/" },
            { name: "How to Join", link: "/qualifier" },
            { name: "Projects", link: "/demo" },
          ]}
        />
        <main className="mx-6">
          <ProgressBar label="Page 1" value={page} addClass="px-5" />
          <div className="flex-center-x">
            <div className="flex-column qualifier-content align-center px-5">
              <Content />
            </div>
          </div>
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
      </Suspense>
    </Fragment>
  );
}

export { QualifierPage };
