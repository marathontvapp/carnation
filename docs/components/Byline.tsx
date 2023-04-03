import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Byline() {
  return (
    <p className="text-sm inline-flex items-center gap-2 mt-2">
      <span className="opacity-60">by</span>
      <Link
        className="inline-flex items-center gap-1.5 font-semibold"
        href="https://joshpensky.com"
        target="_blank"
      >
        <span className="w-5 h-5 relative overflow-hidden rounded-full">
          <Image src="/josh.png" alt="" fill sizes="20px" />
        </span>
        Josh Pensky
      </Link>
    </p>
  );
}
