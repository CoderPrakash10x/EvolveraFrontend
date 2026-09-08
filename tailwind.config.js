/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Sans"', "Inter", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#050505",
        accent: "#F97316",
        electric: "#38BDF8",
        violetsoft: "#A78BFA",
        amberglow: "#FBBF24",
      },
    },
  },
  plugins: [],
};
