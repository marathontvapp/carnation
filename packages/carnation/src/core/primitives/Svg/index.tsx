import React from "react";
import { useAriaProps } from "../../hooks";
import {
  SvgProps,
  PathProps,
  CircleProps,
  RectProps,
  LineProps,
} from "./types";

export function svg({ children, className, id, viewBox, ...props }: SvgProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ariaProps = useAriaProps(props);
  return (
    <svg
      className={className}
      id={id}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...ariaProps}
    >
      {children}
    </svg>
  );
}

export function path(props: PathProps) {
  return <path {...props} />;
}

export function circle(props: CircleProps) {
  return <circle {...props} />;
}

export function rect(props: RectProps) {
  return <rect {...props} />;
}

export function line(props: LineProps) {
  return <line {...props} />;
}
