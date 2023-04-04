import React from "react";
import { Callout, DocsThemeConfig, Tab, Tabs } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Byline } from "./components/Byline";
import { Wordmark } from "./components/Wordmark";
import { Prop } from "./components/Prop";
import { NPMLink } from "./components/NPMLink";
import { Tag } from "./components/Tag";
import Link from "next/link";
import * as Table from "./components/Table";
import { ArrowRightIcon } from "nextra/icons";

const config: DocsThemeConfig = {
  banner: {
    dismissible: false,
    text: (
      <p className="text-center font-normal">
        Carnation is now in early alpha.{" "}
        <Link
          className="inline-flex items-center font-semibold"
          href="/blog/2023-04-04-introducing-carnation"
        >
          Read more <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </p>
    ),
  },
  components: {
    Byline,
    Callout: Callout as any,
    NPMLink: NPMLink as any,
    Prop,
    Tab,
    Tabs: Tabs as any,
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
      <meta
        name="description"
        content="Accessible framework for building universal React design systems."
      />

      <link rel="icon" href="/favicon.ico" />

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta
        name="og:description"
        content="Accessible framework for building universal React design systems."
      />
      <meta property="og:site_name" content="Carnation" />
      <meta
        property="og:image"
        content="https://carnation.vercel.app/og_image.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="675" />
      <meta property="og:image:type" content="image/png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@marathontvapp" />
      <meta name="twitter:site" content="@marathontvapp" />
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
