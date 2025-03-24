"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerContainerVariants } from "./variants";

interface StaggerProps extends HTMLMotionProps<"div"> {
  /**
   * The threshold value for the intersection observer (0-1)
   */
  threshold?: number;
  /**
   * The margin around the root element for intersection observer
   */
  rootMargin?: string;
  /**
   * Whether to animate on mount instead of scroll
   */
  animateOnMount?: boolean;
}

/**
 * A component that staggers the animation of its children
 * Uses consistent animation timing and easing from variants
 */
export function Stagger({ children, threshold = 0.1, rootMargin = "0px", animateOnMount = false, ...props }: StaggerProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>(threshold, rootMargin);

  return (
    <motion.div ref={ref} initial="hidden" animate={animateOnMount || isInView ? "visible" : "hidden"} variants={staggerContainerVariants} {...props}>
      {children}
    </motion.div>
  );
}
