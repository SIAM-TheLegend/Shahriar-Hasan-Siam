"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Variants } from "framer-motion";

/**
 * Hook to handle reduced motion preferences with fallbacks
 * Provides simplified animation variants for users who prefer reduced motion
 */
export function useReducedMotionPreference() {
  // Use Framer Motion's built-in hook
  const prefersReducedMotion = useReducedMotion();

  // Additional state to detect high-contrast mode and other preferences
  const [highContrastMode, setHighContrastMode] = useState(false);

  useEffect(() => {
    // Check for high contrast mode
    const mediaQuery = window.matchMedia("(forced-colors: active)");
    setHighContrastMode(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setHighContrastMode(e.matches);
    };

    // Add listener for changes to the preference
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  /**
   * Converts complex animation variants to simplified versions if needed
   * @param regularVariants - The standard animation variants
   * @param simplifiedVariants - Optional override for the simplified version
   */
  const getAccessibleVariants = (regularVariants: Variants, simplifiedVariants?: Variants): Variants => {
    if (prefersReducedMotion) {
      return (
        simplifiedVariants || {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.2,
              staggerChildren: 0.03,
              when: "beforeChildren",
            },
          },
          exit: { opacity: 0, transition: { duration: 0.1 } },
        }
      );
    }

    return regularVariants;
  };

  /**
   * Simplifies any Framer Motion transition property if needed
   * @param regularTransition - The standard transition object
   */
  const getAccessibleTransition = (regularTransition: any) => {
    if (prefersReducedMotion) {
      return {
        duration: 0.2,
        ease: "easeOut",
      };
    }

    return regularTransition;
  };

  return {
    prefersReducedMotion,
    highContrastMode,
    getAccessibleVariants,
    getAccessibleTransition,
  };
}
