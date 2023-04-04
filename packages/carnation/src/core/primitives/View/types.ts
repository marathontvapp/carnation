import type { PropsWithChildren } from "react";
import type { ElementProps } from "../types";

export interface ViewProps extends PropsWithChildren, ElementProps {
  scroll?: "horizontal" | "vertical";
  tag:
    | "span"
    | "div"
    | "main"
    | "section"
    | "header"
    | "nav"
    | "footer"
    | "aside"
    | "ul"
    | "ol"
    | "li"
    | "dl"
    | "dt"
    | "dd";
}

export type TaggedViewProps = Omit<ViewProps, "tag">;
