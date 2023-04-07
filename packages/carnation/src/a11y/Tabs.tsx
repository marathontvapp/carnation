import React, {
  PropsWithChildren,
  createContext,
  useContext as _useContext,
  useEffect,
  useState,
} from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { c } from "../core";
import { slugify } from "../utils/slugify";
import { TaggedViewProps } from "../core/primitives/View/types";
import { Slot } from "./Slot";
import { ButtonProps } from "../core/primitives/Button/types";

type Identifier = string;

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

export interface ListProps extends Omit<TaggedViewProps, "role"> {
  asChild?: boolean;
}

export function List({ asChild, children, ...props }: ListProps) {
  return (
    <Slot<TaggedViewProps> role="tablist" {...props}>
      {asChild ? children : <c.div>{children}</c.div>}
    </Slot>
  );
}

// Trigger

export interface TriggerProps
  extends PropsWithChildren<
    Omit<
      ButtonProps,
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

  const id = slugify(value);
  const selected = value === state.value;

  return (
    <Slot<ButtonProps>
      id={id}
      onPress={() => {
        state.onValueChange(value);
      }}
      role="tab"
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
    TaggedViewProps,
    "id" | "role" | "ariaHidden" | "ariaLabelledBy"
  > {
  asChild?: boolean;
  value: Identifier;
}

export function Content({ asChild, children, value }: ContentProps) {
  const store = _useContext(TabsContext);
  if (!store) {
    throw new Error("Tabs.Content should be used within Tabs.Root.");
  }

  const selected = useStore(store, (state) => state.value === value);

  const id = slugify(value);

  return (
    <Slot<TaggedViewProps>
      id={`tabpanel-${id}`}
      // className={clsx(
      //   !selected && "web:hidden native:absolute native:left-[-200vw]"
      // )}
      role="tabpanel"
      ariaHidden={!selected}
      ariaLabelledBy={id}
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
