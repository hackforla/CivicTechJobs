// External Imports
import React from "react";
import { useParams } from "react-router-dom";

// Internal Imports
import Typography from "tw-components/Typography";
import { IconCheckMark } from "assets/images/images";

function Stepper() {
  return (
    <div className="mt-4 flex w-full">
      <Step step={"1"}>Practice Area</Step>
      <Step step={"2"}>Individual Skill Evaluation</Step>
      <Step step={"3"}>Availability</Step>
    </div>
  );
}

interface StepProps extends React.PropsWithChildren {
  step: "1" | "2" | "3";
}

function Step({ children, step }: StepProps) {
  let { page } = useParams();
  if (!page) page = "1";

  const stepStatus =
    step < page ? "complete" : page === step ? "active" : "pending";

  return (
    <div className="group flex w-full flex-col items-center">
      <Typography.Title6
        className={stepStatus === "pending" ? "text-grey" : "text-blue-dark"}
      >
        {children}
      </Typography.Title6>
      <div className="mt-1 flex min-w-full items-center justify-center">
        {renderSwitch(stepStatus)}
      </div>
    </div>
  );
}

type Status = "complete" | "active" | "pending";

function renderSwitch(stepStatus: Status) {
  switch (stepStatus) {
    case "complete":
      return <CompleteStep />;
    case "active":
      return <ActiveStep />;
    case "pending":
      return <PendingStep />;
    default:
      return <></>;
  }
}

function CompleteStep() {
  return (
    <>
      <div className="w-1/2 border-y-2 border-blue-dark group-first:border-0" />
      <div className="flex size-p3 items-center justify-center rounded-full border-2 border-dashed bg-blue-dark">
        <IconCheckMark />
      </div>
      <div className="w-1/2 border-y-2 border-blue-dark group-last:border-0" />
    </>
  );
}

function ActiveStep() {
  return (
    <>
      <div className="w-1/2 border-y-2 border-blue-dark group-first:border-0" />
      <div className="size-p3 rounded-full border-2 border-dashed" />
      <div className="w-1/2 border-y-2 border-grey group-last:border-0" />
    </>
  );
}

function PendingStep() {
  return (
    <>
      <div className="w-1/2 border-y-2 border-grey group-first:border-0" />
      <div className="size-p3 rounded-full bg-grey" />
      <div className="w-1/2 border-y-2 border-grey group-last:border-0" />
    </>
  );
}

export { Stepper };
