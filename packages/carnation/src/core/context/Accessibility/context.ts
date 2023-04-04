import { createContext } from "react";
import { AccessibilityContextValue } from "./types";

export const AccessibilityContext = createContext<AccessibilityContextValue>({
  universalWeight: "regular",
});
