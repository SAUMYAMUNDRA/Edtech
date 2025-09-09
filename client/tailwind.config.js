// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fcf6f1",
        secondary: "#3c4e67",
        accent: "#b6d2e1",
        dark: "#2a6a6f",
      },
    },
  },
  plugins: [],
};

export default config;
