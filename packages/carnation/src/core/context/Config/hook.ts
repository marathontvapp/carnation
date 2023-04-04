import { useContext } from "react";
import { ConfigContext } from "./context";

export function useConfig() {
  return useContext(ConfigContext);
}
