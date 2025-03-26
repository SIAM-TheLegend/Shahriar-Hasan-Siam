"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { slideVariants, distances } from "./variants";
import { useDeviceOptimizedAnimations } from "@/hooks/useDeviceOptimizedAnimations";

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
 * Automatically optimizes for different device sizes
 */
export function SlideIn({ children, direction = "up", distance, threshold, rootMargin, once = true, amount, delay, animateOnMount = false, ...props }: SlideInProps) {
  // Get device-optimized animation settings
  const { deviceType, threshold: optimizedThreshold } = useDeviceOptimizedAnimations();

  // Use optimized threshold if none provided
  const effectiveThreshold = threshold ?? optimizedThreshold;

  // Adjust rootMargin based on device type for better entry timing
  const effectiveRootMargin = rootMargin ?? (deviceType === "mobile" ? "50px" : deviceType === "tablet" ? "30px" : "0px");

  // Optimize slide distance for different devices
  const effectiveDistance = distance ?? (deviceType === "mobile" ? distances.small : deviceType === "tablet" ? distances.medium : distances.medium);

  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: effectiveThreshold,
    rootMargin: effectiveRootMargin,
    once,
    amount,
    animateOnMount,
  });

  // Create variants with specified direction and optimized distance
  const variants = slideVariants(direction, effectiveDistance);

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} transition={delay ? { delay } : undefined} {...props}>
      {children}
    </motion.div>
  );
}
