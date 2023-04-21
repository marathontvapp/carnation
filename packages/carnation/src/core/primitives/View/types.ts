import type { KeyboardEvent, PropsWithChildren } from "react";
import type { ElementProps } from "../types";

export interface ViewProps extends PropsWithChildren, ElementProps {
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

  scroll?: "horizontal" | "vertical";

  onKeyDownCapture?(evt: KeyboardEvent): void;
}

export type TaggedViewProps = Omit<ViewProps, "tag">;
