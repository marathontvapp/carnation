import { StatusBar } from "expo-status-bar";
import { c, m, Tabs } from "carnation-ds";
import { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);

  const [state, setState] = useState("hello");

  return (
    <c.div className="flex-1 bg-white items-center justify-center gap-10">
      <StatusBar style="auto" />
      <c.p className="text-lg">Hello world! {counter}</c.p>
      <m.p
        className="text-lg"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          type: "timing",
          ease: "linear",
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        I&apos;m spinning!
      </m.p>

      <c.button
        onPress={() => {
          setCounter(counter + 1);
        }}
      >
        {(state) => (
          <c.span className={`${state.pressed && "opacity-50"}`}>
            Press me
          </c.span>
        )}
      </c.button>

      <Tabs.Root value={state} onValueChange={setState}>
        <Tabs.List>
          <Tabs.Trigger
            className="group aria-selected:bg-red-400"
            value="hello"
          >
            <c.span className="group-aria-selected:text-white">Hello</c.span>
          </Tabs.Trigger>
          <Tabs.Trigger
            asChild
            className="group aria-selected:bg-red-400"
            value="world"
          >
            <c.button>
              <c.span className="group-aria-selected:text-white">World</c.span>
            </c.button>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="hello">
          <c.span>Hello!!!!!!</c.span>
        </Tabs.Content>
        <Tabs.Content value="world">
          <c.span>World!!!!!!</c.span>
        </Tabs.Content>
      </Tabs.Root>
    </c.div>
  );
}
