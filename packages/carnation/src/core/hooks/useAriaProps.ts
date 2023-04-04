import { AriaAttributes, AriaRole } from "react";
import { AccessibilityProps } from "../primitives/types";

export function useAriaProps(
  props: AccessibilityProps
): AriaAttributes & { role?: AriaRole; tabIndex?: number } {
  return {
    role: props.role,
    tabIndex: props.tabIndex,

    "aria-hidden": props.ariaHidden,

    "aria-label": props.ariaLabel,
    "aria-labelledby": props.ariaLabelledBy,

    "aria-modal": props.ariaModal,
    "aria-controls": props.ariaControls,

    "aria-busy": props.ariaBusy,
    "aria-checked": props.ariaChecked,
    "aria-disabled": props.ariaDisabled,
    "aria-expanded": props.ariaExpanded,
    "aria-selected": props.ariaSelected,
    "aria-current": props.ariaCurrent,
  };
}
