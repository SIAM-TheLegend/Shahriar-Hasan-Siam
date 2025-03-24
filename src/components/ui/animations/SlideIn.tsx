"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { slideVariants } from "./variants";

interface SlideInProps extends HTMLMotionProps<"div"> {
  /**
   * The direction from which the element should slide in
   */
  direction?: "up" | "down" | "left" | "right";
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
 * A component that slides in its children when scrolled into view
 * Uses consistent animation timing and easing from variants
 */
export function SlideIn({ children, direction = "up", threshold = 0.1, rootMargin = "0px", animateOnMount = false, ...props }: SlideInProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>(threshold, rootMargin);

  return (
    <motion.div ref={ref} initial="hidden" animate={animateOnMount || isInView ? "visible" : "hidden"} variants={slideVariants(direction)} {...props}>
      {children}
    </motion.div>
  );
}
