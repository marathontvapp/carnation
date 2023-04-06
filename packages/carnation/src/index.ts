export type { Config as CarnationConfig } from "./core/context";
export type {
  AccessibilityProps,
  ElementProps,
  PressableState,
} from "./core/primitives/types";
export type { TaggedTextProps as LayoutElementProps } from "./core/primitives/Text/types";
export type { TaggedViewProps as TextElementProps } from "./core/primitives/View/types";
export type { LinkProps } from "./core/primitives/Link/types";
export type { ButtonProps } from "./core/primitives/Button/types";
export type { ImageProps } from "./core/primitives/Image/types";
export type {
  SvgProps,
  CircleProps,
  LineProps,
  PathProps,
  RectProps,
} from "./core/primitives/Svg/types";

export { c } from "./core";
export { CarnationProvider, useAccessibility } from "./core/context";
