import React, { forwardRef } from "react";
import { useAriaProps } from "../../hooks";
import { ImageProps } from "./types";
import { useConfig } from "../../context";

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { alt, className, id, src, ...props },
  ref
) {
  const config = useConfig();

  const ariaProps = useAriaProps(props);

  const Component = config.image?.component ?? "img";

  return (
    <Component
      ref={ref}
      id={id}
      className={className}
      src={src}
      alt={alt}
      {...ariaProps}
    />
  );
});
