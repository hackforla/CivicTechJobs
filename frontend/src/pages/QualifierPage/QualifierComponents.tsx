// External Imports
import React from "react";

// Internal Imports
import { combineClasses } from "components/Utility/utils";

interface QualifierNavProps {
  addClass?: string;
  children?: React.ReactNode;
}

function QualifierNav({ addClass, children }: QualifierNavProps) {
  return (
    <div
      className={combineClasses("flex-center-y px-3 qualifier-nav", addClass)}
    >
      {children}
    </div>
  );
}

export { QualifierNav };
