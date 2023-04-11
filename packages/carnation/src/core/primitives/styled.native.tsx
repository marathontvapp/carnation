import { StyledProps, styled as baseStyled } from "nativewind";
import React, { ComponentType, forwardRef, useMemo } from "react";
import { AccessibilityProps } from "./types";

export function useAriaStateVariants(
  className: string,
  props: AccessibilityProps
): string {
  return useMemo(() => {
    const appliedClasses: string[] = [];

    const stateValueMap = new Map<string, string[]>();
    className.split(" ").forEach((c) => {
      const [state] = c.split(":");
      if (state && state.match(/aria-.*$/)) {
        const classes = stateValueMap.get(state) ?? [];
        stateValueMap.set(state, [...classes, c]);
      } else {
        appliedClasses.push(c);
      }
    });

    if (props.ariaSelected) {
      const classes = stateValueMap.get("aria-selected") ?? [];
      appliedClasses.push(...classes);
    }

    return appliedClasses.join(" ");
  }, [className, props.ariaSelected]);
}

export function styled<P extends AccessibilityProps, R>(
  Component: ComponentType<P>
) {
  const StyledComponent = baseStyled(Component);
  return forwardRef<R, StyledProps<P>>(function WrapperComponent(
    { className, ...props },
    ref
  ) {
    const appliedClassName = useAriaStateVariants(className ?? "", props);
    return (
      <StyledComponent
        {...(props as any)}
        ref={ref}
        className={appliedClassName}
      />
    );
  });
}
