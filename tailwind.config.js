/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["calss"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "title-dark": "#243B67",
        "title-light": "#5E77A8",
        "title-lighter": "#829AC9",
        "input-placeholder": "#9EB0D2",
        "input-border": "#E6EBF1",
        "primary-color": "#F1646D",
        "primary-color-hover": "#E15059",
        "orange-color": "#F5A225",
        "orange-color-dark": "#DF9321",
        "green-color": "#33A969",
      },
    },
  },
  plugins: [],
};
