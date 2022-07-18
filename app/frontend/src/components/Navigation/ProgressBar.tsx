// External Imports
import { combineClasses } from "components/Utility/utils";
import React, { Fragment, useState } from "react";

interface ProgressBarProps {
  activeBar?: number; // Can only be 1, 2, 3, or 4
  addClass?: string;
  bars?: 1 | 2 | 3 | 4;
}

function ProgressBar({ activeBar = 1, bars = 2, ...props }: ProgressBarProps) {
  return (
    <div className={combineClasses("flex-container", props.addClass)}>
      {range(1, bars).map((num, index) => {
        return (
          <div
            key={index}
            className={combineClasses(
              `progress-bar-${bars}`,
              num <= activeBar && "active"
            )}
          ></div>
        );
      })}
    </div>
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
