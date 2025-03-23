import { motion, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  threshold?: number;
}

/**
 * FadeIn component for smooth animation entry of elements as they scroll into view
 */
export function FadeIn({ children, delay = 0, duration = 0.5, className = "", direction = "up", distance = 50, threshold = 0.1 }: FadeInProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>(threshold);

  // Define the animation variants based on direction
  const getVariants = (): Variants => {
    const directionOffset = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      none: {},
    };

    return {
      hidden: {
        opacity: 0,
        ...directionOffset[direction],
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut",
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
