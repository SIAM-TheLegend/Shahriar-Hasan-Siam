/**
 * Utility functions for optimizing animations across different device sizes
 * These functions help ensure animations perform well on all target devices
 */

// Device size breakpoints (matching Tailwind defaults)
export const deviceBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Get the current device type based on window width
 * @returns The current device type
 */
export const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  if (typeof window === "undefined") return "desktop"; // SSR fallback

  const width = window.innerWidth;

  if (width < deviceBreakpoints.md) {
    return "mobile";
  } else if (width < deviceBreakpoints.lg) {
    return "tablet";
  } else {
    return "desktop";
  }
};

/**
 * Get optimized animation timing values based on device type
 * @returns Object with optimized timing values
 */
export const getOptimizedTimings = () => {
  const deviceType = getDeviceType();

  // Base timing values
  const base = {
    fast: 0.3,
    medium: 0.5,
    slow: 0.7,
    stagger: 0.1,
    entryStagger: 0.05,
  };

  // Device-specific optimizations
  switch (deviceType) {
    case "mobile":
      return {
        fast: base.fast * 0.8, // Slightly faster on mobile
        medium: base.medium * 0.8,
        slow: base.slow * 0.6, // Much faster for slow animations on mobile
        stagger: base.stagger * 0.6, // Reduced stagger time on mobile
        entryStagger: base.entryStagger * 0.6,
      };
    case "tablet":
      return {
        fast: base.fast * 0.9,
        medium: base.medium * 0.9,
        slow: base.slow * 0.8,
        stagger: base.stagger * 0.8,
        entryStagger: base.entryStagger * 0.8,
      };
    default:
      return base; // Default desktop timings
  }
};

/**
 * Get optimized threshold values for scroll animations based on device type
 * This helps trigger animations at more appropriate times on different devices
 * @returns The optimized threshold value
 */
export const getOptimizedThreshold = (baseThreshold: number = 0.1): number => {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case "mobile":
      return Math.min(baseThreshold * 1.5, 0.3); // Higher threshold on mobile (trigger earlier)
    case "tablet":
      return Math.min(baseThreshold * 1.2, 0.25); // Slightly higher on tablet
    default:
      return baseThreshold; // Default desktop threshold
  }
};

/**
 * Get optimized animation complexity level based on device capabilities
 * @returns Boolean indicating if high complexity animations should be used
 */
export const shouldUseHighComplexityAnimations = (): boolean => {
  const deviceType = getDeviceType();

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // If user prefers reduced motion, always use low complexity
  if (prefersReducedMotion) return false;

  // Otherwise base on device
  switch (deviceType) {
    case "mobile":
      return false; // Low complexity on mobile
    case "tablet":
      return true; // Medium complexity on tablet
    default:
      return true; // Full complexity on desktop
  }
};

/**
 * Limit the number of animated elements based on device type
 * Useful for staggered animations with many elements
 * @param baseCount The original count of elements to animate
 * @returns The optimized count for the current device
 */
export const getOptimizedAnimationCount = (baseCount: number): number => {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case "mobile":
      return Math.min(baseCount, Math.ceil(baseCount * 0.5)); // 50% of items on mobile
    case "tablet":
      return Math.min(baseCount, Math.ceil(baseCount * 0.7)); // 70% of items on tablet
    default:
      return baseCount; // Full count on desktop
  }
};

/**
 * A hook that returns device-optimized animation settings
 * Uses window resize listener to update values in real-time
 * @returns Object with all device-optimized animation settings
 */
export const useDeviceOptimizedAnimations = () => {
  // Only use in browser environment
  if (typeof window === "undefined") {
    return {
      deviceType: "desktop",
      timings: getOptimizedTimings(),
      threshold: getOptimizedThreshold(),
      useHighComplexity: true,
      getOptimizedCount: getOptimizedAnimationCount,
    };
  }

  // Import React hooks dynamically for client-side only code
  const { useState, useEffect } = require("react");

  const [deviceType, setDeviceType] = useState(getDeviceType());
  const [timings, setTimings] = useState(getOptimizedTimings());
  const [threshold, setThreshold] = useState(getOptimizedThreshold());
  const [useHighComplexity, setUseHighComplexity] = useState(shouldUseHighComplexityAnimations());

  useEffect(() => {
    const handleResize = () => {
      const newDeviceType = getDeviceType();
      setDeviceType(newDeviceType);
      setTimings(getOptimizedTimings());
      setThreshold(getOptimizedThreshold());
      setUseHighComplexity(shouldUseHighComplexityAnimations());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    deviceType,
    timings,
    threshold,
    useHighComplexity,
    getOptimizedCount: getOptimizedAnimationCount,
  };
};
