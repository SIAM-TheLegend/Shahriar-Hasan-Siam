"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { listItemVariants, fadeUpVariants } from "./variants";

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  /**
   * Animation variant to use - 'list' for list items, 'fadeUp' for general content
   */
  variant?: "list" | "fadeUp";

  /**
   * Custom index for controlling staggered animations in sequence
   */
  index?: number;
}

/**
 * A component to be used as a child of Stagger component
 * Implements consistent animation timing for staggered items
 */
export function StaggerItem({ children, variant = "list", index, ...props }: StaggerItemProps) {
  // Choose animation variant based on variant prop
  const animationVariant = variant === "list" ? listItemVariants : fadeUpVariants;

  // If custom index is provided, add it as custom prop for sequencing
  const customProps = index !== undefined ? { custom: index } : {};

  return (
    <motion.div variants={animationVariant} {...customProps} {...props}>
      {children}
    </motion.div>
  );
}
