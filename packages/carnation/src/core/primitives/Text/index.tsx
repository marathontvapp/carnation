import React, { forwardRef } from "react";
import { Text } from "./Text";
import { TaggedTextProps } from "./types";

export const small = forwardRef<HTMLParagraphElement, TaggedTextProps>(
  function small(props, ref) {
    return <Text ref={ref} tag="small" {...props} />;
  }
);

export const span = forwardRef<HTMLSpanElement, TaggedTextProps>(function span(
  props,
  ref
) {
  return <Text ref={ref} tag="span" {...props} />;
});

export const strong = forwardRef<HTMLSpanElement, TaggedTextProps>(
  function strong(props, ref) {
    return <Text ref={ref} tag="strong" {...props} />;
  }
);

export const em = forwardRef<HTMLSpanElement, TaggedTextProps>(function em(
  props,
  ref
) {
  return <Text ref={ref} tag="em" {...props} />;
});

export const p = forwardRef<HTMLParagraphElement, TaggedTextProps>(function p(
  props,
  ref
) {
  return <Text ref={ref} tag="p" {...props} />;
});

export const h1 = forwardRef<HTMLHeadingElement, TaggedTextProps>(function h1(
  props,
  ref
) {
  return <Text ref={ref} tag="h1" {...props} />;
});

export const h2 = forwardRef<HTMLHeadingElement, TaggedTextProps>(function h2(
  props,
  ref
) {
  return <Text ref={ref} tag="h2" {...props} />;
});

export const h3 = forwardRef<HTMLHeadingElement, TaggedTextProps>(function h1(
  props,
  ref
) {
  return <Text ref={ref} tag="h3" {...props} />;
});

export const h4 = forwardRef<HTMLHeadingElement, TaggedTextProps>(function h1(
  props,
  ref
) {
  return <Text ref={ref} tag="h4" {...props} />;
});

export const h5 = forwardRef<HTMLHeadingElement, TaggedTextProps>(function h1(
  props,
  ref
) {
  return <Text ref={ref} tag="h5" {...props} />;
});

export const h6 = forwardRef<HTMLHeadingElement, TaggedTextProps>(function h1(
  props,
  ref
) {
  return <Text ref={ref} tag="h6" {...props} />;
});
