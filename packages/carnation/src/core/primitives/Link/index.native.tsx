import React, { forwardRef, useContext } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { LinkProps } from "./types";
import { styled } from "../../styled.native";
import { TextContext } from "../Text/context";
import { useAriaProps } from "../../hooks/useAriaProps.native";
import { useConfig } from "../../context";

export const Link = styled(
  forwardRef<View, LinkProps & { style?: any }>(function Link(
    { children, href, id, style, ...props },
    ref
  ) {
    const config = useConfig();

    const ariaProps = useAriaProps(props);

    const textCtx = useContext(TextContext);

    const hasExternalLink = href.startsWith("http");
    async function onPress() {
      if (hasExternalLink) {
        if (await Linking.canOpenURL(href)) {
          Linking.openURL(href);
        }
      } else {
        config.link?.navigate?.(href);
      }
    }

    if (textCtx) {
      return (
        <Text
          ref={ref}
          nativeID={id}
          style={style}
          onPress={onPress}
          {...ariaProps}
          accessibilityRole={hasExternalLink ? "link" : "button"}
        >
          {typeof children === "function"
            ? children({ pressed: false })
            : children}
        </Text>
      );
    }

    return (
      <Pressable
        ref={ref}
        nativeID={id}
        style={style}
        onPress={onPress}
        {...ariaProps}
        accessibilityRole={hasExternalLink ? "link" : "button"}
      >
        {children}
      </Pressable>
    );
  })
);
