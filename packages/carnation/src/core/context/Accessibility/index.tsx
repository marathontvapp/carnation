import { Fragment } from "react";
import { AccessibilityProviderProps } from "./types";

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  return <Fragment>{children}</Fragment>;
}
