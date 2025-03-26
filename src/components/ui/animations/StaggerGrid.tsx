"use client";

import { HTMLMotionProps, motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { staggerGridVariants } from "./variants";

interface StaggerGridProps extends HTMLMotionProps<"div">, Omit<ScrollAnimationOptions, "animateOnMount"> {
  /**
   * Custom delay for the animation in seconds
   */
  delay?: number;

  /**
   * Number of columns in the grid - used to optimize staggering patterns
   */
  columns?: number;

  /**
   * Animation pattern: 'sequence' (L->R, top->bottom) or 'rows' (row by row) or 'columns' (column by column)
   */
  pattern?: "sequence" | "rows" | "columns";

  /**
   * Whether to animate on mount instead of scroll
   */
  animateOnMount?: boolean;

  /**
   * Children nodes to render
   */
  children: ReactNode;

  /**
   * Gap between grid items
   */
  gap?: number;
}

/**
 * A specialized component for staggered animations of grid layouts
 * Enhances visual appeal of lists and grids with coordinated animations
 * Respects reduced motion preferences for accessibility
 */
export function StaggerGrid({ children, threshold, rootMargin, once = true, amount, delay, columns = 3, pattern = "sequence", animateOnMount = false, gap = 6, ...props }: StaggerGridProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    rootMargin,
    once,
    amount,
    animateOnMount,
  });

  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Customize stagger variants based on columns and pattern
  const variants = staggerGridVariants(columns, pattern);

  // If reduced motion is preferred, use simple fade animation
  const accessibleVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.3,
            staggerChildren: 0.05,
            when: "beforeChildren",
          },
        },
      }
    : variants;

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={accessibleVariants} transition={delay ? { delay } : undefined} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-${gap}`} {...props}>
      {children}
    </motion.div>
  );
}

/**
 * Grid item to be used as a child of StaggerGrid
 * Implements proper animation variants for grid layouts
 */
export function StaggerGridItem({ children, ...props }: HTMLMotionProps<"div">) {
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={
        prefersReducedMotion
          ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.2 } },
            }
          : {
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
