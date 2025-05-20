// External Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import Typography from "tw-components/Typography";
import { Button } from "tw-components";
import { QualifierNav } from "../components/QualifierNav";
import { RadioButtonForm } from "../components/RadioButtonForm";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { useQualifiersContext } from "context/QualifiersContext";

function QualifierPage2() {
  const navigate = useNavigate();
  const { qualifiers, selectedCopData, updateQualifiers } =
    useQualifiersContext();
  const [progressPercentage, setProgressPercentage] = useState(10);
  const [currentSkillsIndex, setCurrentSkillsIndex] = useState(0);

  const updateProgressPercentage = () => {
    const increments =
      (Object.keys(qualifiers.skills_matrix || {}).length /
        (selectedCopData?.skills?.length ?? 1)) *
      70;
    const newProgressPercentage = Math.min(10 + increments, 100);
    setProgressPercentage(newProgressPercentage);
  };

  const handleNavClick = (direction: "back" | "next") => {
    if (direction === "back") {
      if (currentSkillsIndex > 0) {
        setCurrentSkillsIndex((prevIndex) => prevIndex - 4);
      } else {
        updateQualifiers({ ...qualifiers, skills_matrix: {} });
        updateProgressPercentage();
        navigate("../1", { relative: "path" });
      }
    } else if (direction === "next") {
      if (currentSkillsIndex + 4 >= (selectedCopData?.skills?.length ?? 0)) {
        navigate("../3", { relative: "path" });
      } else {
        updateProgressPercentage();
        setCurrentSkillsIndex((prevIndex) => prevIndex + 4);
      }
    }
  };

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
          selectedCOPTitle={selectedCopData?.title || ""}
          skills={
            selectedCopData?.skills?.slice(
              currentSkillsIndex,
              currentSkillsIndex + 4,
            ) || []
          }
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
            progressPercentage={progressPercentage}
          />
          <div className="flex gap-4">
            <Button
              size="medium-long"
              variant="primary-dark"
              onClick={() => handleNavClick("back")}
            >
              Back
            </Button>
            <Button size="medium-long" onClick={() => handleNavClick("next")}>
              Next
            </Button>
          </div>
        </QualifierNav>
      </div>
    </>
  );
}

export { QualifierPage2 };
