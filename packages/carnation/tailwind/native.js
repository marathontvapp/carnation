const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = plugin(({ addVariant, matchVariant }) => {
  // Pass through all classes starting with `native:`
  addVariant("native", "&");

  const ariaStates = ["selected"];
  // Pass through all classes with `aria-*:`
  matchVariant("aria", () => "&", {
    values: ariaStates.reduce((acc, key) => ({ ...acc, [key]: key }), {}),
  });
  // Pass through all classes with `group-aria-*:`
  matchVariant("group-aria", () => "&", {
    values: ariaStates.reduce((acc, key) => ({ ...acc, [key]: key }), {}),
  });
});
