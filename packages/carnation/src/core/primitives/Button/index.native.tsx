import React, { forwardRef } from "react";
import { Pressable, View } from "react-native";
import { styled } from "../../styled.native";
import { useAriaProps } from "../../hooks/useAriaProps.native";
import type { ButtonProps } from "./types";

export const Button = styled(
  forwardRef<View, ButtonProps & { style?: any }>(function Button(
    { children, disabled, onPress, style, ...props },
    ref
  ) {
    const ariaProps = useAriaProps({
      ...props,
      ariaDisabled: props.ariaDisabled ?? disabled,
    });

    return (
      <Pressable
        ref={ref}
        style={style}
        disabled={disabled}
        onPress={onPress}
        accessibilityRole="button"
        {...ariaProps}
      >
        {children}
      </Pressable>
    );
  })
);
