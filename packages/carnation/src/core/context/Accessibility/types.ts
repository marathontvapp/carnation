import { PropsWithChildren } from "react";

export interface AccessibilityContextValue {
  universalWeight: "regular" | "bold";
}

export interface AccessibilityProviderProps extends PropsWithChildren {}
