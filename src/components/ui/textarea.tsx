"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

// Extend the TextareaHTMLAttributes with motion properties
type TextareaMotionProps = HTMLMotionProps<"textarea">;

// Create a Motion Textarea component
const MotionTextarea = motion.textarea;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaMotionProps>(({ className, ...props }, ref) => {
  return <MotionTextarea className={cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)} ref={ref} whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} {...props} />;
});
Textarea.displayName = "Textarea";

export { Textarea };
