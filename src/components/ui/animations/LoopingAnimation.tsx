import { ReactNode, useState, useEffect } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoopingAnimationProps extends MotionProps {
  /**
   * The content to animate in a loop
   */
  children: ReactNode;

  /**
   * Type of looping animation to apply
   */
  type?: "pulse" | "float" | "rotate" | "bounce" | "wave";

  /**
   * Duration of each animation cycle in seconds
   */
  duration?: number;

  /**
   * CSS classes to apply to the container
   */
  className?: string;

  /**
   * Whether to disable the animation on mobile devices
   */
  disableOnMobile?: boolean;

  /**
   * Custom delay before animation starts in seconds
   */
  delay?: number;
}

/**
 * Creates a continuous looping animation for child elements
 * Provides several animation types and configurable parameters
 * Optimized for performance with reduced motion and mobile detection
 */
export function LoopingAnimation({ children, type = "float", duration = 3, className, disableOnMobile = false, delay = 0, ...rest }: LoopingAnimationProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect mobile devices and reduced motion preferences on mount
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Check for mobile if disable on mobile is true
    if (disableOnMobile) {
      const checkMobile = () => {
        setShouldAnimate(window.innerWidth >= 768);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      // Cleanup
      return () => {
        window.removeEventListener("resize", checkMobile);
        mediaQuery.removeEventListener("change", handleReducedMotionChange);
      };
    } else {
      // Just handle reduced motion
      mediaQuery.addEventListener("change", handleReducedMotionChange);
      return () => mediaQuery.removeEventListener("change", handleReducedMotionChange);
    }
  }, [disableOnMobile]);

  // Define animation variants based on type
  const variants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: duration * 2, // Slower rotation looks better
        repeat: Infinity,
        ease: "linear",
        delay,
      },
    },
    bounce: {
      y: [0, -15, 0],
      transition: {
        duration: duration * 0.5, // Faster bounce
        repeat: Infinity,
        ease: "easeOut",
        delay,
      },
    },
    wave: {
      x: [0, -5, 0, 5, 0],
      y: [0, -5, 0, -5, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  };

  // Skip animation if user prefers reduced motion or if disabled on mobile
  const shouldSkipAnimation = prefersReducedMotion || !shouldAnimate;

  return (
    <motion.div className={className} animate={shouldSkipAnimation ? undefined : variants[type]} {...rest}>
      {children}
    </motion.div>
  );
}
