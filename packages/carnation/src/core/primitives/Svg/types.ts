import { PropsWithChildren } from "react";
import { ElementProps } from "../types";

export interface SvgProps extends PropsWithChildren, ElementProps {
  viewBox: string;
}

export interface SvgStyleProps<C extends string = string> {
  fill?: C;
  stroke?: C;
  strokeWidth?: number;
  opacity?: number;
}

export interface PathProps extends SvgStyleProps<"currentColor"> {
  d: string;
  fillRule?: "nonzero" | "evenodd";
  clipRule?: "nonzero" | "evenodd";
}

export interface CircleProps extends SvgStyleProps<"currentColor"> {
  cx: number;
  cy: number;
  r: number;
}

export interface RectProps extends SvgStyleProps<"currentColor"> {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LineProps extends SvgStyleProps<"currentColor"> {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
