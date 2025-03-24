"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Options for scroll animation behavior
 */
export interface ScrollAnimationOptions {
  /**
   * Percentage of element visible to trigger (0-1)
   */
  threshold?: number;

  /**
   * Margin around the root element (CSS format)
   */
  rootMargin?: string;

  /**
   * Whether to trigger the animation only once (true) or every time the element enters the viewport (false)
   */
  once?: boolean;

  /**
   * Amount of the element that must be visible to trigger the animation (0-1)
   */
  amount?: number;

  /**
   * Whether to start animation immediately on mount
   */
  animateOnMount?: boolean;
}

/**
 * A custom hook for detecting when an element enters the viewport
 * and triggering animations with enhanced control options.
 *
 * @returns Object containing ref to attach to element, boolean indicating if element is in view,
 *          and a reset function to manually reset the animation state
 */
export function useScrollAnimation<T extends Element>(options?: ScrollAnimationOptions) {
  const { threshold = 0.1, rootMargin = "0px", once = true, amount = 0, animateOnMount = false } = options || {};

  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(animateOnMount);

  // Function to reset animation state - useful for repeatable animations
  const reset = () => setIsInView(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only update state if necessary to avoid unnecessary renders
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);

          // If the animation should only happen once, unobserve the element
          if (once) {
            observer.unobserve(element);
          }
        } else if (!entry.isIntersecting && !once && isInView) {
          // Reset for repeatable animations
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
        // If amount is specified, use it as a single threshold value
        ...(amount > 0 ? { threshold: amount } : {}),
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, once, amount, isInView]);

  return { ref, isInView, reset };
}
