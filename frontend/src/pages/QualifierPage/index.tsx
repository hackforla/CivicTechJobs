// External Imports
import React from "react";
import { useParams } from "react-router-dom";

// Internal Imports
import { Stepper } from "./components/Stepper";
import { QualifiersProvider } from "context/QualifiersContext";
import { QualifierPageCalendar } from "./QualifierPageCalendar";

import { QualifierPage1 } from "./pages/QualifierPage1";
import { QualifierPage2 } from "./pages/QualifierPage2";

function Content({ page }: { page: string }) {
  switch (page) {
    case "1":
      return <QualifierPage1 />;
    case "2":
      return <QualifierPage2 />;
    case "3":
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
      <div className="container mx-auto mb-8">
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
