import React from "react";
import { Callout, DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Byline } from "./components/Byline";
import { Wordmark } from "./components/Wordmark";
import { Prop } from "./components/Prop";
import { Tag } from "./components/Tag";
import Link from "next/link";
import * as Table from "./components/Table";
import { ArrowRightIcon } from "nextra/icons";

const config: DocsThemeConfig = {
  banner: {
    dismissible: false,
    text: (
      <div className="absolute inset-0 bg-yellow-400/10 flex items-center justify-center">
        <p className="text-center font-normal text-yellow-800 dark:text-yellow-600">
          Carnation is now in early alpha.{" "}
          <Link
            className="inline-flex items-center font-semibold"
            href="/blog/2023-04-03-introducing-carnation"
          >
            Read more <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </p>
        <div className="bg-white dark:nx-bg-dark absolute inset-0 -z-10" />
      </div>
    ),
  },
  components: {
    Byline,
    Callout: Callout as any,
    Prop,
    Table: Table as any,
    Tag,
    Wordmark,
  },
  docsRepositoryBase:
    "https://github.com/marathontvapp/carnation/blob/main/docs",
  footer: {
    text: <span>MIT &copy; 2023</span>,
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
    if (pathname === "/docs") {
      return {
        title: "Carnation",
        titleTemplate: "%s",
      };
    } else {
      return {
        titleTemplate: "%s | Carnation",
      };
    }
  },
};

export default config;
