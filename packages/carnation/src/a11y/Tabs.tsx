import React, {
  PropsWithChildren,
  createContext,
  useContext as _useContext,
  isValidElement,
  Children,
  useCallback,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
} from "react";
import { c, LayoutElementProps, ButtonElementProps } from "../core";
import { slugify } from "../utils/slugify";
import { Slot as BaseSlot } from "@radix-ui/react-slot";
import { useIsPresent } from "framer-motion";

const Slot = BaseSlot as <P, R = any>(
  props: P & { ref?: ForwardedRef<R> }
) => JSX.Element;

type Identifier = string | number;

interface TabsState {
  value: Identifier;
  onValueChange(value: Identifier): void;
}

const TabsContext = createContext<TabsState | null>(null);

// Root

export interface RootProps<T extends Identifier> extends PropsWithChildren<{}> {
  onValueChange(value: T): void;
  value: T;
}

export function Root<T extends Identifier>({
  children,
  onValueChange,
  value,
}: RootProps<T>) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      {children}
    </TabsContext.Provider>
  );
}

// List

export interface ListProps extends Omit<LayoutElementProps, "role"> {
  asChild?: boolean;
}

export function List({ asChild, children, ...props }: ListProps) {
  const store = _useContext(TabsContext);
  if (!store) {
    throw new Error("Tabs.Trigger should be used within Tabs.Root.");
  }

  // WEB ONLY: respond to keyboard events
  const onKeyDownCapture = useCallback(
    (evt: KeyboardEvent) => {
      const childElements =
        asChild && isValidElement(children)
          ? children.props.children
          : children;
      const triggers = Children.toArray(childElements).filter(isValidElement);
      const triggerValues = triggers.flatMap((child) => {
        if (
          child.props &&
          typeof child.props === "object" &&
          "value" in child.props
        ) {
          return child.props.value as Identifier;
        } else {
          return [];
        }
      });

      // Get all values of enabled triggers
      const focusableValues = triggerValues.flatMap((value) => {
        const id = slugify(value.toString());
        const element = document.getElementById(id);
        if (
          !(element instanceof HTMLButtonElement) ||
          element.ariaDisabled === "true" ||
          element.disabled
        ) {
          return [];
        } else {
          return value;
        }
      });

      const selectedIndex = focusableValues.findIndex(
        (value) => value === store.value
      );
      let nextValue: unknown;
      if (evt.key === "Home") {
        nextValue = focusableValues.at(0);
      } else if (evt.key === "End") {
        nextValue = focusableValues.at(-1);
      } else if (evt.key === "ArrowRight" && selectedIndex >= 0) {
        nextValue = focusableValues.at(
          (selectedIndex + 1) % focusableValues.length
        );
      } else if (evt.key === "ArrowLeft" && selectedIndex >= 0) {
        nextValue = focusableValues.at(
          (focusableValues.length + selectedIndex - 1) % focusableValues.length
        );
      }

      if (typeof nextValue === "string" || typeof nextValue === "number") {
        // Update the store
        store.onValueChange(nextValue);
        // Focus the trigger
        const id = slugify(nextValue.toString());
        const trigger = document.getElementById(id);
        trigger?.focus();
      }
    },
    [asChild, children, store]
  );

  const Component = asChild ? Slot : c.div;
  return (
    <Component role="tablist" onKeyDownCapture={onKeyDownCapture} {...props}>
      {children}
    </Component>
  );
}

// Trigger

export interface TriggerProps
  extends PropsWithChildren<
    Omit<
      ButtonElementProps,
      "children" | "id" | "role" | "onPress" | "ariaControls" | "ariaSelected"
    >
  > {
  asChild?: boolean;
  value: Identifier;
}

export const Trigger = forwardRef<any, TriggerProps>(function Trigger(
  { asChild, children, value, ...props },
  ref
) {
  const store = _useContext(TabsContext);
  if (!store) {
    throw new Error("Tabs.Trigger should be used within Tabs.Root.");
  }

  const id = slugify(value.toString());
  const selected = value === store.value;

  const Component = asChild ? Slot : c.button;
  return (
    <Component
      ref={ref}
      id={id}
      onPress={() => {
        store.onValueChange(value);
      }}
      role="tab"
      tabIndex={selected ? 0 : -1}
      ariaControls={`tabpanel-${id}`}
      ariaSelected={selected}
      {...props}
    >
      {children}
    </Component>
  );
});

// Content

export interface ContentProps
  extends Omit<
    LayoutElementProps,
    "id" | "role" | "ariaHidden" | "ariaLabelledBy"
  > {
  asChild?: boolean;
  value: Identifier;
}

export function Content({ asChild, children, value, ...props }: ContentProps) {
  const store = _useContext(TabsContext);
  if (!store) {
    throw new Error("Tabs.Content should be used within Tabs.Root.");
  }

  const selected = store.value === value;

  const id = slugify(value.toString());

  const isPresent = useIsPresent();

  if (!selected && isPresent) {
    return null;
  }

  const Component = asChild ? Slot : c.div;
  return (
    <Component
      id={`tabpanel-${id}`}
      role="tabpanel"
      ariaHidden={!selected}
      ariaLabelledBy={id}
      {...props}
    >
      {children}
    </Component>
  );
}

export function useContext(): [Identifier, (value: Identifier) => void] {
  const store = _useContext(TabsContext);
  if (!store) {
    throw new Error("Tabs.useContext() should be used within Tabs.Root.");
  }

  const { value, onValueChange } = store;
  return [value, onValueChange];
}
