import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  docsRepositoryBase:
    "https://github.com/marathontvapp/carnation/blob/main/docs/pages",
  editLink: {
    text: "Edit this page",
  },
  footer: {
    text: <span>&copy; 2023</span>,
  },
  logo: <strong>Carnation</strong>,
  project: {
    link: "https://github.com/marathontvapp/carnation",
  },
};

export default config;
