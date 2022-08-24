// External Imports
import React, { Fragment, useId } from "react";

// Internal Imports
import { combineClasses, range } from "components/Utility/utils";

// Type declaration for props
interface ProgressBarProps {
  addClass?: string;
  label: string;
  labelHidden?: boolean;
  max?: 1 | 2 | 3 | 4;
  value?: number; // Can only be 1, 2, 3, or 4
}

function ProgressBar({
  labelHidden = true,
  max = 2,
  value = 1,
  ...props
}: ProgressBarProps) {
  const ariaLabelledBy = useId();

  return (
    <Fragment>
      <label
        id={ariaLabelledBy}
        className={combineClasses(labelHidden && "sr-only")}
      >
        {props.label}
      </label>
      <div
        className={combineClasses(
          "flex-container progress-bar",
          props.addClass
        )}
        role="progressbar"
        aria-labelledby={ariaLabelledBy}
        aria-valuemin={1}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        {range(1, max).map((num, index) => {
          return (
            <div
              key={index}
              className={combineClasses(
                `progress-bar-${max}`,
                num <= value && "active"
              )}
            ></div>
          );
        })}
      </div>
    </Fragment>
  );
}

export { ProgressBar };
