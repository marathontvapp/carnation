import { View } from "./View";
import { TaggedViewProps } from "./types";
import React, { forwardRef } from "react";

export const div = forwardRef<HTMLDivElement, TaggedViewProps>(function div(
  props,
  ref
) {
  return <View ref={ref} tag="div" {...props} />;
});

export const main = forwardRef<HTMLDivElement, TaggedViewProps>(function main(
  props,
  ref
) {
  return <View ref={ref} tag="main" {...props} />;
});

export const section = forwardRef<HTMLDivElement, TaggedViewProps>(
  function section(props, ref) {
    return <View ref={ref} tag="section" {...props} />;
  }
);

export const header = forwardRef<HTMLDivElement, TaggedViewProps>(
  function header(props, ref) {
    return <View ref={ref} tag="header" {...props} />;
  }
);

export const nav = forwardRef<HTMLDivElement, TaggedViewProps>(function nav(
  props,
  ref
) {
  return <View ref={ref} tag="nav" {...props} />;
});

export const footer = forwardRef<HTMLDivElement, TaggedViewProps>(
  function footer(props, ref) {
    return <View ref={ref} tag="footer" {...props} />;
  }
);

export const aside = forwardRef<HTMLDivElement, TaggedViewProps>(function aside(
  props,
  ref
) {
  return <View ref={ref} tag="aside" {...props} />;
});

export const ul = forwardRef<HTMLUListElement, TaggedViewProps>(function ul(
  props,
  ref
) {
  return <View ref={ref} tag="ul" {...props} />;
});

export const ol = forwardRef<HTMLOListElement, TaggedViewProps>(function ol(
  props,
  ref
) {
  return <View ref={ref} tag="ol" {...props} />;
});

export const li = forwardRef<HTMLLIElement, TaggedViewProps>(function li(
  props,
  ref
) {
  return <View ref={ref} tag="li" {...props} />;
});

export const dl = forwardRef<HTMLDListElement, TaggedViewProps>(function dl(
  props,
  ref
) {
  return <View ref={ref} tag="dl" {...props} />;
});

export const dt = forwardRef<HTMLDivElement, TaggedViewProps>(function dt(
  props,
  ref
) {
  return <View ref={ref} tag="dt" {...props} />;
});

export const dd = forwardRef<HTMLDivElement, TaggedViewProps>(function dd(
  props,
  ref
) {
  return <View ref={ref} tag="dd" {...props} />;
});
