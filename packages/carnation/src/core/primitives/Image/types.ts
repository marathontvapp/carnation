import { ElementProps } from "../types";

export interface ImageProps extends ElementProps {
  src: string;
  alt: string;
  fill?: boolean;
}
