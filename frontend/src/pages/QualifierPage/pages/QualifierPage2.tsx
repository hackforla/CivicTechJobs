// External Imports
import React from "react";
import { useNavigate } from "react-router-dom";
// import clsx from "clsx";

// Internal Imports
import Typography from "tw-components/Typography";
import { Button } from "components/components";
import { QualifierNav } from "../components/QualifierNav";

function QualifierPage2() {
  const navigate = useNavigate();

  return (
    <>
      <Typography.Title2 className="mt-8 text-charcoal">
        Skill Evaluation
      </Typography.Title2>
      <Typography.Paragraph3 className="my-5 text-grey-dark">
        Evaluate each skill based on your experience
      </Typography.Paragraph3>

      <div className="min-w-fit"></div>

      <QualifierNav className="justify-end">
        <Button
          size="lg"
          length="long"
          color="primary"
          onClick={() => {
            navigate("../2", { relative: "path" });
          }}
        >
          Next
        </Button>
      </QualifierNav>
    </>
  );
}

export { QualifierPage2 };
