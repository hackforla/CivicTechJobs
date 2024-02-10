// External Imports
import React, { Fragment, Suspense } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

// Internal Imports
import { ProgressBar } from "components/components";
import { QualifiersProvider } from "context/QualifiersContext";

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
    <QualifiersProvider>
      <Suspense fallback={<div>...Loading</div>}>
        <main className="mx-6">
          <Outlet />
        </main>
      </Suspense>
    </QualifiersProvider>
  );
}

export { QualifierPage, QualifierContent, loader };
