// External Imports
import React from "react";
import clsx from "clsx";

interface QualifierNavProps {
  className?: string;
  children?: React.ReactNode;
}

function QualifierNav({ className, children }: QualifierNavProps) {
  return (
    <div
      className={clsx(
        "sticky bottom-0 box-content flex h-24 w-full flex-wrap items-center bg-white px-6 opacity-80 hover:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { QualifierNav };
