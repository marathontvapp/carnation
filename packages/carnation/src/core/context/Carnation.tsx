import React, { PropsWithChildren } from "react";
import { AccessibilityProvider } from "./Accessibility";
import { ConfigProvider } from "./Config";
import { Config } from "./Config/types";

export interface CarnationProviderProps extends PropsWithChildren {
  config: Config;
}

export function CarnationProvider({
  children,
  config,
}: CarnationProviderProps) {
  return (
    <AccessibilityProvider>
      <ConfigProvider config={config}>{children}</ConfigProvider>
    </AccessibilityProvider>
  );
}
