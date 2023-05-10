/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        llg: "1052px",
      },
    },
  },
  plugins: [],
};
