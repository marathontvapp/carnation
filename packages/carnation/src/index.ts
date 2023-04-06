export type { Config as CarnationConfig } from "./core/context";
export type {
  AccessibilityProps,
  ElementProps,
  PressableState,
} from "./core/primitives/types";
export type { TaggedTextProps as TextElementProps } from "./core/primitives/Text/types";
export type { TaggedViewProps as LayoutElementProps } from "./core/primitives/View/types";
export type { LinkProps as LinkElementProps } from "./core/primitives/Link/types";
export type { ButtonProps as ButtonElementProps } from "./core/primitives/Button/types";
export type { ImageProps as ImageElementProps } from "./core/primitives/Image/types";
export type {
  SvgProps as SvgElementProps,
  CircleProps as CircleElementProps,
  LineProps as LineElementProps,
  PathProps as PathElementProps,
  RectProps as RectElementProps,
} from "./core/primitives/Svg/types";

export { c } from "./core";
export { CarnationProvider, useAccessibility } from "./core/context";
