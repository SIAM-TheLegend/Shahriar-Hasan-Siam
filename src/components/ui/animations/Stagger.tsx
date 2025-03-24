"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { staggerContainerVariants, staggerListVariants } from "./variants";

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

/**
 * A component that staggers the animation of its children
 * Uses consistent animation timing and easing from variants
 */
export function Stagger({ children, threshold, rootMargin, once = true, amount, delay, list = false, animateOnMount = false, ...props }: StaggerProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    rootMargin,
    once,
    amount,
    animateOnMount,
  });

  // Choose between regular stagger or list-optimized stagger
  const variants = list ? staggerListVariants : staggerContainerVariants;

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} transition={delay ? { delay } : undefined} {...props}>
      {children}
    </motion.div>
  );
}
