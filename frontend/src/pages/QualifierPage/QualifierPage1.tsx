// External Imports
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import Typography from "tw-components/Typography";
import { Button } from "components/components";
import { QualifierNav } from "./QualifierComponents";

function QualifierPage1() {
  const navigate = useNavigate();

  return (
    <>
      <Typography.Title3 className="mt-8 text-charcoal">
        What type of Practice Area are you looking for?
      </Typography.Title3>
      <Typography.Paragraph3 className="my-5 text-grey-dark">
        Select one practice area
      </Typography.Paragraph3>

      <QualifierNav addClass="justify-right">
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

export { QualifierPage1 };
