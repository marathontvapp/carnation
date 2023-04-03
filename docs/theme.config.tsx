import React from "react";
import { Callout, DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Wordmark } from "./components/Wordmark";

const config: DocsThemeConfig = {
  components: {
    Callout: Callout as any,
    Wordmark,
  },
  docsRepositoryBase:
    "https://github.com/marathontvapp/carnation/blob/main/docs",
  footer: {
    text: <span>&copy; 2023</span>,
  },
  head: (
    <>
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  logo: (
    <span className="flex h-4 aspect-wordmark">
      <Wordmark />
    </span>
  ),
  primaryHue: 6,
  project: {
    link: "https://github.com/marathontvapp/carnation",
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath === "/") {
      return {
        title: "Carnation",
      };
    } else {
      return {
        titleTemplate: "%s - Carnation",
      };
    }
  },
};

export default config;
