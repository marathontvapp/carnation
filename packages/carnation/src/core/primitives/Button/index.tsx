import React, { forwardRef } from "react";
import { ButtonProps } from "./types";
import { usePress } from "react-aria";
import { useAriaProps } from "../../hooks";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { children, className, disabled, id, onPress, ...props },
    ref
  ) {
    const ariaProps = useAriaProps(props);

    const { pressProps, isPressed } = usePress({
      isDisabled: disabled,
      onPress,
    });

    return (
      <button
        {...pressProps}
        ref={ref}
        id={id}
        className={className}
        disabled={disabled}
        {...ariaProps}
      >
        {typeof children === "function"
          ? children({ pressed: isPressed })
          : children}
      </button>
    );
  }
);
