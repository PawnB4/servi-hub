/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e63946",
        darkerPrimary: "#99262E",
        secondary: "#a8dadc",
        darkerSecondary: "#50534F",
        neutral: "#f1faee",
        accent: "#457b9d",
        darkerAccent: "#2E5268",
        fontcolor: "#1d3557",
        complementary: "#08992A",
      },
    },
  },
  plugins: [],
};
