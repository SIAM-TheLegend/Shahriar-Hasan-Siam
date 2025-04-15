import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Input animation variants
const inputAnimationVariants = {
  focus: {
    scale: 1.01,
    boxShadow: "0 0 0 3px rgba(var(--color-primary), 0.1)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  blur: {
    scale: 1,
    boxShadow: "none",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  withAnimation?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, withAnimation = false, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  // Base input element
  const inputElement = <input type={type} className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background", "file:border-0 file:bg-transparent file:text-sm file:font-medium", "placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} {...props} />;

  // Return animated input if animation is enabled
  if (withAnimation) {
    return (
      <motion.div animate={isFocused ? "focus" : "blur"} variants={inputAnimationVariants} initial="blur">
        {inputElement}
      </motion.div>
    );
  }

  // Otherwise return the standard input
  return inputElement;
});

Input.displayName = "Input";

// Create a labeled input component
export interface InputLabeledProps extends InputProps {
  label: string;
  helper?: string;
}

export const InputLabeled = React.forwardRef<HTMLInputElement, InputLabeledProps>(({ className, label, helper, ...props }, ref) => {
  const id = React.useId();

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <Input id={id} className={className} ref={ref} {...props} />
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </div>
  );
});

InputLabeled.displayName = "InputLabeled";
