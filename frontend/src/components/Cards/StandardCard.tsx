// External Imports
import React from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface CardProps extends React.PropsWithChildren {
  addClass?: string;
}

function Card({ ...props }: CardProps) {
  return (
    <div className={combineClasses("card", props.addClass)}>
      {props.children}
    </div>
  );
}

export { Card };
