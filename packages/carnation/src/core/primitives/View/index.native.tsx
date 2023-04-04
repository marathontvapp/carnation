import { View } from "./View";
import { TaggedViewProps } from "./types";
import { forwardRef } from "react";
import type { View as RNView, ScrollView as RNScrollView } from "react-native";

export const div = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function div(props, ref) {
    return <View ref={ref} tag="div" {...props} />;
  }
);

export const main = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function main(props, ref) {
    return <View ref={ref} tag="main" {...props} />;
  }
);

export const section = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function section(props, ref) {
    return <View ref={ref} tag="section" {...props} />;
  }
);

export const header = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function header(props, ref) {
    return <View ref={ref} tag="header" {...props} />;
  }
);

export const nav = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function nav(props, ref) {
    return <View ref={ref} tag="nav" {...props} />;
  }
);

export const footer = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function footer(props, ref) {
    return <View ref={ref} tag="footer" {...props} />;
  }
);

export const aside = forwardRef<RNView, TaggedViewProps>(function aside(
  props,
  ref
) {
  return <View ref={ref} tag="aside" {...props} />;
});

export const ul = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function ul(props, ref) {
    return <View ref={ref} tag="ul" {...props} />;
  }
);

export const ol = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function ol(props, ref) {
    return <View ref={ref} tag="ol" {...props} />;
  }
);

export const li = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function li(props, ref) {
    return <View ref={ref} tag="li" {...props} />;
  }
);

export const dl = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function dl(props, ref) {
    return <View ref={ref} tag="dl" {...props} />;
  }
);

export const dt = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function dt(props, ref) {
    return <View ref={ref} tag="dt" {...props} />;
  }
);

export const dd = forwardRef<RNView | RNScrollView, TaggedViewProps>(
  function dd(props, ref) {
    return <View ref={ref} tag="dd" {...props} />;
  }
);
