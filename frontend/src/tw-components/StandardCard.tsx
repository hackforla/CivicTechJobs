// External Imports
import React from "react";
import { cn } from "lib/utils";

interface CardProps extends React.PropsWithChildren {
  className?: string;
}

function Card({ ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

export { Card };
