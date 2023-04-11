const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = plugin(({ addVariant, matchVariant }) => {
  // Pass through all classes starting with `native:`
  addVariant("native", "&");

  // Pass through all classes with `aria-*:`
  matchVariant("aria", () => "&", {
    values: {
      selected: "selected",
    },
  });
});
