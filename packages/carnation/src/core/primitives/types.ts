export interface AccessibilityState {
  ariaHidden?: boolean;

  ariaModal?: boolean;
  ariaControls?: string;

  ariaBusy?: boolean;
  ariaChecked?: boolean | "mixed";
  ariaDisabled?: boolean;
  ariaExpanded?: boolean;
  ariaSelected?: boolean;
  ariaCurrent?: "page";
}

export interface AccessibilityProps extends AccessibilityState {
  role?: "tablist" | "tab" | "tabpanel";
  tabIndex?: 0 | -1;

  ariaLabel?: string;
  ariaLabelledBy?: string;
}

export interface ElementProps extends AccessibilityProps {
  className?: string;
  id?: string;
}

export interface PressableState {
  pressed: boolean;
}
