import React from "react";
import { Callout, DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Wordmark } from "./components/Wordmark";
import { Prop } from "./components/Prop";
import * as Table from "./components/Table";

const config: DocsThemeConfig = {
  components: {
    Callout: Callout as any,
    Prop,
    Table: Table as any,
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
    const { pathname } = useRouter();
    if (pathname === "/") {
      return {
        title: "Carnation",
      };
    } else {
      return {
        titleTemplate: "%s | Carnation",
      };
    }
  },
};

export default config;
