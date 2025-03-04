// External Imports
import React from "react";
import clsx from "clsx";

interface CardProps extends React.PropsWithChildren {
  className?: string;
}

function Card({ ...props }: CardProps) {
  return (
    <div
      className={clsx(props.className, "box-border rounded-2xl p-8 shadow-md")}
    >
      {props.children}
    </div>
  );
}

export { Card };
