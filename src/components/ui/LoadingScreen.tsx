"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * LoadingScreen component displays an animated loading screen with brand identity
 * Tracks loading progress and provides smooth transition to main content
 * Uses localStorage to abbreviate experience for returning visitors
 */
export function LoadingScreen() {
  // State for tracking loading progress
  const [progress, setProgress] = useState(0);
  // State for controlling visibility of loading screen
  const [isVisible, setIsVisible] = useState(true);
  // Flag for returning visitors
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);

  useEffect(() => {
    // Check if user is a returning visitor
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

    if (hasVisitedBefore) {
      // For returning visitors, show a shorter loading experience
      setIsReturningVisitor(true);
      // Start with higher progress for returning visitors
      setProgress(70);
    }

    // Simulate loading progress
    const interval = setInterval(
      () => {
        setProgress((prevProgress) => {
          // Accelerate progress for returning visitors
          const increment = isReturningVisitor ? 10 : 5;
          const nextProgress = prevProgress + increment;

          // Complete loading when reaching 100%
          if (nextProgress >= 100) {
            clearInterval(interval);

            // Short delay before hiding loading screen
            setTimeout(() => {
              setIsVisible(false);
            }, 500);

            // Store visit in localStorage
            localStorage.setItem("hasVisitedBefore", "true");

            return 100;
          }

          return nextProgress;
        });
      },
      isReturningVisitor ? 100 : 200
    );

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [isReturningVisitor]);

  // Brand identity animation variants
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  // Loading screen animation variants
  const screenVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };

  // Progress bar animation variants
  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${progress}%`,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background" variants={screenVariants} initial="initial" exit="exit">
          {/* Brand identity animation */}
          <motion.div className="relative mb-12" variants={logoVariants} initial="initial" animate="animate" exit="exit">
            <div className="text-4xl md:text-6xl font-bold">
              <span className="text-primary">Shah</span>
              <span>Riar</span>
            </div>
            <div className="absolute -bottom-2 right-0 text-xs md:text-sm text-muted-foreground">Developer</div>
          </motion.div>

          {/* Loading progress indicator */}
          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary" variants={progressVariants} initial="initial" animate="animate" />
          </div>

          {/* Loading text */}
          <p className={cn("mt-4 text-sm text-muted-foreground transition-opacity duration-200", progress === 100 ? "opacity-0" : "opacity-100")}>{progress < 33 ? "Preparing assets..." : progress < 66 ? "Loading content..." : progress < 100 ? "Almost ready..." : ""}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
