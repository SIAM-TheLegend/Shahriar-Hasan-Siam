"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { pageTransitionVariants } from "@/components/ui/animations/variants";

interface PageWrapperProps {
  children: ReactNode;
}

/**
 * PageWrapper component for handling page transitions
 * Wraps page content with animated transitions using Framer Motion
 * Uses standardized animation timing and easing from variants
 */
export function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Save scroll position when navigating
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore scroll position when returning to a page
  useEffect(() => {
    setIsLoading(true);

    // Small delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  // If reduced motion is preferred, use simplified transitions
  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : pageTransitionVariants;

  return (
    <AnimatePresence mode="wait">
      {isLoading && !prefersReducedMotion ? (
        <motion.div key="loader" className="fixed inset-0 z-50 flex items-center justify-center bg-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </motion.div>
      ) : (
        <motion.div key={pathname} initial="hidden" animate="visible" exit="exit" variants={variants} className="w-full">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
