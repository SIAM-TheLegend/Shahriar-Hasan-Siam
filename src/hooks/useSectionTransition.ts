"use client";

import { useState, useEffect } from "react";
import { useActiveSection } from "./useActiveSection";

interface SectionTransitionOptions {
  /**
   * Array of section IDs to track
   */
  sectionIds: string[];

  /**
   * Offset from the top of the viewport (in pixels) for section detection
   * @default 80
   */
  offset?: number;

  /**
   * Delay before triggering the transition animation (in milliseconds)
   * @default 200
   */
  transitionDelay?: number;

  /**
   * Whether to enable logging for debugging
   * @default false
   */
  debug?: boolean;
}

/**
 * Custom hook for managing section transitions
 * Builds on useActiveSection to provide animation control
 *
 * @returns Object containing activeSection, previousSection, and isTransitioning
 */
export function useSectionTransition({ sectionIds, offset = 80, transitionDelay = 200, debug = false }: SectionTransitionOptions) {
  const activeSection = useActiveSection(sectionIds, offset);
  const [previousSection, setPreviousSection] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetScrollPosition, setTargetScrollPosition] = useState<number | null>(null);

  // Track previous section for transition effects
  useEffect(() => {
    if (activeSection && activeSection !== previousSection) {
      if (debug) {
        console.log(`Transitioning from ${previousSection || "none"} to ${activeSection}`);
      }

      // Set transitioning state
      setIsTransitioning(true);

      // Store the current section as previous after delay
      const timer = setTimeout(() => {
        setPreviousSection(activeSection);
        setIsTransitioning(false);
      }, transitionDelay);

      return () => clearTimeout(timer);
    }
  }, [activeSection, previousSection, transitionDelay, debug]);

  // Handle manual navigation with smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    // Store target position for animation synchronization
    setTargetScrollPosition(offsetPosition);

    // Set transitioning state
    setIsTransitioning(true);

    // Update URL hash for browser history
    window.history.pushState(null, "", `#${sectionId}`);

    // Smooth scroll to the section
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setTargetScrollPosition(null);
    }, transitionDelay);
  };

  return {
    activeSection,
    previousSection,
    isTransitioning,
    targetScrollPosition,
    scrollToSection,
  };
}
