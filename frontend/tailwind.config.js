/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/Demo/DemoTailwind.tsx"], // Will change to "./src/**/*.{js,jsx,tsx}", "./templates/index.html"
  theme: {
    extend: {},
  },
  plugins: [],
  // // Temporarily disables preflight for all components
  // corePlugins: {
  //   preflight: false,
  // }
};
