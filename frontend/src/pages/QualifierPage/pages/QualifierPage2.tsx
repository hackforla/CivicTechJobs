// External Imports
import React from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import Typography from "tw-components/Typography";
import { Button } from "tw-components/Buttons";
import { QualifierNav } from "../components/QualifierNav";
import { RadioButtonForm } from "../components/RadioButtonForm";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { useQualifiersContext } from "context/QualifiersContext";

function QualifierPage2() {
  const navigate = useNavigate();
  const { qualifiers, updateQualifiers } = useQualifiersContext();

  const handleSkillSelect = (skill: string, level: string) => {
    const newSkillsMatrix = {
      ...qualifiers.skills_matrix,
      [skill]: level,
    };

    const newQualifiers = {
      ...qualifiers,
      skills_matrix: newSkillsMatrix,
    };

    updateQualifiers(newQualifiers);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center px-5 pb-10">
        <Typography.Title2 className="mt-8 text-charcoal">
          Skill Evaluation
        </Typography.Title2>
        <Typography.Paragraph3 className="my-5 text-grey-dark">
          Evaluate each skill based on your experience
        </Typography.Paragraph3>
        <RadioButtonForm
          onSkillSelect={handleSkillSelect}
          selectedSkillsLevel={qualifiers.skills_matrix || {}}
        />
      </div>
      <div className="w-4/5">
        <QualifierNav className="items-center justify-between">
          <ProgressIndicator
            currentPart={1}
            totalParts={5}
            title="INSERT TITLE"
            progressPercentage={10}
          />
          <div className="flex gap-4">
            <Button
              size="medium-long"
              variant="primary-dark"
              onClick={() => navigate("../1", { relative: "path" })}
            >
              Back
            </Button>
            <Button
              size="medium-long"
              onClick={() => {
                navigate("../3", { relative: "path" });
              }}
            >
              Next
            </Button>
          </div>
        </QualifierNav>
      </div>
    </>
  );
}

export { QualifierPage2 };
