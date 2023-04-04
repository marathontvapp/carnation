import { PropsWithChildren } from "react";
import { ElementProps } from "../types";

export interface TextProps extends PropsWithChildren, ElementProps {
  tag:
    | "small"
    | "span"
    | "strong"
    | "em"
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
}

export type TaggedTextProps = Omit<TextProps, "tag">;
