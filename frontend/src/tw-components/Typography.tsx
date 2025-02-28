import React from "react";
import clsx from "clsx";

const baseStyles = "font-sans leading-[137%]";

const TypographyStyles = {
  Title1: "text-[48px] font-bold",
  Title2: "text-[36px] font-bold",
  Title3: "text-[28px] font-bold",
  Title4: "text-[24px] font-bold",
  Title5: "text-[20px] font-bold",
  Title6: "text-[16px] font-bold",
  Title7: "text-[14px] font-bold",
  Paragraph1: "text-[20px]",
  Paragraph2: "text-[18px]",
  Paragraph3: "text-[16px]",
  Paragraph4: "text-[15px]",
  Paragraph5: "text-[14px]",
  HyperlinkBold: "text-[16px] font-bold underline",
  Hyperlink: "text-[14px] underline",
} as const;

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
  size: (typeof TypographyStyles)[keyof typeof TypographyStyles],
) => {
  const Component = ({ children, className, ...props }: TypographyProps) => (
    <Tag className={clsx(baseStyles, size, className)} {...props}>
      {children}
    </Tag>
  );

  Component.displayName = `Typography.${Tag}`;

  return Component;
};

const Typography = {
  Title1: createTypography("h1", TypographyStyles.Title1),
  Title2: createTypography("h2", TypographyStyles.Title2),
  Title3: createTypography("h3", TypographyStyles.Title3),
  Title4: createTypography("h4", TypographyStyles.Title4),
  Title5: createTypography("h5", TypographyStyles.Title5),
  Title6: createTypography("h6", TypographyStyles.Title6),
  Title7: createTypography("h6", TypographyStyles.Title7),
  Paragraph1: createTypography("p", TypographyStyles.Paragraph1),
  Paragraph2: createTypography("p", TypographyStyles.Paragraph2),
  Paragraph3: createTypography("p", TypographyStyles.Paragraph3),
  Paragraph4: createTypography("p", TypographyStyles.Paragraph4),
  Paragraph5: createTypography("p", TypographyStyles.Paragraph5),
  HyperlinkBold: ({ children, className, href, ...props }: HyperlinkProps) => (
    <a
      href={href}
      className={clsx(baseStyles, TypographyStyles.HyperlinkBold, className)}
      {...props}
    >
      {children}
    </a>
  ),
  Hyperlink: ({ children, className, href, ...props }: HyperlinkProps) => (
    <a
      href={href}
      className={clsx(baseStyles, TypographyStyles.Hyperlink, className)}
      {...props}
    >
      {children}
    </a>
  ),
};

export default Typography;
