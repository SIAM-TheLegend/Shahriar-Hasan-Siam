"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

// Extend the InputHTMLAttributes with motion properties
type InputMotionProps = HTMLMotionProps<"input">;

// Create a Motion Input component
const MotionInput = motion.input;

const Input = React.forwardRef<HTMLInputElement, InputMotionProps>(({ className, type, ...props }, ref) => {
  return <MotionInput type={type} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)} ref={ref} whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} {...props} />;
});
Input.displayName = "Input";

export { Input };
