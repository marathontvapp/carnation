import React, {
  PropsWithChildren,
  createContext,
  useContext as _useContext,
  useEffect,
  useState,
  isValidElement,
  Children,
  useCallback,
  KeyboardEvent,
  forwardRef,
  useMemo,
} from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { c } from "../core";
import { slugify } from "../utils/slugify";
import { LayoutElementProps, ButtonElementProps } from "../core";
import { Slot } from "./Slot";

type Identifier = string | number;

interface TabsState {
  value: Identifier;
  onValueChange(value: Identifier): void;
}

type TabsContextValue = StoreApi<TabsState>;

const TabsContext = createContext<TabsContextValue | null>(null);

// Root

export interface RootProps<T extends Identifier> extends PropsWithChildren<{}> {
  onValueChange?(value: T): void;
  value: T;
}

export function Root<T extends Identifier>({
  children,
  onValueChange,
  value,
}: RootProps<T>) {
  const [store] = useState(() =>
    createStore(
      subscribeWithSelector<TabsState>((set, get) => ({
        onValueChange(value) {
          set({ value });
        },
        value,
      }))
    )
  );

  useEffect(() => {
    store.setState({ value });
  }, [store, value]);

  useEffect(() => {
    if (onValueChange) {
      store.subscribe((state) => state.value as any, onValueChange);
    }
  }, [store, onValueChange]);

  return <TabsContext.Provider value={store}>{children}</TabsContext.Provider>;
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

      const state = store.getState();
      const selectedIndex = focusableValues.findIndex(
        (value) => value === state.value
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
        state.onValueChange(nextValue);
        // Focus the trigger
        const id = slugify(nextValue.toString());
        const trigger = document.getElementById(id);
        trigger?.focus();
      }
    },
    [asChild, children, store]
  );

  return (
    <Slot<LayoutElementProps>
      role="tablist"
      onKeyDownCapture={onKeyDownCapture}
      {...props}
    >
      {asChild ? children : <c.div>{children}</c.div>}
    </Slot>
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

  const state = useStore(store);

  const id = slugify(value.toString());
  const selected = value === state.value;

  return (
    <Slot<ButtonElementProps>
      ref={ref}
      id={id}
      onPress={() => {
        state.onValueChange(value);
      }}
      role="tab"
      tabIndex={selected ? 0 : -1}
      ariaControls={`tabpanel-${id}`}
      ariaSelected={selected}
      {...props}
    >
      {asChild ? children : <c.button>{children}</c.button>}
    </Slot>
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

  const selected = useStore(store, (state) => state.value === value);

  const id = slugify(value.toString());

  if (!selected) {
    return null;
  }

  return (
    <Slot<LayoutElementProps>
      id={`tabpanel-${id}`}
      role="tabpanel"
      ariaHidden={!selected}
      ariaLabelledBy={id}
      {...props}
    >
      {asChild ? children : <c.div>{children}</c.div>}
    </Slot>
  );
}

export function useContext(): [Identifier, (value: Identifier) => void] {
  const store = _useContext(TabsContext);
  if (!store) {
    throw new Error("Tabs.useContext() should be used within Tabs.Root.");
  }

  const [value, onValueChange] = useStore(store, (state) => [
    state.value,
    state.onValueChange,
  ]);
  return [value, onValueChange];
}
