/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js"],
  theme: {
    extend: {},
  },
  plugins: [require("carnation-ds/tailwind/native")],
};
