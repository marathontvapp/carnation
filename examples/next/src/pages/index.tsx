import { c } from "carnation-ds";
import { m } from "carnation-ds/motion";
import { Tabs } from "carnation-ds/a11y";
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
          <Tabs.Trigger value="hello">
            <c.span>Hello</c.span>
          </Tabs.Trigger>
          <Tabs.Trigger value="world">
            <c.span>World</c.span>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="hello">Hello!!!!!!</Tabs.Content>
        <Tabs.Content value="world">World!!!!!!</Tabs.Content>
      </Tabs.Root>
    </c.div>
  );
}
