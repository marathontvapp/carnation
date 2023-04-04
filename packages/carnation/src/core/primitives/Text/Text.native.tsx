import { TextProps } from "./types";
import React, { Text as RNText } from "react-native";
import { forwardRef } from "react";
import { styled } from "nativewind";
import { TextContext } from "./context";
import { useAriaProps } from "../../hooks/useAriaProps.native";

export const Text = styled(
  forwardRef<RNText, TextProps & { style?: any }>(function Text(
    { children, id, style, ...props },
    ref
  ) {
    const ariaProps = useAriaProps(props);
    return (
      <TextContext.Provider value={true}>
        <RNText ref={ref} nativeID={id} style={style} {...ariaProps}>
          {children}
        </RNText>
      </TextContext.Provider>
    );
  })
);
