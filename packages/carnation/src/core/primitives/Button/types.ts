import { ReactNode } from "react";
import { ElementProps, PressableState } from "../types";

export interface ButtonProps extends ElementProps {
  children?: ReactNode | ((state: PressableState) => ReactNode);

  disabled?: boolean;
  onPress?(evt: any): void;
}
