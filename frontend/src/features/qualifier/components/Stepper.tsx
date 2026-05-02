"use client";

import React from "react";
import { useParams } from "next/navigation";

import Typography from "@/shared/components/Typography";
import IconCheckMark from "@/shared/icons/icon-checkmark.svg";
import { cn } from "@/shared/lib/utils";
import styles from "./Stepper.module.css";

function Stepper() {
  return (
    <div className={styles.row}>
      <Step step="1" position="first">
        Practice Area
      </Step>
      <Step step="2">Individual Skill Evaluation</Step>
      <Step step="3" position="last">
        Availability
      </Step>
    </div>
  );
}

interface StepProps extends React.PropsWithChildren {
  step: "1" | "2" | "3";
  position?: "first" | "last";
}

type Status = "complete" | "active" | "pending";

function Step({ children, step, position }: StepProps) {
  const params = useParams<{ page?: string }>();
  const page = params.page ?? "1";

  const stepStatus: Status =
    step < page ? "complete" : page === step ? "active" : "pending";

  return (
    <div className={styles.step}>
      <Typography.Title6
        className={stepStatus === "pending" ? styles.labelPending : styles.label}
      >
        {children}
      </Typography.Title6>
      <div className={styles.connector}>
        {renderSwitch(stepStatus, position)}
      </div>
    </div>
  );
}

function renderSwitch(stepStatus: Status, position?: "first" | "last") {
  const leftLine = stepStatus === "pending" ? styles.linePending : styles.line;
  const rightLine =
    stepStatus === "complete" ? styles.line : styles.linePending;

  return (
    <>
      <div
        className={cn(leftLine, position === "first" && styles.lineHidden)}
      />
      <div
        className={
          stepStatus === "complete"
            ? styles.dotComplete
            : stepStatus === "active"
              ? styles.dotActive
              : styles.dotPending
        }
      >
        {stepStatus === "complete" && <IconCheckMark />}
      </div>
      <div
        className={cn(rightLine, position === "last" && styles.lineHidden)}
      />
    </>
  );
}

export { Stepper };
