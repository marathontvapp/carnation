import { c } from "carnation-ds";

export default function Page2() {
  return (
    <c.div className="flex flex-col gap-10 min-h-screen items-center justify-center">
      <c.p>Page 2</c.p>

      <c.a href="/">
        <c.span>Go back</c.span>
      </c.a>
    </c.div>
  );
}
