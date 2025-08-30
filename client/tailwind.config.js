/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enable dark mode using a CSS class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb", // main brand blue
          light: "#3b82f6",
          dark: "#1e40af",
        },
        accent: "#f59e0b", // accent yellow
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
