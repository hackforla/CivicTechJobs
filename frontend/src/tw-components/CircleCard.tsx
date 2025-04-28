import React from "react";
import { onKey } from "components/Utility/utils";
import { cn } from "lib/utils";

interface CircleCardProps extends React.PropsWithChildren {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  role?: string;
  size?: "lg" | "sm";
}

const cardSizes = {
  sm: "size-[144px]",
  lg: "size-[256px]",
};

function CircleCard({ size = "sm", ...props }: CircleCardProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-grey-light shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
        cardSizes[size],
        props.onClick && "hover:underline",
        props.className,
      )}
      onClick={props.onClick}
      onKeyDown={props.onClick && onKey(props.onClick, "Enter")}
      role={props.role}
    >
      <div className="flex h-full items-center justify-center">
        {props.children}
      </div>
    </div>
  );
}

export { CircleCard };
