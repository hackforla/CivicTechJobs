import React from "react";

interface ProgressIndicatorProps {
  currentPart: number;
  totalParts: number;
  title: string;
  progressPercentage: number; // New prop
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentPart,
  totalParts,
  title,
  progressPercentage,
}) => {
  // Ensure progressPercentage is clamped between 0 and 100
  const validProgressPercentage = Math.min(Math.max(progressPercentage, 0), 100);
  const strokeDashoffset = 62.8 - (62.8 * validProgressPercentage) / 100;

  return (
    <div className="flex items-center gap-2">
      <svg
        className="text-blue-dark"
        width="40"
        height="40"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="10"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="4"
        />
        <circle
          cx="18"
          cy="18"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="62.8, 62.8"
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <div className="flex flex-col">
        <span className="font-bold text-charcoal">
          Part {currentPart} of {totalParts}
        </span>
        <span className="text-charcoal">{title}</span>
      </div>
    </div>
  );
};
