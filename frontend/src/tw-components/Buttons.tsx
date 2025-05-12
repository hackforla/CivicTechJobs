import React from "react";
import Typography from "tw-components/Typography";
import { IconSearch } from "assets/images/images";
import { cn } from "lib/utils";

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

type ButtonVariant = "default" | "primary-dark";

type BaseButtonProps = {
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  default: `
    bg-blue-dark 
    text-white
    hover:bg-blue-dark-hover
    focus:bg-blue-dark-focused
    active:bg-blue-dark-focused
    disabled:bg-grey 
    disabled:text-white
    dark:bg-white 
    dark:text-blue-dark
    dark:hover:bg-grey-light
    dark:focus:bg-[#D9DBDF]
    dark:active:bg-[#D9DBDF]
    dark:disabled:bg-grey
    dark:disabled:text-grey-light
  `,
  "primary-dark": `
    bg-white
    text-blue-dark
    hover:bg-grey-light
    focus:bg-grey-light
    active:bg-grey-light
  `,
};

const BaseButton: React.FC<BaseButtonProps> = ({
  size = "medium",
  disabled = false,
  className,
  variant = "default",
  children,
  onClick,
  href,
}) => {
  const buttonClasses = cn(
    "transition-all duration-200 flex items-center justify-center rounded-[64px] focus:outline-none disabled:cursor-not-allowed",
    buttonSizes[size],
    variantStyles[variant],
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

// Default Button, extends base button, adds typography
const buttonTypography: Record<ButtonSize, React.ElementType> = {
  small: Typography.Title7,
  "small-long": Typography.Title7,
  medium: Typography.Title6,
  "medium-long": Typography.Title6,
  large: Typography.Title5,
  "large-long": Typography.Title5,
  "icon-only": Typography.Title6,
};

type ButtonProps = Omit<BaseButtonProps, "children"> & {
  size?: ButtonSize;
  children?: React.ReactNode;
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
interface SearchButtonProps extends Omit<BaseButtonProps, "size" | "children"> {
  icon?: React.ReactNode;
}

const SearchButton: React.FC<SearchButtonProps> = ({ ...props }) => {
  return (
    <BaseButton {...props} size="icon-only" className="rounded-[24px]">
      <IconSearch />
    </BaseButton>
  );
};

interface IconButtonProps {
  className?: string;
  label: string;
  onClick: (e?: React.SyntheticEvent) => void;
  iconUrl: string;
}

function IconButton({ className, label, onClick, iconUrl }: IconButtonProps) {
  return (
    <div
      className={cn("cursor-pointer focus:outline-none", className)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick(e);
        }
      }}
      role="button"
      aria-label={label}
      tabIndex={0}
    >
      <img src={iconUrl} alt={label} />
    </div>
  );
}

export { Button, SearchButton, IconButton };
