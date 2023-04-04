import React, { forwardRef } from "react";
import { LinkProps } from "./types";
import { usePress } from "react-aria";
import NextLink from "next/link";
import { useAriaProps } from "../../hooks";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, className, href, id, target, rel, ...props },
  ref
) {
  const ariaProps = useAriaProps(props);
  const { pressProps, isPressed } = usePress({});

  return (
    <NextLink
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
    </NextLink>
  );
});
