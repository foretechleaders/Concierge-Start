
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vbBlue: "#0f4c81",
        vbSand: "#f5e6c8",
        vbSea: "#0fb9b1",
        vbSky: "#3ec5ff"
      }
    },
  },
  plugins: [],
};
