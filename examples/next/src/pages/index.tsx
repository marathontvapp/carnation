import { c } from "carnation-ds";
import { m } from "carnation-ds/motion";

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

      <c.div className="relative w-28 h-28">
        <c.img src="/vercel.svg" alt="Vercel" />
      </c.div>

      <c.a href="/page2">
        <c.span>Go to page 2</c.span>
      </c.a>
    </c.div>
  );
}
