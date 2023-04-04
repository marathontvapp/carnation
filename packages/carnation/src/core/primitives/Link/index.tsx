import React, { forwardRef } from "react";
import { LinkProps } from "./types";
import { usePress } from "react-aria";
import { useAriaProps } from "../../hooks";
import { useConfig } from "../../context";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, className, href, id, target, rel, ...props },
  ref
) {
  const config = useConfig();

  const ariaProps = useAriaProps(props);

  const { pressProps, isPressed } = usePress({});

  const Component = config.link?.component ?? "a";

  return (
    <Component
      {...pressProps}
      ref={ref}
      id={id}
      className={className}
      href={href}
      target={target}
      rel={rel}
      {...ariaProps}
    >
      {typeof children === "function"
        ? children({ pressed: isPressed })
        : children}
    </Component>
  );
});
