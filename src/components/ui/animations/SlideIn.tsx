import { motion, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";

interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

/**
 * SlideIn component for sliding animations when elements come into view
 */
export function SlideIn({ children, direction = "left", distance = 100, delay = 0, duration = 0.6, className = "", threshold = 0.1 }: SlideInProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>(threshold);

  // Define direction-based variants
  const getVariants = (): Variants => {
    const directionOffsets = {
      left: { x: -distance, y: 0 },
      right: { x: distance, y: 0 },
      up: { y: -distance, x: 0 },
      down: { y: distance, x: 0 },
    };

    return {
      hidden: {
        ...directionOffsets[direction],
        opacity: 0,
      },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth motion
        },
      },
    };
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
}
