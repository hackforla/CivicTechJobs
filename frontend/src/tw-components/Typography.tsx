import React, { ReactNode } from "react";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

type HyperlinkProps = {
  href: string;
} & TypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;


const Typography = {
  Title1: ({ children, className = "", ...props }: TypographyProps) => (
    <h1 className={`font-sans font-bold text-[48px] leading-[137%] ${className}`} {...props}>
      {children}
    </h1>
  ),
  Title2: ({ children, className = "", ...props }: TypographyProps) => (
    <h2 className={`font-sans font-bold text-[36px] leading-[137%] ${className}`} {...props}>
      {children}
    </h2>
  ),
  Title3: ({ children, className = "", ...props }: TypographyProps) => (
    <h3 className={`font-sans font-bold text-[28px] leading-[137%] ${className}`} {...props}>
      {children}
    </h3>
  ),
  Title4: ({ children, className = "", ...props }: TypographyProps) => (
    <h4 className={`font-sans font-bold text-[24px] leading-[30px] ${className}`} {...props}>
      {children}
    </h4>
  ),
  Title5: ({ children, className = "", ...props }: TypographyProps) => (
    <h5 className={`font-sans font-bold text-[20px] leading-[137%] ${className}`} {...props}>
      {children}
    </h5>
  ),
  Title6: ({ children, className = "", ...props }: TypographyProps) => (
    <h6 className={`font-sans font-bold text-[16px] leading-[137%] ${className}`} {...props}>
      {children}
    </h6>
  ),
  Title7: ({ children, className = "", ...props }: TypographyProps) => (
    <h6 className={`font-sans font-bold text-[14px] leading-[137%] ${className}`} {...props}>
      {children}
    </h6>
  ),
  Paragraph1: ({ children, className = "", ...props }: TypographyProps) => (
    <p className={`font-sans text-[20px] leading-[137%] ${className}`} {...props}>
      {children}
    </p>
  ),
  Paragraph2: ({ children, className = "", ...props }: TypographyProps) => (
    <p className={`font-sans text-[18px] leading-[137%] ${className}`} {...props}>
      {children}
    </p>
  ),
  Paragraph3: ({ children, className = "", ...props }: TypographyProps) => (
    <p className={`font-sans text-[16px] leading-[137%] ${className}`} {...props}>
      {children}
    </p>
  ),
  Paragraph4: ({ children, className = "", ...props }: TypographyProps) => (
    <p className={`font-sans text-[15px] leading-[137%] ${className}`} {...props}>
      {children}
    </p>
  ),
  Paragraph5: ({ children, className = "", ...props }: TypographyProps) => (
    <p className={`font-sans text-[14px] leading-[137%] ${className}`} {...props}>
      {children}
    </p>
  ),
  HyperlinkBold: ({ children, className, href, ...props }: HyperlinkProps) => (
    <a
      href={href}
      className={`font-sans font-bold underline text-[16px] leading-[137%] ${className}`}
      {...props}
    >
      {children}
    </a>
  ),
  Hyperlink: ({ children, className, href, ...props }: HyperlinkProps) => (
    <a
      href={href}
      className={`font-sans underline text-[14px] leading-[137%] ${className}`}
      {...props}
    >
      {children}
    </a>
  ),
};

export default Typography;
