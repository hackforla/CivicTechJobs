// External Imports
import React from "react";
import { useParams } from "react-router-dom";

// Internal Imports
import { ProgressBar } from "components/components";
import { QualifiersProvider } from "context/QualifiersContext";
import { QualifierPageRoles } from "./QualifierPageRoles";
import { QualifierPageCalendar } from "./QualifierPageCalendar";

function Content({ page }: { page: string }) {
  switch (page) {
    case "1":
      return <QualifierPageRoles />;
    case "2":
      return <QualifierPageCalendar />;
    default:
      throw new Error("Page not found");
  }
}

function QualifierPage() {
  let { page } = useParams();
  if (!page) {
    page = "1";
  }

  return (
    <QualifiersProvider>
      <main className="container mx-auto">
        <ProgressBar
          label={`Page ${page}`}
          value={parseInt(page)}
          addClass="px-5"
        />
        <div className="flex-center-x">
          <div className="flex-column qualifier-content align-center px-5">
            <Content page={page} />
          </div>
        </div>
      </main>
    </QualifiersProvider>
  );
}

export default QualifierPage;
