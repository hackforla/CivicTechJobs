// External Imports
import React from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import Typography from "tw-components/Typography";
import { Button } from "components/components";
import { QualifierNav } from "../components/QualifierNav";
import { RadioButtonForm } from "../components/RadioButtonForm";
import { ProgressIndicator } from "../components/ProgressIndicator";

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
        FIX
        <RadioButtonForm onSkillSelect={(skill, level) => console.log(`Skill: ${skill}, Level: ${level}`)} />
      </div>
      <QualifierNav className="justify-between items-center">
        <ProgressIndicator
          currentPart={1}
          totalParts={5}
          title="INSERT TITLE"
          progressPercentage={10}
        />
        <div className="flex gap-4">
          <Button
            size="md"
            length="long"
            color="primary-dark"
            onClick={() => navigate("../1", { relative: "path" })}
          >
            Back
          </Button>
          <Button
            size="md"
            length="long"
            color="primary"
            onClick={() => {
              navigate("../3", { relative: "path" });
            }}
          >
            Next
          </Button>
        </div>
      </QualifierNav>
    </>
  );
}

export { QualifierPage2 };
