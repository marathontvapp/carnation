import {
  animate as _animate,
  motion as _motion,
  useMotionValue as _useMotionValue,
} from "framer-motion";
import { ComponentType, forwardRef } from "react";
import {
  AnimatableValue,
  AnimateFn,
  AnimationPlaybackControls,
  MotionComponentType,
  MotionProps,
  MotionValue,
  TransformProperties,
  Transition,
} from "./types";

export function motion<Props extends object, Ref>(
  Component: ComponentType<Props>
): MotionComponentType<Props> {
  const AnimatedComponent = _motion(Component);

  return forwardRef<Ref, Omit<Props, "style"> & MotionProps>(
    function MotionComponent({ transformTemplate, ...props }, ref) {
      return (
        <AnimatedComponent
          ref={ref}
          {...(props as any)}
          transformTemplate={(properties, generatedTemplate) => {
            if (!transformTemplate) {
              return generatedTemplate;
            }
            const template = transformTemplate(
              properties as TransformProperties
            );
            return template
              .flatMap((object) => {
                return Object.entries(object).map(
                  ([key, value]) => `${key}(${value})`
                );
              })
              .join(" ");
          }}
        />
      );
    }
  ) as any;
}

export function animate<V extends AnimatableValue>(
  value: MotionValue<V>,
  to: V,
  options?: Transition
): AnimationPlaybackControls {
  return (_animate as AnimateFn<V>)(value, to, options);
}

export function useMotionValue<V>(initialValue: V): MotionValue<V> {
  return _useMotionValue(initialValue) as any;
}
