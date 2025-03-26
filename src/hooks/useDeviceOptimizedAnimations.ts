"use client";

import { useState, useEffect } from "react";
import { getDeviceType, getOptimizedTimings, getOptimizedThreshold, shouldUseHighComplexityAnimations, getOptimizedAnimationCount } from "@/utils/deviceOptimizations";

/**
 * A hook that returns device-optimized animation settings
 * Uses window resize listener to update values in real-time
 * @returns Object with all device-optimized animation settings
 */
export function useDeviceOptimizedAnimations() {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(typeof window !== "undefined" ? getDeviceType() : "desktop");
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
}
