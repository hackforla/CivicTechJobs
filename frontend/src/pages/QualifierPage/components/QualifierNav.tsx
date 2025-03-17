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
        "border-px sticky bottom-0 box-content flex h-20 w-4/5 flex-wrap items-center rounded-lg border-[#D8D8D8] bg-[#FDFDFD] px-6 opacity-80 shadow-[0_8px_25px_#00000014] hover:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { QualifierNav };
