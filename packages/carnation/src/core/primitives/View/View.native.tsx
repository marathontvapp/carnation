import { ViewProps } from "./types";
import { View as RNView, ScrollView as RNScrollView } from "react-native";
import { ForwardedRef, forwardRef } from "react";
import { styled } from "nativewind";
import { useAriaProps } from "../../hooks/useAriaProps.native";

export const View = styled(
  forwardRef<RNView | RNScrollView, ViewProps & { style?: any }>(function View(
    { children, id, scroll, style, ...props },
    ref
  ) {
    const ariaProps = useAriaProps(props);
    if (scroll) {
      return (
        <RNScrollView
          ref={ref as ForwardedRef<RNScrollView>}
          nativeID={id}
          style={style}
          scrollEnabled
          horizontal={scroll === "horizontal"}
          {...ariaProps}
        >
          {children}
        </RNScrollView>
      );
    } else {
      return (
        <RNView
          ref={ref as ForwardedRef<RNView>}
          nativeID={id}
          style={style}
          {...ariaProps}
        >
          {children}
        </RNView>
      );
    }
  })
);
