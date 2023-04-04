import React from "react";
import { ConfigProviderProps } from "./types";
import { ConfigContext } from "./context";

export function ConfigProvider({ children, config }: ConfigProviderProps) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
