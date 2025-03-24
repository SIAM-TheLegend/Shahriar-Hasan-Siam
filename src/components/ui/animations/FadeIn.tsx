"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { fadeVariants, createFadeVariant } from "./variants";

interface FadeInProps extends HTMLMotionProps<"div">, Omit<ScrollAnimationOptions, "animateOnMount"> {
  /**
   * Custom delay for the animation in seconds
   */
  delay?: number;

  /**
   * Custom duration for the animation in seconds
   */
  duration?: number;

  /**
   * Whether to animate on mount instead of scroll
   */
  animateOnMount?: boolean;
}

/**
 * A component that fades in its children when scrolled into view
 * Uses consistent animation timing and easing from variants
 */
export function FadeIn({ children, threshold, rootMargin, once = true, amount, delay = 0, duration, animateOnMount = false, ...props }: FadeInProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    rootMargin,
    once,
    amount,
    animateOnMount,
  });

  // Use custom fade variant if delay or duration are specified
  const variants = delay > 0 || duration ? createFadeVariant(delay, duration) : fadeVariants;

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} {...props}>
      {children}
    </motion.div>
  );
}
