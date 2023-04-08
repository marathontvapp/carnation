import { AccessibilityProps as RNAccessibilityProps } from "react-native";
import { AccessibilityProps } from "../primitives/types";

function getNativeRole(
  role: AccessibilityProps["role"]
): RNAccessibilityProps["accessibilityRole"] {
  switch (role) {
    case "tabpanel":
      return undefined;
    default:
      return role;
  }
}

export function useAriaProps(
  props: AccessibilityProps
): RNAccessibilityProps & { focusable?: boolean } {
  return {
    accessibilityRole: getNativeRole(props.role),

    accessible: props.ariaHidden ? false : undefined,
    focusable:
      typeof props.tabIndex === "undefined" ? undefined : props.tabIndex === 0,

    accessibilityLabel: props.ariaLabel,
    accessibilityLabelledBy: props.ariaLabelledBy,

    accessibilityViewIsModal: props.ariaModal,

    accessibilityState: {
      busy: props.ariaBusy,
      checked: props.ariaChecked,
      disabled: props.ariaDisabled,
      expanded: props.ariaExpanded,
      selected: props.ariaSelected,
    },
  };
}
