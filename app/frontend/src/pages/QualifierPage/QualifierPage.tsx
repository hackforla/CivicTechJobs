// External Imports
import React, { Fragment, Suspense, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

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

function loader({ params }: any) {
  return params.page;
}

function Content({ page }: { page: string }) {
  switch (page) {
    case "1":
      return <QualifierPageRoles />;
    case "2":
      return <QualifierPageCalendar />;
    default:
      return <div>404 page...</div>;
  }
}

function QualifierContent() {
  const page = useLoaderData() as string;

  return (
    <Fragment>
      <ProgressBar
        label={`Page ${page}`}
        value={parseInt(page)}
        addClass="px-5"
      />
      <div className="flex-center-x">
        <div className="flex-column qualifier-content align-center px-5">
          <Content page={page} />
        </div>
      </div>{" "}
    </Fragment>
  );
}

function QualifierPage() {
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
          <Outlet />
        </main>
        <FooterNav
          logoDesktop={logoHorizontalOnDark}
          logoMobile={logoStackedOnDark}
          menu={[
            { name: "Credits", link: "/credits" },
            { name: "Sitemap", link: "/" },
            { name: "Join Us", link: "/" },
          ]}
        />
      </Suspense>
    </Fragment>
  );
}

export { QualifierPage, QualifierContent, loader };
