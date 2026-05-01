import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";

import CookieBanner from "@/shared/components/CookieBanner";

// Roboto loaded locally from the legacy app's bundled `.ttf` files. Each
// weight + italic variant maps to one source file; the full set lets
// arbitrary `font-weight`/`font-style` combinations resolve without
// faux-bold/italic browser fallbacks.
const roboto = localFont({
  src: [
    { path: "../../public/fonts/Roboto-Thin.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/Roboto-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../../public/fonts/Roboto-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Roboto-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../../public/fonts/Roboto-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Roboto-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/Roboto-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Roboto-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../../public/fonts/Roboto-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Roboto-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../../public/fonts/Roboto-Black.ttf", weight: "900", style: "normal" },
    { path: "../../public/fonts/Roboto-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CivicTechJobs",
  description:
    "CivicTechJobs helps technology practitioners interested in having civic impact find job opportunities from a central hub of listings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
