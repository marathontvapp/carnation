import React, { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";
import { AccessibilityContext } from "./context";
import { AccessibilityProviderProps } from "./types";

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [isBoldTextEnabled, setIsBoldTextEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const enabled = await AccessibilityInfo.isBoldTextEnabled();
      setIsBoldTextEnabled(enabled);
    })();

    const subscription = AccessibilityInfo.addEventListener(
      "boldTextChanged",
      (enabled) => {
        setIsBoldTextEnabled(enabled);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{ universalWeight: isBoldTextEnabled ? "bold" : "regular" }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
