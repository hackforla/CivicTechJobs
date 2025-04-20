import React from "react";
import clsx from "clsx";
import Typography from "tw-components/Typography";

const buttonSizes = {
  small: "px-[24px] h-[32px]",
  "small-long": "px-[40px] h-[32px]",
  medium: "px-[32px] h-[42px]",
  "medium-long": "px-[48px] h-[42px]",
  large: "px-[40px] h-[51px]",
  "large-long": "px-[56px] h-[51px]",
  "icon-only": "px-[24px] h-[42px]",
};

type ButtonSize = keyof typeof buttonSizes;

type BaseButtonProps = {
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

// Shared styles
const baseButtonStyles =
  "transition-all duration-200 flex items-center justify-center rounded-[64px] bg-blue-dark text-white hover:bg-blue-dark-hover focus:bg-blue-dark-focused focus:outline-none active:bg-blue-dark-focused disabled:bg-grey disabled:text-white disabled:cursor-not-allowed";

// Dark mode styles for enabled buttons
const enabledDarkModeStyles =
  "dark:bg-white dark:text-blue-dark dark:hover:bg-grey-light dark:focus:bg-[#D9DBDF] dark:active:bg-[#D9DBDF] dark:disabled:bg-grey dark:disabled:text-grey-light";

// Style 2: White background with blue text
const style2ButtonStyles =
  "transition-all duration-200 flex items-center justify-center rounded-[64px] bg-white text-blue-dark hover:bg-blue-dark hover:text-white focus:bg-blue-dark focus:text-white active:bg-blue-dark active:text-white disabled:bg-grey disabled:text-grey disabled:cursor-not-allowed";

const BaseButton: React.FC<BaseButtonProps> = ({
  size = "medium",
  disabled = false,
  className,
  children,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        className?.includes("style-2") ? style2ButtonStyles : baseButtonStyles,
        buttonSizes[size],
        !disabled && enabledDarkModeStyles,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Default Button, extends base button, adds typography
const buttonTypography: Record<
  Exclude<ButtonSize, "icon-only">,
  React.ElementType
> = {
  small: Typography.Title7,
  "small-long": Typography.Title7,
  medium: Typography.Title6,
  "medium-long": Typography.Title6,
  large: Typography.Title5,
  "large-long": Typography.Title5,
};

type ButtonProps = Omit<BaseButtonProps, "children"> & {
  size?: Exclude<ButtonSize, "icon-only">;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  children,
  ...props
}) => {
  const TextComponent = buttonTypography[size];
  return (
    <BaseButton {...props} size={size}>
      <TextComponent>{children}</TextComponent>
    </BaseButton>
  );
};

// Icon Button, extends base button, adds static svg
type IconButtonProps = Omit<BaseButtonProps, "size" | "children">;

const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <BaseButton {...props} size="icon-only" className="rounded-[24px]">
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
    </BaseButton>
  );
};

export { Button, IconButton };
