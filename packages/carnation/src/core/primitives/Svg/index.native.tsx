import {
  CircleProps,
  LineProps,
  PathProps,
  RectProps,
  SvgProps,
  SvgStyleProps,
} from "./types";
import {
  Svg as RNSvg,
  Path as RNPath,
  Circle as RNCircle,
  Rect as RNRect,
  Line as RNLine,
} from "react-native-svg";
import { styled } from "../../styled.native";
import React, { createContext, useContext } from "react";
import { useAriaProps } from "../../hooks/useAriaProps.native";

const SvgContext = createContext({ color: "" });

function useSvgStyle(props: SvgStyleProps): SvgStyleProps {
  const ctx = useContext(SvgContext);
  return {
    fill: props.fill === "currentColor" && ctx.color ? ctx.color : props.fill,
    stroke:
      props.stroke === "currentColor" && ctx.color ? ctx.color : props.stroke,
    strokeWidth: props.strokeWidth,
    opacity: props.opacity,
  };
}

export const svg = styled(function Svg({
  children,
  id,
  style = {},
  viewBox,
  ...props
}: SvgProps & { style?: any }) {
  const ariaProps = useAriaProps(props);
  return (
    <SvgContext.Provider value={style}>
      <RNSvg
        nativeID={id}
        style={style}
        viewBox={viewBox}
        fill="none"
        {...ariaProps}
      >
        {children}
      </RNSvg>
    </SvgContext.Provider>
  );
});

export function path(props: PathProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const style = useSvgStyle(props);
  return <RNPath {...props} {...style} />;
}

export function circle(props: CircleProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const style = useSvgStyle(props);
  return <RNCircle {...props} {...style} />;
}

export function rect(props: RectProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const style = useSvgStyle(props);
  return <RNRect {...props} {...style} />;
}

export function line(props: LineProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const style = useSvgStyle(props);
  return <RNLine {...props} {...style} />;
}
