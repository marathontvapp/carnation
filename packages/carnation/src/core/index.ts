export * as c from "./primitives";
export { CarnationProvider, useAccessibility } from "./context";

export type { Config as CarnationConfig } from "./context";
export type {
  AccessibilityProps,
  ElementProps,
  PressableState,
} from "./primitives/types";
export type { TaggedTextProps as TextElementProps } from "./primitives/Text/types";
export type { TaggedViewProps as LayoutElementProps } from "./primitives/View/types";
export type { LinkProps as LinkElementProps } from "./primitives/Link/types";
export type { ButtonProps as ButtonElementProps } from "./primitives/Button/types";
export type { ImageProps as ImageElementProps } from "./primitives/Image/types";
export type {
  SvgProps as SvgElementProps,
  CircleProps as CircleElementProps,
  LineProps as LineElementProps,
  PathProps as PathElementProps,
  RectProps as RectElementProps,
} from "./primitives/Svg/types";
