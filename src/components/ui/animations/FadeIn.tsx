"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { fadeVariants, createFadeVariant } from "./variants";
import { useDeviceOptimizedAnimations } from "@/hooks/useDeviceOptimizedAnimations";

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
 * Automatically optimizes for different device sizes
 */
export function FadeIn({ children, threshold, rootMargin, once = true, amount, delay = 0, duration, animateOnMount = false, ...props }: FadeInProps) {
  // Get device-optimized animation settings
  const { deviceType, threshold: optimizedThreshold } = useDeviceOptimizedAnimations();

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

  // Use custom fade variant if delay or duration are specified
  const variants = delay > 0 || duration ? createFadeVariant(delay, duration) : fadeVariants;

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} {...props}>
      {children}
    </motion.div>
  );
}
