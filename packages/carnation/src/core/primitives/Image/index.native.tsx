import { forwardRef } from "react";
import { Image as RNImage } from "react-native";
import { ImageProps } from "./types";
import { useAriaProps } from "../../hooks/useAriaProps.native";

export const Image = forwardRef<RNImage, ImageProps & { style?: any }>(
  function Image({ alt, fill, src, style, ...props }, ref) {
    const ariaProps = useAriaProps({
      ...props,
      ariaLabel: props.ariaLabel ?? alt,
    });

    return (
      <RNImage
        ref={ref}
        style={[
          style,
          fill && {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        ]}
        source={{ uri: src }}
        {...ariaProps}
        accessibilityIgnoresInvertColors
      />
    );
  }
);
