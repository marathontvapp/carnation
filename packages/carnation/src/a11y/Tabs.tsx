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

export interface RootProps extends PropsWithChildren<{}> {
  onValueChange?(value: Identifier): void;
  value: Identifier;
}

export function Root({ children, onValueChange, value }: RootProps) {
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
      store.subscribe((state) => state.value, onValueChange);
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
      const childElements = isValidElement(children)
        ? children.props.children
        : children;
      const triggers = Children.toArray(childElements).filter(isValidElement);
      const tabValues = triggers.flatMap((child) => {
        if (
          child.props &&
          typeof child.props === "object" &&
          "value" in child.props
        ) {
          return child.props.value;
        } else {
          return [];
        }
      });

      const state = store.getState();
      let nextValue: unknown;
      if (evt.key === "Home") {
        nextValue = tabValues.at(0);
      } else if (evt.key === "End") {
        nextValue = tabValues.at(-1);
      } else if (evt.key === "ArrowRight") {
        const selectedIndex = tabValues.findIndex((tab) => tab === state.value);
        if (selectedIndex >= 0) {
          nextValue = tabValues.at((selectedIndex + 1) % tabValues.length);
        }
      } else if (evt.key === "ArrowLeft") {
        const selectedIndex = tabValues.findIndex((tab) => tab === state.value);
        if (selectedIndex >= 0) {
          nextValue = tabValues.at(
            (tabValues.length + selectedIndex - 1) % tabValues.length
          );
        }
      }

      if (typeof nextValue === "string" || typeof nextValue === "number") {
        state.onValueChange(nextValue);
        // TODO: focus the new tab element
      }
    },
    [children, store]
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

export function Trigger({ asChild, children, value, ...props }: TriggerProps) {
  const store = _useContext(TabsContext);
  if (!store) {
    throw new Error("Tabs.Trigger should be used within Tabs.Root.");
  }

  const state = useStore(store);

  const id = slugify(value.toString());
  const selected = value === state.value;

  return (
    <Slot<ButtonElementProps>
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
}

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
