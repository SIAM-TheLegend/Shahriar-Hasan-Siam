"use client";

import { useState, useEffect } from "react";
import { startResponsiveDebugMode } from "@/utils/responsiveTesting";

interface DevToolsProps {
  /**
   * Whether to show responsive debug tools
   */
  showResponsiveTools?: boolean;
}

/**
 * DevTools component for development assistance
 *
 * This component provides development tools like responsive testing
 * Only visible in development mode by default
 */
export function DevTools({ showResponsiveTools = false }: DevToolsProps) {
  const [isClient, setIsClient] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (isClient && isDev && showResponsiveTools) {
      cleanup = startResponsiveDebugMode();
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [isClient, isDev, showResponsiveTools]);

  // This component doesn't render anything visible
  return null;
}
