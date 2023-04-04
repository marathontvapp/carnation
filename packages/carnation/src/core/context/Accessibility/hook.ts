import { useContext } from "react";
import { AccessibilityContext } from "./context";

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
