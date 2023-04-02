const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
};

module.exports = withNextra(config);
