"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Typography from "@/shared/components/Typography";
import { Button } from "@/shared/components/Buttons";
import { QualifierNav } from "./QualifierNav";
import { RadioButtonForm } from "./RadioButtonForm";
import { ProgressIndicator } from "./ProgressIndicator";
import { useQualifiersContext } from "../QualifiersContext";
import styles from "./QualifierPage2.module.css";

function QualifierPage2() {
  const router = useRouter();
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
        router.push("/qualifier/1");
      }
    } else if (direction === "next") {
      if (currentSkillsIndex + 4 >= (selectedCopData?.skills?.length ?? 0)) {
        router.push("/qualifier/3");
      } else {
        updateProgressPercentage();
        setCurrentSkillsIndex((prevIndex) => prevIndex + 4);
      }
    }
  };

  const handleSkillSelect = (skill: string, level: string) => {
    updateQualifiers({
      ...qualifiers,
      skills_matrix: { ...qualifiers.skills_matrix, [skill]: level },
    });
  };

  return (
    <>
      <div className={styles.page}>
        <Typography.Title2 className={styles.title}>
          Skill Evaluation
        </Typography.Title2>
        <Typography.Paragraph3 className={styles.subtitle}>
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
      <div className={styles.navWrap}>
        <QualifierNav>
          <ProgressIndicator
            currentPart={1}
            totalParts={5}
            title="INSERT TITLE"
            progressPercentage={progressPercentage}
          />
          <div className={styles.actions}>
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
