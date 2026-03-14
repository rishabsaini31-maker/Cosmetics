import { ReactNode } from "react";

export default function Button({
  children,
  ...props
}: { children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-zinc-800 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
