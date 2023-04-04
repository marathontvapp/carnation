import React, {
  ComponentType,
  forwardRef,
  FunctionComponent,
  useEffect,
  useMemo,
} from "react";
import {
  MotionProps,
  MotionValue,
  TargetAndTransition,
  MotionProperties,
  TransitionDefinition,
  Transition,
  Variants,
  AnimationPlaybackControls,
  AnimatableValue,
  MotionStyle,
  TimingTransition,
  TimingCurves,
  TransformProperties,
  TransformTemplate,
} from "./types";
import Animated, {
  cancelAnimation,
  Easing,
  EasingFunctionFactory,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { EasingFunction, ViewStyle } from "react-native";

const MOTION_STYLE_PROPERTIES: (keyof MotionProperties)[] = [
  "perspective",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY",
  "translateX",
  "translateY",
  "opacity",
];

export function useMotionValue<V>(initialValue: V): MotionValue<V> {
  const value = useSharedValue(initialValue);
  return useMemo(
    () => ({
      value,
      clearListeners() {
        // stub
      },
      destroy() {
        // stub
      },
      get() {
        "worklet";
        return value.value;
      },
      getPrevious() {
        "worklet";
        // stub
        return initialValue;
      },
      getVelocity() {
        // stub
        return 0;
      },
      hasAnimated: false,
      isAnimating() {
        // stub
        return false;
      },
      jump(v) {
        this.set(v);
      },
      onChange() {
        // stub
        return () => {};
      },
      on() {
        // stub
        return () => {};
      },
      set(v) {
        "worklet";
        value.value = v;
      },
      setWithVelocity(prev, current) {
        "worklet";
        value.value = current;
      },
      stop() {
        "worklet";
        cancelAnimation(value);
      },
      updateAndNotify(v) {
        "worklet";
        this.set(v);
      },
      version: "__VERSION__",
    }),
    []
  );
}

function getTargetValue<P extends keyof MotionProperties>(
  property: P,
  target: TargetAndTransition | string | undefined,
  variants: Variants | undefined,
  defaultValue: Required<MotionProperties>[P]
): Required<MotionProperties>[P] {
  if (typeof target === "string") {
    const variant = variants?.[target] ?? {};
    return variant[property] ?? defaultValue;
  } else if (target) {
    return target[property] ?? defaultValue;
  } else {
    return defaultValue;
  }
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};
function getTransition<P extends keyof MotionProperties>(
  property: P,
  target: TargetAndTransition | string | undefined,
  variants: Variants | undefined,
  transition: TransitionDefinition | undefined
): Transition {
  const defaultTransition =
    transition?.[property] ?? transition ?? DEFAULT_TRANSITION;
  if (typeof target === "string") {
    const variant = variants?.[target] ?? {};
    return (
      variant.transition?.[property] ?? variant.transition ?? defaultTransition
    );
  } else if (target) {
    return (
      target.transition?.[property] ?? target.transition ?? defaultTransition
    );
  } else {
    return defaultTransition;
  }
}

const EASINGS: Readonly<
  Record<TimingCurves, EasingFunction | EasingFunctionFactory>
> = {
  backIn: Easing.bezier(0.36, 0, 0.66, -0.56),
  backInOut: Easing.bezier(0.68, -0.6, 0.32, 1.6),
  backOut: Easing.bezier(0.34, 1.56, 0.64, 1),
  circIn: Easing.bezier(0.55, 0, 1, 0.45),
  circInOut: Easing.bezier(0.85, 0, 0.15, 1),
  circOut: Easing.bezier(0, 0.55, 0.45, 1),
  easeIn: Easing.bezier(0.42, 0, 1, 1),
  easeInOut: Easing.bezier(0.42, 0, 1, 1),
  easeOut: Easing.bezier(0.42, 0, 0.58, 1),
  linear: Easing.linear,
};
const DEFAULT_EASING = EASINGS.easeInOut;

function getEasing(ease: TimingTransition["ease"]) {
  if (Array.isArray(ease)) {
    return Easing.bezier(...ease);
  } else if (typeof ease === "string") {
    return EASINGS[ease];
  } else {
    return DEFAULT_EASING;
  }
}

export function animate<V extends AnimatableValue>(
  value: MotionValue<V>,
  to: V,
  options?: Transition
): AnimationPlaybackControls {
  let animation: V | undefined;
  let transition = options ?? DEFAULT_TRANSITION;

  if (transition.type === "spring") {
    animation = withSpring(to, transition);
  } else if (transition.type === "timing") {
    animation = withTiming(to, {
      duration: transition.duration ? transition.duration * 1000 : undefined,
      easing: getEasing(transition.ease),
    });
  }

  if (typeof animation !== "undefined") {
    if (transition.repeat) {
      animation = withRepeat(
        animation,
        transition.repeat,
        transition.repeatType === "reverse"
      );
    }

    value.set(animation);
  }

  return {
    cancel() {
      "worklet";
      value.stop();
      value.set(value.getPrevious());
    },
  };
}

function useTrackedMotionValue<P extends keyof MotionProperties>(
  property: P,
  props: MotionProps,
  defaultValue: Required<MotionProperties>[P]
): MotionValue<Required<MotionProperties>[P]> {
  const value = useMotionValue(
    getTargetValue(property, props.initial, props.variants, defaultValue)
  );

  const toValue = getTargetValue(
    property,
    props.animate,
    props.variants,
    defaultValue
  );
  useEffect(() => {
    const transition = getTransition(
      property,
      props.animate,
      props.variants,
      props.transition
    );

    value.stop();
    animate(value, toValue, transition);
  }, [toValue]);

  return value;
}

function DEFAULT_TRANSFORM_TEMPLATE(
  props: TransformProperties
): TransformTemplate {
  "worklet";
  return [
    { perspective: props.perspective ?? 0 },
    { rotate: `${props.rotate ?? 0}deg` },
    { rotateX: `${props.rotateX ?? 0}deg` },
    { rotateY: `${props.rotateY ?? 0}deg` },
    { rotateZ: `${props.rotateZ ?? 0}deg` },
    { scale: props.scale ?? 1 },
    { scaleX: props.scaleX ?? 1 },
    { scaleY: props.scaleY ?? 1 },
    { skewX: `${props.skewX ?? 0}deg` },
    { skewY: `${props.skewY ?? 0}deg` },
    { translateX: props.translateX ?? 0 },
    { translateY: props.translateY ?? 0 },
  ];
}

export function motion<Props extends object, Ref>(
  Component: ComponentType<Props>
) {
  const AnimatedComponent = Animated.createAnimatedComponent(
    Component as FunctionComponent<Props>
  );

  return forwardRef<Ref, Omit<Props, "style"> & MotionProps>(
    function MotionComponent(
      {
        animate,
        initial,
        style,
        transformTemplate = DEFAULT_TRANSFORM_TEMPLATE,
        transition,
        variants,
        ...props
      },
      ref
    ) {
      // Account for style prop passed by `className` transformation
      const [viewStyle, motionStyle] = useMemo(() => {
        const styleProp: ViewStyle | MotionStyle | [ViewStyle, MotionStyle] =
          style ?? {};
        const viewStyle: ViewStyle = {};
        const motionStyle: MotionStyle = {};
        const mergedStyle = Array.isArray(styleProp)
          ? styleProp.reduce((acc, curr) => ({ ...acc, ...curr } as any), {})
          : styleProp;
        Object.entries(mergedStyle).map((entry) => {
          const [key, value] = entry as unknown as [
            keyof (MotionProperties | ViewStyle),
            any
          ];
          if (MOTION_STYLE_PROPERTIES.includes(key)) {
            motionStyle[key] = value;
          } else {
            viewStyle[key] = value;
          }
        });
        return [viewStyle, motionStyle];
      }, [style]);

      const motionProps = {
        animate,
        initial,
        style: motionStyle,
        transition,
        variants,
      };

      // Transform properties
      const perspective = useTrackedMotionValue(
        "perspective",
        motionProps,
        1000
      );
      const rotate = useTrackedMotionValue("rotate", motionProps, 0);
      const rotateX = useTrackedMotionValue("rotateX", motionProps, 0);
      const rotateY = useTrackedMotionValue("rotateY", motionProps, 0);
      const rotateZ = useTrackedMotionValue("rotateZ", motionProps, 0);
      const scale = useTrackedMotionValue("scale", motionProps, 1);
      const scaleX = useTrackedMotionValue("scaleX", motionProps, 1);
      const scaleY = useTrackedMotionValue("scaleY", motionProps, 1);
      const skewX = useTrackedMotionValue("skewX", motionProps, 0);
      const skewY = useTrackedMotionValue("skewY", motionProps, 0);
      const translateX = useTrackedMotionValue("translateX", motionProps, 0);
      const translateY = useTrackedMotionValue("translateY", motionProps, 0);
      // Style properties
      const opacity = useTrackedMotionValue("opacity", motionProps, 1);

      const animatedStyle = useAnimatedStyle(() => {
        return {
          opacity: motionStyle?.opacity?.get() ?? opacity.get(),
          transform: transformTemplate({
            perspective: motionStyle?.perspective?.get() ?? perspective.get(),
            rotate: motionStyle?.rotate?.get() ?? rotate.get(),
            rotateX: motionStyle?.rotateX?.get() ?? rotateX.get(),
            rotateY: motionStyle?.rotateY?.get() ?? rotateY.get(),
            rotateZ: motionStyle?.rotateZ?.get() ?? rotateZ.get(),
            scale: motionStyle?.scale?.get() ?? scale.get(),
            scaleX: motionStyle?.scaleX?.get() ?? scaleX.get(),
            scaleY: motionStyle?.scaleY?.get() ?? scaleY.get(),
            skewX: motionStyle?.skewX?.get() ?? skewX.get(),
            skewY: motionStyle?.skewY?.get() ?? skewY.get(),
            translateX: motionStyle?.translateX?.get() ?? translateX.get(),
            translateY: motionStyle?.translateY?.get() ?? translateY.get(),
          }),
        };
      });

      return (
        <AnimatedComponent
          ref={ref}
          style={[viewStyle, animatedStyle]}
          {...(props as any)}
        />
      );
    }
  );
}
