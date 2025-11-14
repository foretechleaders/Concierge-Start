
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vbTeal: "#1E7C83",
        vbOrange: "#F5A623",
        vbSand: "#F4E4C1"
      }
    },
  },
  plugins: [],
};
