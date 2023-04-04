import "@src/styles/globals.css";
import type { AppProps } from "next/app";
import { CarnationProvider, CarnationConfig } from "carnation-ds";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  const config: CarnationConfig = {
    link: {
      component: Link,
    },
  };
  return (
    <CarnationProvider config={config}>
      <Component {...pageProps} />
    </CarnationProvider>
  );
}
