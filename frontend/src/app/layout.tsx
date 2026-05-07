/**
 * Root layout for the entire app.
 *
 * Sets up the `<html>` and `<body>` shells, loads the Roboto font
 * family as a local font (twelve weight/italic variants), and
 * mounts global chrome that should appear on every page (currently
 * just the cookie banner).
 *
 * Page-specific chrome (header, footer, side-illustration) is
 * provided by the route-group layouts under `(with-nav)/` and
 * `(auth)/`. This root layout intentionally stays thin so route
 * groups can compose differently.
 */

import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";

import CookieBanner from "@/shared/components/CookieBanner";

/**
 * Roboto loaded locally from bundled `.ttf` files.
 *
 * Each weight + italic variant maps to one source file; the full
 * set lets arbitrary `font-weight` / `font-style` combinations
 * resolve without browser-side faux-bold / faux-italic fallbacks.
 */
const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Roboto-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
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
