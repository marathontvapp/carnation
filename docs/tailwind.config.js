/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.mdx", "./theme.config.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      aspectRatio: {
        wordmark: "124/17",
      },
    },
  },
};
