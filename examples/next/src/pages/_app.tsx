import "@src/styles/globals.css";
import type { AppProps } from "next/app";
import { CarnationProvider, CarnationConfig } from "carnation-ds";
import Link from "next/link";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  const config: CarnationConfig = {
    link: {
      component: Link,
    },
    image: {
      component: (props) => <Image {...props} fill />,
    },
  };
  return (
    <CarnationProvider config={config}>
      <Component {...pageProps} />
    </CarnationProvider>
  );
}
