import React, { PropsWithChildren } from "react";

export interface TagProps {}

export function Tag({ children }: PropsWithChildren<TagProps>) {
  return (
    <p className="py-0.5 px-1.5 text-sm rounded-md text-yellow-800 dark:text-yellow-600 bg-yellow-400/10 border border-yellow-400/10">
      {children}
    </p>
  );
}
