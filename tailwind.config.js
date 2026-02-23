/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#111111",
        border: "rgba(255,255,255,0.1)",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.4)",
        glow: "0 0 20px rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};
