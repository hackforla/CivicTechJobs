import React from "react";

import { cn } from "@/shared/lib/utils";

import styles from "./Typography.module.css";

const sizes = {
  Title1: styles.title1,
  Title2: styles.title2,
  Title3: styles.title3,
  Title4: styles.title4,
  Title5: styles.title5,
  Title6: styles.title6,
  Title7: styles.title7,
  Paragraph1: styles.paragraph1,
  Paragraph2: styles.paragraph2,
  Paragraph3: styles.paragraph3,
  Paragraph4: styles.paragraph4,
  Paragraph5: styles.paragraph5,
  HyperlinkBold: styles.hyperlinkBold,
  Hyperlink: styles.hyperlink,
};

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

type HyperlinkProps = {
  href: string;
} & TypographyProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const createTypography = (
  Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p",
  size: string,
) => {
  const Component = ({ children, className, ...props }: TypographyProps) => (
    <Tag className={cn(styles.base, size, className)} {...props}>
      {children}
    </Tag>
  );

  Component.displayName = `Typography.${Tag}`;

  return Component;
};

const Typography = {
  Title1: createTypography("h1", sizes.Title1),
  Title2: createTypography("h2", sizes.Title2),
  Title3: createTypography("h3", sizes.Title3),
  Title4: createTypography("h4", sizes.Title4),
  Title5: createTypography("h5", sizes.Title5),
  Title6: createTypography("h6", sizes.Title6),
  Title7: createTypography("h6", sizes.Title7),
  Paragraph1: createTypography("p", sizes.Paragraph1),
  Paragraph2: createTypography("p", sizes.Paragraph2),
  Paragraph3: createTypography("p", sizes.Paragraph3),
  Paragraph4: createTypography("p", sizes.Paragraph4),
  Paragraph5: createTypography("p", sizes.Paragraph5),
  HyperlinkBold: ({ children, className, href, ...props }: HyperlinkProps) => (
    <a
      href={href}
      className={cn(styles.base, sizes.HyperlinkBold, className)}
      {...props}
    >
      {children}
    </a>
  ),
  Hyperlink: ({ children, className, href, ...props }: HyperlinkProps) => (
    <a
      href={href}
      className={cn(styles.base, sizes.Hyperlink, className)}
      {...props}
    >
      {children}
    </a>
  ),
};

export default Typography;
