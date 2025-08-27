import * as React from "react";

import { cn } from "@/lib/utils";

// NOTE:
// We default `suppressHydrationWarning` to true to avoid React hydration
// mismatches caused by browser extensions that mutate input elements before
// React hydrates (e.g., extensions that inject inline styles or data-attrs
// like `data-temp-mail-org`). These mutations are non-critical and safe to
// ignore during hydration. If a specific input needs stricter hydration,
// callers can override this by explicitly passing
// `suppressHydrationWarning={false}`.
function Input({ className, type, suppressHydrationWarning = true, ...props }: React.ComponentProps<"input">) {
  return <input type={type} suppressHydrationWarning={suppressHydrationWarning} data-slot="input" className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className)} {...props} />;
}

export { Input };
