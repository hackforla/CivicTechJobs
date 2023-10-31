// External Imports
import React, { Fragment } from "react";

// Internal Imports
import { combineClasses } from "components/Utility/utils";

interface QualifierTitleProps {
  children: React.ReactNode;
  title: string;
}

function QualifierTitle({ children, title }: QualifierTitleProps) {
  return (
    <Fragment>
      <h1 className="title-2 mt-6">{title}</h1>
      <p className="paragraph-1 row justify-center my-3">{children}</p>
    </Fragment>
  );
}

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

export { QualifierTitle, QualifierNav };
