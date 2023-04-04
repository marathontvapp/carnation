import { StatusBar } from "expo-status-bar";
import { c } from "@marathontvapp/carnation";
import { m } from "@marathontvapp/carnation/motion";
import { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
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
    </c.div>
  );
}
