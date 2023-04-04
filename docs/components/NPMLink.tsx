import Link from "next/link";

export interface NPMLinkProps {
  v: string;
}

export function NPMLink({ v }: NPMLinkProps) {
  return (
    <Link
      className="inline-flex items-center gap-1.5 text-sm opacity-60 hover:opacity-100 focus:opacity-100"
      href={`https://www.npmjs.com/package/carnation-ds/v/${v}`}
      target="_blank"
    >
      NPM
      <svg
        className="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </Link>
  );
}
