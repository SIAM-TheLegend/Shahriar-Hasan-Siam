"use client";

import { HTMLMotionProps, motion, useReducedMotion } from "framer-motion";
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
 * Respects user's motion preferences for accessibility
 */
export function StaggerItem({ children, variant = "list", index, ...props }: StaggerItemProps) {
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Choose animation variant based on variant prop
  const animationVariant = variant === "list" ? listItemVariants : fadeUpVariants;

  // If reduced motion is preferred, use simplified animation
  const accessibleVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : animationVariant;

  // If custom index is provided, add it as custom prop for sequencing
  const customProps = index !== undefined ? { custom: index } : {};

  return (
    <motion.div variants={accessibleVariants} {...customProps} {...props}>
      {children}
    </motion.div>
  );
}
