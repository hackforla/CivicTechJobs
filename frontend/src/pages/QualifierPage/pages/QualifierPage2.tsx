// External Imports
import React from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import Typography from "tw-components/Typography";
import { Button, IconButton } from "components/components";
import { iconArrowLeft } from "assets/images/images";
import { QualifierNav } from "../components/QualifierNav";

import { RadioButtonForm } from "../components/RadioButtonForm";
// import { ChipsSelection } from "../components/ChipsSelection";

function QualifierPage2() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full flex-col items-center px-5 pb-10">
        <Typography.Title2 className="mt-8 text-charcoal">
          Skill Evaluation
        </Typography.Title2>
        <Typography.Paragraph3 className="my-5 text-grey-dark">
          Evaluate each skill based on your experience
        </Typography.Paragraph3>

        <RadioButtonForm />
        {/* <ChipsSelection /> */}
      </div>
      <QualifierNav className="justify-between">
        <IconButton
          label="previous page"
          iconUrl={iconArrowLeft}
          onClick={() => navigate("../1", { relative: "path" })}
        />
        <Button
          size="lg"
          length="long"
          color="primary"
          onClick={() => {
            navigate("../3", { relative: "path" });
          }}
        >
          Next
        </Button>
      </QualifierNav>
    </>
  );
}

export { QualifierPage2 };
