/** @type {import('tailwindcss').Config} */

/*
 * Please refer to CTJ Figma Design System for more details about custom theme values
 **/

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/Demo/DemoTailwind.tsx",
    "./src/pages/Authentication/*.tsx",
    "./src/tw-components/*.tsx",
    "./src/pages/LandingPage/*.tsx",
    "./src/pages/PrivacyPolicyPage/*",
    "./src/pages/CreditsPage/*.tsx",
    "./src/pages/QualifierPage/**/*.tsx",
  ], // Will change to "./src/**/*.{js,jsx,tsx}", "./templates/index.html"
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
      // Primary Colors
      "blue-dark": "#3450a1",
      "blue-darker": "#323d69",
      "blue-dark-hover": "#445ea9",
      "blue-dark-focused": "#273c79",
      // Primary on Dark Colors
      blue: "#44aff1",
      "blue-focused": "#3fa1de",
      "blue-link": "#3a4f9c",
      // Secondary Colors
      tan: "#ffe0b9",
      "tan-light": "#ffefdb",
      "tan-bg": "#fbe8ce",
      green: "#13831e",
      red: "#c93329",
      // Neutral Colors
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
  },
  plugins: [],
  // // Temporarily disables preflight for all components
  // corePlugins: {
  //   preflight: false,
  // }
};
