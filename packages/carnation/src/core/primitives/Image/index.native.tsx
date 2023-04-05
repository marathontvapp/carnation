import React, { forwardRef } from "react";
import { Image as RNImage } from "react-native";
import { ImageProps } from "./types";
import { useAriaProps } from "../../hooks/useAriaProps.native";
import { useConfig } from "../../context";

export const Image = forwardRef<RNImage, ImageProps & { style?: any }>(
  function Image({ alt, src, style, ...props }, ref) {
    const config = useConfig();

    const ariaProps = useAriaProps(props);

    const Component =
      config.image?.component ??
      (({ src, ...props }) => (
        <RNImage
          source={{ uri: src }}
          accessibilityIgnoresInvertColors
          accessibilityLabel={ariaProps.accessibilityLabel ?? alt}
          {...props}
        />
      ));

    return (
      <Component
        {...{ ref, style: [style] }}
        src={src}
        alt={alt}
        {...ariaProps}
      />
    );
  }
);
