"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { slideVariants, distances } from "./variants";

interface SlideInProps extends HTMLMotionProps<"div">, Omit<ScrollAnimationOptions, "animateOnMount"> {
  /**
   * The direction from which the element should slide in
   */
  direction?: "up" | "down" | "left" | "right";

  /**
   * The distance the element should slide
   */
  distance?: number;

  /**
   * Custom delay for the animation in seconds
   */
  delay?: number;

  /**
   * Whether to animate on mount instead of scroll
   */
  animateOnMount?: boolean;
}

/**
 * A component that slides in its children when scrolled into view
 * Uses consistent animation timing and easing from variants
 */
export function SlideIn({ children, direction = "up", distance = distances.medium, threshold, rootMargin, once = true, amount, delay, animateOnMount = false, ...props }: SlideInProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    rootMargin,
    once,
    amount,
    animateOnMount,
  });

  // Create variants with specified direction and distance
  const variants = slideVariants(direction, distance);

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} transition={delay ? { delay } : undefined} {...props}>
      {children}
    </motion.div>
  );
}
