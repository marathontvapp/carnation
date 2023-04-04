import { forwardRef } from "react";
import { ViewProps } from "./types";
import { useAriaProps } from "../../hooks";
import clsx from "clsx";

export const View = forwardRef<HTMLElement, ViewProps>(function View(
  { children, className, id, scroll, tag: Component, ...props },
  ref
) {
  const ariaProps = useAriaProps(props);
  const classes = clsx(
    scroll === "horizontal" && "overflow-x-auto",
    scroll === "vertical" && "overflow-y-auto",
    className
  );
  return (
    <Component ref={ref as any} id={id} className={classes} {...ariaProps}>
      {children}
    </Component>
  );
});
