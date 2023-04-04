export interface AccessibilityProps {
  role?: "tablist" | "tab" | "tabpanel";
  tabIndex?: 0 | -1;

  ariaHidden?: boolean;

  ariaLabel?: string;
  ariaLabelledBy?: string;

  ariaModal?: boolean;
  ariaControls?: string;

  ariaBusy?: boolean;
  ariaChecked?: boolean | "mixed";
  ariaDisabled?: boolean;
  ariaExpanded?: boolean;
  ariaSelected?: boolean;
  ariaCurrent?: "page";
}

export interface ElementProps extends AccessibilityProps {
  className?: string;
  id?: string;
}

export interface PressableState {
  pressed: boolean;
}
