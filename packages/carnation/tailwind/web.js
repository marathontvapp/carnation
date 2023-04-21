const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = plugin(({ addVariant }) => {
  // Pass through all classes starting with `web:`
  addVariant("web", "&");
});
