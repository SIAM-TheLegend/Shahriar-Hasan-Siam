"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeVariants } from "./variants";

interface FadeInProps extends HTMLMotionProps<"div"> {
  /**
   * The threshold value for the intersection observer (0-1)
   * Determines how much of the element needs to be visible to trigger animation
   */
  threshold?: number;
  /**
   * The margin around the root element for intersection observer
   * Can be used to trigger animation before element is in view
   */
  rootMargin?: string;
  /**
   * Whether to animate on mount instead of scroll
   */
  animateOnMount?: boolean;
}

/**
 * A component that fades in its children when scrolled into view
 * Uses consistent animation timing and easing from variants
 */
export function FadeIn({ children, threshold = 0.1, rootMargin = "0px", animateOnMount = false, ...props }: FadeInProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>(threshold, rootMargin);

  return (
    <motion.div ref={ref} initial="hidden" animate={animateOnMount || isInView ? "visible" : "hidden"} variants={fadeVariants} {...props}>
      {children}
    </motion.div>
  );
}
