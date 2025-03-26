/**
 * Animation variants for consistent timing and easing across components.
 * These variants are designed to work with Framer Motion and provide
 * a unified animation experience throughout the application.
 */

import { Variants } from "framer-motion";

// Base timing and easing values for consistency
export const timings = {
  fast: 0.3, // For small elements and micro-interactions
  medium: 0.5, // For most standard animations
  slow: 0.7, // For larger, more dramatic animations
  stagger: 0.1, // Standard stagger delay between elements in a group
  entryStagger: 0.05, // Optimized stagger timing for entry animations (smoother)
  standardDelay: 0.1, // Standard delay before animations start
} as const;

export const easings = {
  // Standard easings
  smooth: [0.4, 0, 0.2, 1], // Material Design standard easing
  accelerate: [0.4, 0.0, 1, 1], // Acceleration curve (swift start, steady end)
  decelerate: [0.0, 0.0, 0.2, 1], // Deceleration curve (steady start, slowing down)

  // Special effect easings
  bounce: [0.68, -0.6, 0.32, 1.6], // Bouncy easing for playful elements
  spring: [0.43, 0.13, 0.23, 0.96], // Natural spring effect

  // Purpose-specific easings
  entry: [0.25, 0.1, 0.25, 1.0], // Optimized for entry animations
  exit: [0.25, 0.8, 0.5, 1], // Optimized for exit animations
} as const;

// Distance values for translations
export const distances = {
  tiny: 5,
  small: 10,
  medium: 30,
  large: 50,
  xlarge: 80,
};

// Fade animation variants with standardized timing
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

// Scale animation variants with standardized timing
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
      delayChildren: timings.standardDelay, // Consistent delay before starting children animations
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
      delayChildren: timings.standardDelay * 0.5, // Slightly shorter delay for lists
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

// Fade up animation - commonly used for many elements
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: timings.medium,
      ease: easings.entry,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.medium,
      ease: easings.entry,
    },
  },
};

// Page transition variants for consistent page changes
export const pageTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: timings.medium,
      ease: easings.exit,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.medium,
      ease: easings.entry,
      when: "beforeChildren",
      staggerChildren: timings.entryStagger,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: timings.fast,
      ease: easings.exit,
    },
  },
};

// Section transition variants for smooth transitions between sections
export const sectionTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: {
      duration: timings.medium,
      ease: easings.exit,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.medium,
      ease: easings.entry,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: timings.medium,
      ease: easings.exit,
    },
  },
};

// Background parallax effect for section transitions
export const sectionParallaxVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: timings.medium,
      ease: easings.smooth,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: timings.slow,
      ease: easings.decelerate,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: timings.medium,
      ease: easings.accelerate,
    },
  },
};

// Create stagger grid variants with customizable patterns
export const staggerGridVariants = (columns: number = 3, pattern: "sequence" | "rows" | "columns" = "sequence"): Variants => {
  // Base delay for staggered children
  const baseStagger = timings.entryStagger;

  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: baseStagger,
        ease: easings.entry,
        delayChildren: timings.standardDelay * 0.5,
        // Different staggering strategies based on pattern
        staggerDirection: pattern === "sequence" ? 1 : pattern === "rows" ? 1 : columns,
      },
    },
  };
};

// Item variant optimized for grid layouts
export const gridItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.95,
    transition: {
      duration: timings.fast,
      ease: easings.exit,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: timings.medium,
      ease: easings.spring,
    },
  },
};

// Helper to create a custom stagger children pattern by index
// This allows for more complex staggering patterns like diagonal
export const createStaggerByIndex = (columns: number, pattern: "sequence" | "rows" | "columns" | "diagonal" = "sequence") => {
  return (i: number) => {
    // Default sequence is left to right, top to bottom
    let delay = i * timings.entryStagger;

    // For row-based staggering
    if (pattern === "rows") {
      const row = Math.floor(i / columns);
      const col = i % columns;
      delay = row * timings.stagger + col * timings.entryStagger;
    }

    // For column-based staggering
    if (pattern === "columns") {
      const row = Math.floor(i / columns);
      const col = i % columns;
      delay = col * timings.stagger + row * timings.entryStagger;
    }

    // For diagonal-based staggering
    if (pattern === "diagonal") {
      const row = Math.floor(i / columns);
      const col = i % columns;
      delay = (row + col) * timings.entryStagger;
    }

    return {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: timings.medium,
        ease: easings.spring,
        delay: delay,
      },
    };
  };
};
