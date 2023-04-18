import { AnimatePresence, c, m, Tabs } from "carnation-ds";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState("hello");

  return (
    <c.div className="flex flex-col gap-10 min-h-screen items-center justify-center">
      <c.p>Hello world</c.p>

      <m.p
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
        I'm spinning!
      </m.p>

      <c.div className="relative w-28 h-28">
        <c.img src="/vercel.svg" alt="Vercel" />
      </c.div>

      <c.a href="/page2">
        <c.span>Go to page 2</c.span>
      </c.a>

      <Tabs.Root<string> value={state} onValueChange={setState}>
        <Tabs.List>
          <Tabs.Trigger
            className="group aria-selected:bg-red-400"
            value="hello"
          >
            <c.span className="group-aria-selected:text-white">Hello</c.span>
          </Tabs.Trigger>
          <Tabs.Trigger
            className="group aria-selected:bg-red-400"
            value="world"
          >
            <c.span className="group-aria-selected:text-white">World</c.span>
          </Tabs.Trigger>
        </Tabs.List>

        <AnimatePresence mode="wait">
          <Tabs.Content key="hello" asChild value="hello">
            <m.div
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 30 }}
            >
              <c.span>Hello!!!!!!</c.span>
            </m.div>
          </Tabs.Content>
          <Tabs.Content key="world" asChild value="world">
            <m.div
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 30 }}
            >
              <c.span>World!!!!!!</c.span>
            </m.div>
          </Tabs.Content>
        </AnimatePresence>
      </Tabs.Root>
    </c.div>
  );
}
