/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/Demo/DemoTailwind.tsx",
    "./src/pages/Authentication/*.tsx",
    "./src/tw-components/*.tsx",
    "./src/pages/LandingPage/*.tsx",
    "./src/pages/PrivacyPolicyPage/*",
    "./src/pages/CreditsPage/*.tsx",
  ], // Will change to "./src/**/*.{js,jsx,tsx}", "./templates/index.html"
  theme: {
    screens: {
      xs: "480px",
      // => @media (min-width: 480px) { ... }
      sm: "577px",
      // => @media (min-width: 577px) { ... }
      md: "769px",
      // => @media (min-width: 769px) { ... }
      lg: "1025px",
      // => @media (min-width: 1025px) { ... }
      xl: "1201px",
      // => @media (min-width: 1201px) { ... }
    },
    colors: {
      // Primary Colors
      "blue-dark": "#3450a1",
      "blue-darker": "#323d69",
      "blue-dark-hover": "#445ea9",
      "blue-dark-focused": "#273c79",
      // Primary on Dark Colors
      blue: "#44aff1",
      "blue-focused": "#3fa1de",
      // Secondary Colors
      tan: "#ffe0b9",
      "tan-light": "#ffefdb",
      "tan-bg": "#fbe8ce",
      green: "#13831e",
      red: "#CC0023",
      // Neutral Colors
      white: "#fff",
      "grey-light": "#f2f2f2",
      grey: "#c1c1c1",
      "grey-dark": "#585858",
      charcoal: "#333",
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
      lineHeight: {
        "extra-tight": "1.125rem",
      },
      borderRadius: {
        DEFAULT: "20px",
        large: "60px",
        "x-large": "100px",
      },
      rotate: {
        290: "290deg",
        345: "345deg",
      },
    },
  },
  plugins: [],
  // // Temporarily disables preflight for all components
  // corePlugins: {
  //   preflight: false,
  // }
};
