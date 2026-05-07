import type { Config } from "tailwindcss";

// Tailwind is preserved from the legacy app for visual parity during the
// Next.js port. PR2 swaps Tailwind classes for CSS Modules; this config
// will be removed alongside the Tailwind dependency at that point.
//
// Theme values mirror the CTJ Figma design system - see frontend.old/
// during the port for the original config history.
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "577px",
      md: "769px",
      lg: "1025px",
      xl: "1201px",
    },
    colors: {
      transparent: "transparent",
      "blue-dark": "#3450a1",
      "blue-darker": "#323d69",
      "blue-dark-hover": "#445ea9",
      "blue-dark-focused": "#273c79",
      blue: "#44aff1",
      "blue-focused": "#3fa1de",
      "blue-link": "#3a4f9c",
      tan: "#ffe0b9",
      "tan-light": "#ffefdb",
      "tan-bg": "#fbe8ce",
      green: "#13831e",
      red: "#c93329",
      white: "#ffffff",
      "grey-light": "#f2f2f2",
      grey: "#c1c1c1",
      "grey-dark": "#585858",
      charcoal: "#333333",
    },
    fontFamily: {
      sans: ["Roboto", "Tahoma", "Verdana", "sans-serif"],
    },
    fontWeight: {
      thin: "100",
      light: "300",
      normal: "400",
      medium: "500",
      bold: "700",
      black: "900",
    },
    extend: {
      borderRadius: {
        DEFAULT: "20px",
        large: "60px",
        "x-large": "100px",
      },
      lineHeight: {
        "extra-tight": "1.125rem",
      },
      rotate: {
        290: "290deg",
        345: "345deg",
      },
      spacing: {
        p0: "0px",
        p1: "8px",
        p2: "16px",
        p3: "24px",
        p4: "32px",
        p5: "40px",
        p6: "48px",
        p7: "56px",
        p8: "64px",
        p9: "72px",
        p10: "80px",
      },
    },
    animation: {
      "slide-in-top": "slide-in-top 400ms ease-in-out",
      "slide-out-bottom": "slide-out-bottom 400ms ease-in-out",
    },
    keyframes: {
      "slide-in-top": {
        "0%": { transform: "translateY(-100%)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
      "slide-out-bottom": {
        "0%": { transform: "translateY(0)", opacity: "1" },
        "100%": { transform: "translateY(100%)", opacity: "0" },
      },
    },
  },
  plugins: [],
};

export default config;
