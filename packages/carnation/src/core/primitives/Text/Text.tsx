import { forwardRef } from "react";
import { TextProps } from "./types";
import { useAriaProps } from "../../hooks";

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { children, className, id, tag: Component, ...props },
  ref
) {
  const ariaProps = useAriaProps(props);
  return (
    <Component ref={ref as any} id={id} className={className} {...ariaProps}>
      {children}
    </Component>
  );
});
