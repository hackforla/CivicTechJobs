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
        "border-px sticky bottom-0 box-content flex h-16 w-full flex-wrap items-center rounded-lg border-[#D8D8D8] bg-[#FDFDFD] opacity-80 shadow-[0_8px_25px_#00000014] hover:opacity-100",
        className,
      )}
    >
      <div className="w-full px-6 flex items-center justify-between">
        {children}
      </div>
    </div>
  );
}

export { QualifierNav };
