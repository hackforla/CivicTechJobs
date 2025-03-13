// External Imports
import React from "react";
import { useParams } from "react-router-dom";

// Internal Imports
import { Stepper } from "./components/Stepper";
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
      <div className="container mx-auto">
        <Stepper />
        <div className="mx-auto max-w-fit">
          <div className="align-center flex w-fit flex-col px-5">
            <Content page={page} />
          </div>
        </div>
      </div>
    </QualifiersProvider>
  );
}

export default QualifierPage;
