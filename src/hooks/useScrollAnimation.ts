import { useEffect, useRef, useState } from "react";

/**
 * A custom hook for detecting when an element enters the viewport
 * and triggering animations.
 *
 * @param threshold - Percentage of element visible to trigger (0-1)
 * @param rootMargin - Margin around the root element (CSS format)
 * @returns Object containing ref to attach to element and boolean indicating if element is in view
 */
export function useScrollAnimation<T extends Element>(threshold: number = 0.1, rootMargin: string = "0px") {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element is in view, set isInView to true
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once element has been seen, no need to observe anymore
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
