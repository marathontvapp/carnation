import React, { PropsWithChildren } from "react";

export function Prop({ children }: PropsWithChildren<{}>) {
  return (
    <code className="py-0.5 px-[.25em] text-[.9em] rounded-md text-red-800 dark:text-red-600 bg-red-400/10 border border-red-400/10">
      {children}
    </code>
  );
}
