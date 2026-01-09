/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}", "./hooks/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.10)" },
      keyframes: { shimmer: { "0%": { backgroundPosition: "-700px 0" }, "100%": { backgroundPosition: "700px 0" } } },
      animation: { shimmer: "shimmer 1.6s linear infinite" },
    },
  },
  plugins: [],
};
