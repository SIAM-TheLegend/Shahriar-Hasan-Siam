"use client";

import { FC, ReactNode, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { sectionTransitionVariants, sectionParallaxVariants } from "./variants";
import { useDeviceOptimizedAnimations } from "@/hooks/useDeviceOptimizedAnimations";

interface SectionTransitionProps extends Omit<ScrollAnimationOptions, "animateOnMount"> {
  /**
   * The content to be animated during section transitions
   */
  children: ReactNode;

  /**
   * Unique identifier for the section - used for transition management
   */
  id: string;

  /**
   * Whether to use parallax effect for the background
   */
  withParallax?: boolean;

  /**
   * Whether to animate immediately when mounted (vs. on scroll)
   */
  animateOnMount?: boolean;

  /**
   * Custom transition variants to override defaults
   */
  customVariants?: Variants;

  /**
   * CSS class name for the wrapper
   */
  className?: string;

  /**
   * Whether to trigger animation on active section change
   */
  triggerOnActive?: boolean;

  /**
   * Current active section ID (used with triggerOnActive)
   */
  activeSection?: string;
}

/**
 * A component that provides smooth transitions between sections
 * as the user navigates through the page.
 * Automatically optimizes for different device sizes.
 */
export const SectionTransition: FC<SectionTransitionProps> = ({ children, id, threshold, rootMargin, once = true, withParallax = false, animateOnMount = false, customVariants, className = "", triggerOnActive = false, activeSection }) => {
  // Get device-optimized animation settings
  const { deviceType, threshold: optimizedThreshold, useHighComplexity } = useDeviceOptimizedAnimations();

  // Use optimized threshold if none provided
  const effectiveThreshold = threshold ?? optimizedThreshold;

  // Adjust rootMargin based on device type for better entry timing
  const effectiveRootMargin = rootMargin ?? (deviceType === "mobile" ? "50px" : deviceType === "tablet" ? "30px" : "0px");

  // Disable parallax on mobile devices unless explicitly set
  const shouldUseParallax = withParallax && (deviceType !== "mobile" || useHighComplexity);

  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: effectiveThreshold,
    rootMargin: effectiveRootMargin,
    once,
    animateOnMount,
  });

  const [isActive, setIsActive] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  // Track if this section has been viewed
  useEffect(() => {
    if (isInView && !hasBeenViewed) {
      setHasBeenViewed(true);
    }
  }, [isInView, hasBeenViewed]);

  // Handle active section changes
  useEffect(() => {
    if (triggerOnActive && activeSection) {
      setIsActive(activeSection === id);
    }
  }, [triggerOnActive, activeSection, id]);

  // Choose the appropriate variants based on props
  const variants = customVariants || sectionTransitionVariants;
  const backgroundVariants = shouldUseParallax ? sectionParallaxVariants : undefined;

  // Determine when to show animation
  // If triggerOnActive is true, use isActive state
  // Otherwise, use isInView from scroll animation
  const shouldAnimate = triggerOnActive ? isActive : isInView;

  return (
    <div ref={ref} className={`section-transition ${className}`}>
      <motion.div initial="hidden" animate={shouldAnimate || hasBeenViewed ? "visible" : "hidden"} exit="exit" variants={variants} className="w-full h-full">
        {shouldUseParallax ? (
          <motion.div initial="hidden" animate={shouldAnimate || hasBeenViewed ? "visible" : "hidden"} exit="exit" variants={backgroundVariants} className="w-full h-full">
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.div>
    </div>
  );
};
