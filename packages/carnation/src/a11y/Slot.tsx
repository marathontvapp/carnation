import React, {
  Children,
  Fragment,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  isValidElement,
} from "react";

export function Slot<P extends object>({
  children,
  ...props
}: PropsWithChildren<P>) {
  const child = Children.only(children);
  if (!child || !isValidElement(child)) {
    return null;
  }
  return <Fragment>{cloneElement(child, props)}</Fragment>;
}
