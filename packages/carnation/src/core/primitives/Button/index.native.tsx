import { forwardRef } from "react";
import { ButtonProps } from "./types";
import { Pressable, View } from "react-native";
import { styled } from "nativewind";
import { useAriaProps } from "../../hooks/useAriaProps.native";

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
        {...ariaProps}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  })
);
