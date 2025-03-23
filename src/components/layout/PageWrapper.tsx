"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

/**
 * PageWrapper component for handling page transitions
 * Wraps page content with animated transitions using Framer Motion
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

  // Set up animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && !prefersReducedMotion ? (
        <motion.div key="loader" className="fixed inset-0 z-50 flex items-center justify-center bg-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </motion.div>
      ) : (
        <motion.div key={pathname} initial="hidden" animate="enter" exit="exit" variants={variants} className="w-full">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
