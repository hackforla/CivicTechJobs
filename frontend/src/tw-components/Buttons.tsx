import React from "react";
import Typography from "tw-components/Typography";

// size can only be one of:
// "small" | "small-long" | "medium" | "medium-long" | "large" | "large-long" | "icon-only"
type ButtonSize = keyof typeof buttonSizes;
// state can only be "enabled" or "disabled"
type ButtonState = keyof typeof buttonColors;

type ButtonProps = {
  size?: ButtonSize;
  state?: ButtonState;
  children?: React.ReactNode;
  onClick?: () => void;
};

type IconButtonProps = {
  state?: ButtonState;
  onClick?: () => void;
};

const buttonSizes = {
  small: "px-[24px] h-[32px] flex items-center justify-center leading-none",
  "small-long":
    "px-[40px] h-[32px] flex items-center justify-center leading-none",
  medium: "px-[32px] h-[42px] flex items-center justify-center leading-none",
  "medium-long":
    "px-[48px] h-[42px] flex items-center justify-center leading-none",
  large: "px-[40px] h-[51px] flex items-center justify-center leading-none",
  "large-long":
    "px-[56px] h-[51px] flex items-center justify-center leading-none",
  "icon-only": "px-[24px] h-[42px] flex items-center justify-center",
};

const buttonColors = {
  enabled:
    "bg-blue-dark text-white dark:bg-white dark:text-blue-dark hover:bg-blue-dark-hover focus:bg-blue-dark-focused focus:outline-none active:bg-blue-dark-focused dark:hover:bg-grey-light dark:focus:bg-[#D9DBDF] dark:active:bg-[#D9DBDF]",
  disabled:
    "bg-grey text-white cursor-not-allowed dark:bg-grey dark:text-grey-light",
};

const buttonTypography: Record<keyof typeof buttonSizes, React.ElementType> = {
  small: Typography.Title7,
  "small-long": Typography.Title7,
  medium: Typography.Title6,
  "medium-long": Typography.Title6,
  large: Typography.Title5,
  "large-long": Typography.Title5,
  "icon-only": Typography.Title7, // Not sure about this one
};

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  state = "enabled",
  children,
  onClick,
}) => {
  const TextComponent = buttonTypography[size];

  return (
    <button
      className={`rounded-[64px] ${buttonSizes[size]} ${buttonColors[state]} transition-all duration-200`}
      disabled={state === "disabled"}
      onClick={onClick}
    >
      <TextComponent>{children}</TextComponent>
    </button>
  );
};

const IconButton: React.FC<IconButtonProps> = ({
  state = "enabled",
  onClick,
}) => {
  return (
    <button
      className={`rounded-[24px] ${buttonSizes["icon-only"]} ${buttonColors[state]} transition-all duration-200`}
      disabled={state === "disabled"}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m20 20l-4.05-4.05m0 0a7 7 0 1 0-9.9-9.9a7 7 0 0 0 9.9 9.9"
        />
      </svg>
    </button>
  );
};

export { Button, IconButton };
