import React, {
  ComponentType,
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from "react";
import { styled as baseStyled } from "nativewind";
import type { AccessibilityState, ElementProps } from "./primitives/types";

export const GroupAccessibilityStateContext = createContext<AccessibilityState>(
  {}
);
GroupAccessibilityStateContext.displayName = "GroupAccessibilityStateContext";

function useAccessibilityState(props: ElementProps): AccessibilityState {
  return useMemo(
    () => ({
      ariaBusy: props.ariaBusy,
      ariaChecked: props.ariaChecked,
      ariaControls: props.ariaControls,
      ariaCurrent: props.ariaCurrent,
      ariaDisabled: props.ariaDisabled,
      ariaExpanded: props.ariaExpanded,
      ariaHidden: props.ariaHidden,
      ariaModal: props.ariaModal,
      ariaSelected: props.ariaSelected,
    }),
    [
      props.ariaBusy,
      props.ariaChecked,
      props.ariaControls,
      props.ariaCurrent,
      props.ariaDisabled,
      props.ariaExpanded,
      props.ariaHidden,
      props.ariaModal,
      props.ariaSelected,
    ]
  );
}

function useAccessibilityStateClasses(
  className: string,
  state: AccessibilityState,
  groupState: AccessibilityState = {}
): string {
  return useMemo(() => {
    const appliedClasses: string[] = [];

    const stateValueMap = new Map<string, string[]>();
    className.split(" ").forEach((c) => {
      const [state] = c.split(":");
      if (state && state.match(/(group-)?aria-.*$/)) {
        const classes = stateValueMap.get(state) ?? [];
        stateValueMap.set(state, [...classes, c]);
      } else {
        appliedClasses.push(c);
      }
    });

    if (state.ariaSelected) {
      const classes = stateValueMap.get("aria-selected") ?? [];
      appliedClasses.push(...classes);
    }

    if (groupState.ariaSelected) {
      const classes = stateValueMap.get("group-aria-selected") ?? [];
      appliedClasses.push(...classes);
    }

    return appliedClasses.join(" ");
  }, [className, state, groupState]);
}

export function styled<P extends ElementProps, R>(Component: ComponentType<P>) {
  const StyledComponent = baseStyled(Component);

  const AccessibleStyledComponent = forwardRef<R, P>(
    function AccessibleStyledComponent({ className, ...props }, ref) {
      const groupAccessibilityState = useContext(
        GroupAccessibilityStateContext
      );
      const accessibilityState = useAccessibilityState(props);
      const appliedClassName = useAccessibilityStateClasses(
        className ?? "",
        accessibilityState,
        groupAccessibilityState
      );

      let element = (
        <StyledComponent
          {...(props as any)}
          ref={ref}
          className={appliedClassName}
        />
      );

      const isGroup = className?.split(" ").includes("group") ?? false;
      if (isGroup) {
        element = (
          <GroupAccessibilityStateContext.Provider value={accessibilityState}>
            {element}
          </GroupAccessibilityStateContext.Provider>
        );
      }

      return element;
    }
  );

  return AccessibleStyledComponent;
}
