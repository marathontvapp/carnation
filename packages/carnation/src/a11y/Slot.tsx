import React, {
  Children,
  ForwardedRef,
  Fragment,
  PropsWithChildren,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

function SlotInner<P, R>(
  { children, ...props }: PropsWithChildren<P>,
  ref: ForwardedRef<R>
) {
  const child = Children.only(children);
  if (!child || !isValidElement(child)) {
    return null;
  }
  return <Fragment>{cloneElement(child, { ...props, ref })}</Fragment>;
}

export const Slot = forwardRef(SlotInner) as <P, R = any>(
  props: PropsWithChildren<P> & { ref?: ForwardedRef<R> }
) => ReturnType<typeof SlotInner>;
