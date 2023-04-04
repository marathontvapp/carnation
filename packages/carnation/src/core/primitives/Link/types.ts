import { ReactNode } from "react";
import { ElementProps, PressableState } from "../types";

export interface LinkProps extends ElementProps {
  children?: ReactNode | ((state: PressableState) => ReactNode);

  href: string;
  target?: "_blank";
  rel?: string;
}
