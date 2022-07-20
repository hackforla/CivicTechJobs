// External Imports
import { combineClasses } from "components/Utility/utils";
import React, { Fragment, useId } from "react";

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
        className={combineClasses("flex-container", props.addClass)}
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

// Credit to mdn documentation for the function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
function range(start: number, stop: number, step: number = 1) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export { ProgressBar };
