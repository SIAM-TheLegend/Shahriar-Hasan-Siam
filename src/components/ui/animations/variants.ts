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
  entryStagger: 0.05, // Added for entry animations
} as const;

export const easings = {
  smooth: [0.4, 0, 0.2, 1], // Smooth easing for most animations
  bounce: [0.68, -0.6, 0.32, 1.6], // Bouncy easing for playful elements
  spring: [0.43, 0.13, 0.23, 0.96], // Natural spring effect
  entry: [0.25, 0.1, 0.25, 1.0], // Optimized for entry animations
} as const;

// Distance values for translations
export const distances = {
  small: 10,
  medium: 30,
  large: 50,
};

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

// Enhanced fade variant with more options
export const createFadeVariant = (delay: number = 0, duration: number = timings.medium): Variants => ({
  hidden: {
    opacity: 0,
    transition: {
      duration,
      ease: easings.smooth,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration,
      ease: easings.smooth,
      delay,
    },
  },
});

// Slide animation variants with direction support
export const slideVariants = (direction: "up" | "down" | "left" | "right", distance: number = distances.medium): Variants => {
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getOffset(),
      transition: {
        duration: timings.medium,
        ease: easings.entry,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: timings.medium,
        ease: easings.entry,
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
      delayChildren: 0.1, // Small delay before starting children animations
    },
  },
};

// Optimized stagger container for list/grid items
export const staggerListVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: timings.entryStagger,
      ease: easings.entry,
    },
  },
};

// Item variant for staggered lists
export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: timings.fast,
      ease: easings.entry,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.fast,
      ease: easings.entry,
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
      ease: easings.entry,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.fast,
      ease: easings.entry,
    },
  },
};
