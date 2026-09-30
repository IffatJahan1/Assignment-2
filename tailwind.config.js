/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e50914",
        dark: "#0f0f0f",
      },
    },
  },
  plugins: [],
};