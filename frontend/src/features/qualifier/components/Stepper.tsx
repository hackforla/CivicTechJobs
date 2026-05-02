/**
 * Three-step progress indicator for the qualifier flow.
 *
 * Renders the labels "Practice Area", "Individual Skill Evaluation",
 * "Availability" with a horizontal connector line. Each step's
 * status (complete / active / pending) is derived from the URL's
 * `[page]` segment - completed steps show a check icon, the
 * active step shows a filled dot, pending steps show a hollow
 * dot.
 *
 * Step list is currently hard-coded in this file. Adding a new
 * step means editing the `<Step>` JSX here, the switch in
 * `QualifierConsole`, and adding a page component.
 */

"use client";

import { useParams } from "next/navigation";
import React from "react";

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
        className={
          stepStatus === "pending" ? styles.labelPending : styles.label
        }
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
