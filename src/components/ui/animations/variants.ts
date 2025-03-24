/**
 * Animation variants for consistent timing and easing across components.
 * These variants are designed to work with Framer Motion and provide
 * a unified animation experience throughout the application.
 */

import { Variants } from "framer-motion";

// Base timing and easing values for consistency
export const timings = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.7,
  stagger: 0.1,
} as const;

export const easings = {
  smooth: [0.4, 0, 0.2, 1], // Smooth easing for most animations
  bounce: [0.68, -0.6, 0.32, 1.6], // Bouncy easing for playful elements
  spring: [0.43, 0.13, 0.23, 0.96], // Natural spring effect
} as const;

// Fade animation variants
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: timings.medium,
      ease: easings.smooth,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: timings.medium,
      ease: easings.smooth,
    },
  },
};

// Slide animation variants with direction support
export const slideVariants = (direction: "up" | "down" | "left" | "right"): Variants => {
  const offset = 50; // Base offset in pixels
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: offset };
      case "down":
        return { y: -offset };
      case "left":
        return { x: offset };
      case "right":
        return { x: -offset };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getOffset(),
      transition: {
        duration: timings.medium,
        ease: easings.smooth,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: timings.medium,
        ease: easings.smooth,
      },
    },
  };
};

// Scale animation variants
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: timings.medium,
      ease: easings.spring,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: timings.medium,
      ease: easings.spring,
    },
  },
};

// Stagger children animation variants
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: timings.stagger,
      ease: easings.smooth,
    },
  },
};

// Text reveal animation variants
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: timings.fast,
      ease: easings.smooth,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.fast,
      ease: easings.smooth,
    },
  },
};
