import React, { forwardRef } from "react";
import { Text as RNText } from "react-native";
import { View } from "../View/View.native";
import { Text } from "./Text.native";
import { TaggedTextProps } from "./types";

export const small = forwardRef<RNText, TaggedTextProps>(function small(
  props,
  ref
) {
  return <Text ref={ref} tag="small" {...props} />;
});

export const span = forwardRef<RNText, TaggedTextProps>(function span(
  props,
  ref
) {
  if (
    !props.children ||
    typeof props.children === "string" ||
    typeof props.children === "number"
  ) {
    return <Text ref={ref} tag="span" {...props} />;
  } else {
    return <View ref={ref} tag="span" {...props} />;
  }
});

export const strong = forwardRef<RNText, TaggedTextProps>(function strong(
  props,
  ref
) {
  return <Text ref={ref} tag="strong" {...props} />;
});

export const em = forwardRef<RNText, TaggedTextProps>(function em(props, ref) {
  return <Text ref={ref} tag="em" {...props} />;
});

export const p = forwardRef<RNText, TaggedTextProps>(function p(props, ref) {
  return <Text ref={ref} tag="p" {...props} />;
});

export const h1 = forwardRef<RNText, TaggedTextProps>(function h1(props, ref) {
  return <Text ref={ref} tag="h1" {...props} />;
});

export const h2 = forwardRef<RNText, TaggedTextProps>(function h2(props, ref) {
  return <Text ref={ref} tag="h2" {...props} />;
});

export const h3 = forwardRef<RNText, TaggedTextProps>(function h1(props, ref) {
  return <Text ref={ref} tag="h3" {...props} />;
});

export const h4 = forwardRef<RNText, TaggedTextProps>(function h1(props, ref) {
  return <Text ref={ref} tag="h4" {...props} />;
});

export const h5 = forwardRef<RNText, TaggedTextProps>(function h1(props, ref) {
  return <Text ref={ref} tag="h5" {...props} />;
});

export const h6 = forwardRef<RNText, TaggedTextProps>(function h1(props, ref) {
  return <Text ref={ref} tag="h6" {...props} />;
});
