import type { ComponentType } from "react";
import type { MotionValue as FMMotionValue } from "framer-motion";

export interface TransformProperties {
  perspective?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
  translateX?: number;
  translateY?: number;
}

export type TransformTemplate = (
  | { perspective: number }
  | { rotate: string }
  | { rotateX: string }
  | { rotateY: string }
  | { rotateZ: string }
  | { scale: number }
  | { scaleX: number }
  | { scaleY: number }
  | { skewX: string }
  | { skewY: string }
  | { translateX: number }
  | { translateY: number }
)[];

export type TransformTemplateFn = (
  properties: TransformProperties
) => TransformTemplate;

export interface StyleProperties {
  opacity?: number;
}

export type MotionProperties = TransformProperties & StyleProperties;

export interface Repeat {
  repeat?: number;
  repeatType?: "loop" | "reverse";
  repeatDelay?: number;
}

export interface SpringTransition extends Repeat {
  type: "spring";
  damping?: number;
  mass?: number;
  stiffness?: number;
  velocity?: number;
}

export type BezierDefinition = [number, number, number, number];
export type TimingCurves =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut";

export interface TimingTransition extends Repeat {
  type: "timing";
  duration?: number;
  // prettier-ignore
  ease?: BezierDefinition | TimingCurves;
}

export type Transition = SpringTransition | TimingTransition;

export type TransitionDefinition = Transition &
  Partial<Record<keyof MotionProperties, Transition>>;

export interface TargetAndTransition extends MotionProperties {
  transition?: TransitionDefinition;
}

export type Variant = TargetAndTransition;

export interface Variants {
  [key: string]: Variant;
}

export type MotionValue<V> = Omit<
  FMMotionValue<V>,
  "events" | "clearAnimation"
> & { _shared: { value: V } };

export interface AnimationPlaybackControls {
  cancel: () => void;
}

export type AnimatableValue = number | string | Array<number>;

export type AnimateFn<V extends AnimatableValue> = (
  value: MotionValue<V>,
  to: V,
  options?: Transition
) => AnimationPlaybackControls;

export type MotionStyle = Partial<
  Record<keyof MotionProperties, MotionValue<number>>
>;

export interface MotionProps {
  initial?: TargetAndTransition | string;
  animate?: TargetAndTransition | string;
  variants?: Variants;
  transition?: TransitionDefinition;
  transformTemplate?: TransformTemplateFn;
  style?: MotionStyle;
}

export type MotionComponentType<P extends {}> = ComponentType<
  Omit<P, "style"> & MotionProps
>;
