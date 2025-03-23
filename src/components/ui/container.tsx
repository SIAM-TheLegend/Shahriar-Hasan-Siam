import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Container size variant
   * - default: Standard container with max-w-7xl (1280px)
   * - sm: Small container with max-w-5xl (1024px)
   * - lg: Large container with max-w-[90rem] (1440px)
   * - full: Full width container with no max-width
   */
  size?: "default" | "sm" | "lg" | "full";

  /**
   * Container padding variant
   * - default: Standard padding (px-4 sm:px-6 lg:px-8)
   * - none: No padding
   * - sm: Small padding (px-2 sm:px-4)
   * - lg: Large padding (px-6 sm:px-8 lg:px-12)
   */
  padding?: "default" | "none" | "sm" | "lg";

  /**
   * Whether the container should center its contents
   */
  centered?: boolean;
}

/**
 * Container component for consistent section widths
 *
 * Provides consistent max-width, padding, and centering across all sections
 * with customizable size and padding variants.
 */
export function Container({ children, className, size = "default", padding = "default", centered = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        // Base container styles
        "mx-auto w-full",

        // Size variants
        {
          "max-w-7xl": size === "default",
          "max-w-5xl": size === "sm",
          "max-w-[90rem]": size === "lg",
          "max-w-none": size === "full",
        },

        // Padding variants
        {
          "px-4 sm:px-6 lg:px-8": padding === "default",
          "px-0": padding === "none",
          "px-2 sm:px-4": padding === "sm",
          "px-6 sm:px-8 lg:px-12": padding === "lg",
        },

        // Centering option
        {
          "flex flex-col items-center": centered,
        },

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
