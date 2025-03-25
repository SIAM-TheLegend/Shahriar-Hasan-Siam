/**
 * Utils for section transitions and smooth scrolling
 * Enhances the user experience when navigating between sections
 */

import { easings, timings } from "@/components/ui/animations/variants";

/**
 * Interface for section transition options
 */
interface TransitionOptions {
  /**
   * Duration of the transition in seconds
   * @default 0.8
   */
  duration?: number;

  /**
   * Easing function for the transition
   * @default [0.25, 0.1, 0.25, 1.0] (custom entry easing)
   */
  easing?: number[];

  /**
   * Offset from the top of the viewport in pixels
   * @default 80
   */
  offset?: number;

  /**
   * Callback function to execute before the transition
   */
  onStart?: () => void;

  /**
   * Callback function to execute after the transition
   */
  onComplete?: () => void;
}

/**
 * Smoothly scrolls to a specific section with enhanced transition
 * Updates browser history and provides callbacks for animation sync
 *
 * @param sectionId - ID of the section to scroll to
 * @param options - Configuration options for the transition
 */
export function transitionToSection(sectionId: string, options?: TransitionOptions) {
  const { duration = 0.8, easing = easings.entry, offset = 80, onStart, onComplete } = options || {};

  const element = document.getElementById(sectionId);
  if (!element) return;

  // Calculate the position
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  // Execute onStart callback if provided
  if (onStart) onStart();

  // Update URL hash for browser history and accessibility
  window.history.pushState(null, "", `#${sectionId}`);

  // Smooth scroll to the section
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });

  // Execute onComplete callback after animation
  if (onComplete) {
    setTimeout(() => {
      onComplete();
    }, duration * 1000);
  }
}

/**
 * Get the current active section based on scroll position
 *
 * @param sectionIds - Array of section IDs to check
 * @param offset - Offset from the top of the viewport
 * @returns The ID of the current active section
 */
export function getCurrentSection(sectionIds: string[], offset = 80): string {
  const scrollPosition = window.scrollY + offset;

  // Default to first section
  let currentSection = sectionIds[0];

  // Find the section that is currently in view
  for (const sectionId of sectionIds) {
    const element = document.getElementById(sectionId);

    if (!element) continue;

    // Get section boundaries
    const sectionTop = element.offsetTop;
    const sectionHeight = element.offsetHeight;

    // Check if the current scroll position is within this section
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = sectionId;
      break;
    }
  }

  // Special case for when scrolled to the bottom of the page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    currentSection = sectionIds[sectionIds.length - 1];
  }

  return currentSection;
}
