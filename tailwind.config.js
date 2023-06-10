/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "title-dark": "#243B67",
        "title-light": "#5E77A8",
        "input-placeholder": "#9EB0D2",
        "input-border": "#E6EBF1",
        "primary-color": "#F1646D",
        "primary-color-hover": "#E15059",
        "orange-color": "#F5A225",
      },
    },
  },
  plugins: [],
};
