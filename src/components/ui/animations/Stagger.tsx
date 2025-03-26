"use client";

import { HTMLMotionProps, motion, useReducedMotion, Variant, Transition } from "framer-motion";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { staggerContainerVariants, staggerListVariants } from "./variants";
import { useDeviceOptimizedAnimations } from "@/hooks/useDeviceOptimizedAnimations";

interface StaggerProps extends HTMLMotionProps<"div">, Omit<ScrollAnimationOptions, "animateOnMount"> {
  /**
   * Custom delay for the animation in seconds
   */
  delay?: number;

  /**
   * Whether to use list-optimized stagger animation (for lists and grids)
   */
  list?: boolean;

  /**
   * Whether to animate on mount instead of scroll
   */
  animateOnMount?: boolean;
}

// Helper type to safely extract transition properties
type TransitionWithStagger = Transition & {
  staggerChildren?: number;
  delayChildren?: number;
};

/**
 * A component that staggers the animation of its children
 * Uses consistent animation timing and easing from variants
 * Respects user's motion preferences for accessibility
 * Automatically optimizes for different device sizes
 */
export function Stagger({ children, threshold, rootMargin, once = true, amount, delay, list = false, animateOnMount = false, ...props }: StaggerProps) {
  // Get device-optimized animation settings
  const { deviceType, threshold: optimizedThreshold, timings: optimizedTimings } = useDeviceOptimizedAnimations();

  // Use optimized threshold if none provided
  const effectiveThreshold = threshold ?? optimizedThreshold;

  // Adjust rootMargin based on device type for better entry timing
  const effectiveRootMargin = rootMargin ?? (deviceType === "mobile" ? "50px" : deviceType === "tablet" ? "30px" : "0px");

  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: effectiveThreshold,
    rootMargin: effectiveRootMargin,
    once,
    amount,
    animateOnMount,
  });

  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Choose between regular stagger or list-optimized stagger
  const variants = list ? staggerListVariants : staggerContainerVariants;

  // Get stagger and delay values from the chosen variant
  const baseTransition = (variants.visible as Variant & { transition?: TransitionWithStagger })?.transition || {};
  const baseStaggerChildren = baseTransition.staggerChildren || 0.1;
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
            staggerChildren: 0.03, // Minimal stagger
            when: "beforeChildren",
          },
        },
      }
    : deviceOptimizedVariants;

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={accessibleVariants} transition={delay ? { delay } : undefined} {...props}>
      {children}
    </motion.div>
  );
}
