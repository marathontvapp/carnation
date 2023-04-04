import NextImage from "next/image";
import { forwardRef } from "react";
import { useAriaProps } from "../../hooks";
import { ImageProps } from "./types";

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { alt, className, fill, id, src, ...props },
  ref
) {
  const ariaProps = useAriaProps(props);
  return (
    <NextImage
      ref={ref}
      id={id}
      className={className}
      src={src}
      alt={alt}
      fill={fill}
      unoptimized
      {...ariaProps}
    />
  );
});
