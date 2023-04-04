import { c } from "carnation";
import { m } from "carnation/motion";

export default function Home() {
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
    </c.div>
  );
}
