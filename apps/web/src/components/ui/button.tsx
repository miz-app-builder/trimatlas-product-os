import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils.js";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground hover:opacity-90 focus-visible:outline-primary",
        variant === "secondary" && "border border-border bg-white text-foreground hover:bg-slate-50",
        className
      )}
      {...props}
    />
  );
}
