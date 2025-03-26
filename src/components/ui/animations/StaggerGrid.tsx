"use client";

import { HTMLMotionProps, motion, useReducedMotion, Variant, Transition } from "framer-motion";
import { ReactNode } from "react";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { staggerGridVariants } from "./variants";
import { useDeviceOptimizedAnimations } from "@/hooks/useDeviceOptimizedAnimations";

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

// Helper type to safely extract transition properties
type TransitionWithStagger = Transition & {
  staggerChildren?: number;
  delayChildren?: number;
};

/**
 * A specialized component for staggered animations of grid layouts
 * Enhances visual appeal of lists and grids with coordinated animations
 * Respects reduced motion preferences for accessibility
 * Automatically optimizes for different device sizes
 */
export function StaggerGrid({ children, threshold, rootMargin, once = true, amount, delay, columns = 3, pattern = "sequence", animateOnMount = false, gap = 6, ...props }: StaggerGridProps) {
  // Get device-optimized animation settings
  const { deviceType, threshold: optimizedThreshold, timings: optimizedTimings, getOptimizedCount } = useDeviceOptimizedAnimations();

  // Use optimized threshold if none provided
  const effectiveThreshold = threshold ?? optimizedThreshold;

  // Adjust rootMargin based on device type for better entry timing
  const effectiveRootMargin = rootMargin ?? (deviceType === "mobile" ? "50px" : deviceType === "tablet" ? "30px" : "0px");

  // Optimize columns for mobile devices
  const effectiveColumns = deviceType === "mobile" ? Math.min(columns, 2) : columns;

  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: effectiveThreshold,
    rootMargin: effectiveRootMargin,
    once,
    amount,
    animateOnMount,
  });

  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Customize stagger variants based on optimized columns and pattern
  const variants = staggerGridVariants(effectiveColumns, pattern);

  // Get stagger and delay values from the chosen variant
  const baseTransition = (variants.visible as Variant & { transition?: TransitionWithStagger })?.transition || {};
  const baseStaggerChildren = baseTransition.staggerChildren || 0.05;
  const baseDelayChildren = baseTransition.delayChildren || 0;

  // Create device-optimized variants
  const deviceOptimizedVariants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...baseTransition,
        // Apply device-specific stagger timing
        staggerChildren: deviceType === "mobile" ? optimizedTimings.entryStagger || 0.03 : deviceType === "tablet" ? optimizedTimings.stagger || 0.08 : baseStaggerChildren,
        // Adjust delay based on device
        delayChildren:
          deviceType === "mobile"
            ? baseDelayChildren * 0.5 // Shorter delay on mobile
            : baseDelayChildren,
      },
    },
  };

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
    : deviceOptimizedVariants;

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={accessibleVariants} transition={delay ? { delay } : undefined} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${effectiveColumns} gap-${gap}`} {...props}>
      {children}
    </motion.div>
  );
}

/**
 * Grid item to be used as a child of StaggerGrid
 * Implements proper animation variants for grid layouts
 * Automatically adjusts animation based on device
 */
export function StaggerGridItem({ children, ...props }: HTMLMotionProps<"div">) {
  // Check if user prefers reduced motion and device type
  const prefersReducedMotion = useReducedMotion();
  const { deviceType } = useDeviceOptimizedAnimations();

  // Adjust animation based on device type
  const duration = deviceType === "mobile" ? 0.3 : deviceType === "tablet" ? 0.35 : 0.4;
  const y = deviceType === "mobile" ? 10 : 20; // Less movement on mobile
  const scale = deviceType === "mobile" ? 0.97 : 0.95; // Less scale change on mobile

  return (
    <motion.div
      variants={
        prefersReducedMotion
          ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.2 } },
            }
          : {
              hidden: { opacity: 0, y, scale },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
