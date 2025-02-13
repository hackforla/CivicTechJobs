import React from "react";
import clsx from "clsx";
import Typography from "tw-components/Typography";

// size can only be one of:
// "small" | "small-long" | "medium" | "medium-long" | "large" | "large-long" | "icon-only"
type ButtonSize = keyof typeof buttonSizes;

// Button props
type ButtonProps = {
  size?: ButtonSize;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  isIconButton?: boolean;
};

// Button size styles
const buttonSizes = {
  small: "px-[24px] h-[32px]",
  "small-long": "px-[40px] h-[32px]",
  medium: "px-[32px] h-[42px]",
  "medium-long": "px-[48px] h-[42px]",
  large: "px-[40px] h-[51px]",
  "large-long": "px-[56px] h-[51px]",
  "icon-only": "px-[24px] h-[42px]",
};

const buttonTypography: Record<
  keyof typeof buttonSizes,
  React.ElementType | null
> = {
  small: Typography.Title7,
  "small-long": Typography.Title7,
  medium: Typography.Title6,
  "medium-long": Typography.Title6,
  large: Typography.Title5,
  "large-long": Typography.Title5,
  "icon-only": null,
};

// Shared base styles for all buttons
const baseButtonStyles =
  "transition-all duration-200 flex items-center justify-center bg-blue-dark text-white hover:bg-blue-dark-hover focus:bg-blue-dark-focused focus:outline-none active:bg-blue-dark-focused";

const enabledDarkModeStyles =
  "dark:bg-white dark:text-blue-dark dark:hover:bg-grey-light dark:focus:bg-[#D9DBDF] dark:active:bg-[#D9DBDF]";

const disabledStyles = "pointer-events-none bg-grey text-grey-light";

// Button component (handles both regular and icon buttons)
const Button: React.FC<ButtonProps> = ({
  size = "medium",
  disabled = false,
  children,
  onClick,
  isIconButton = false,
}) => {
  const TextComponent = buttonTypography[size];

  return (
    <button
      className={clsx(
        baseButtonStyles,
        buttonSizes[size],
        isIconButton ? "rounded-[24px]" : "rounded-[64px]",
        disabled ? disabledStyles : enabledDarkModeStyles,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {isIconButton ? (
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
      ) : (
        TextComponent && <TextComponent>{children}</TextComponent>
      )}
    </button>
  );
};

// Export separate IconButton
const IconButton: React.FC<Omit<ButtonProps, "size" | "children">> = (
  props,
) => <Button {...props} size="icon-only" isIconButton />;

export { Button, IconButton };
