import { ComponentType, PropsWithChildren } from "react";

export interface Config {
  link?: {
    component?: ComponentType<{ href: any }>;
    navigate?(href: string): void;
  };
  image?: {
    component?: ComponentType<{ src: any; alt: any }>;
  };
}

export interface ConfigProviderProps extends PropsWithChildren {
  config: Config;
}
