"use client";

import React from "react";

import { cn } from "@/shared/lib/utils";

import styles from "./Buttons.module.css";
import Typography from "./Typography";

const buttonSizes = {
  small: styles.sizeSmall,
  "small-long": styles.sizeSmallLong,
  medium: styles.sizeMedium,
  "medium-long": styles.sizeMediumLong,
  large: styles.sizeLarge,
  "large-long": styles.sizeLargeLong,
  "icon-only": styles.sizeIconOnly,
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
  default: styles.variantDefault,
  "primary-dark": styles.variantPrimaryDark,
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
    styles.button,
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

interface IconButtonProps {
  className?: string;
  label: string;
  onClick: (e?: React.SyntheticEvent) => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function IconButton({ className, label, onClick, Icon }: IconButtonProps) {
  return (
    <div
      className={cn(styles.iconButton, className)}
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
      <Icon aria-hidden="true" />
    </div>
  );
}

export { Button, IconButton };
