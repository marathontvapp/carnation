import { ComponentType, PropsWithChildren } from "react";

export interface Config {
  link?: {
    component?: ComponentType<{ href: any }>;
    navigate?(href: string): void;
  };
}

export interface ConfigProviderProps extends PropsWithChildren {
  config: Config;
}
