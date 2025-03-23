import { motion, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";

interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  as?: React.ElementType;
}

/**
 * Stagger component for animating children with a staggered delay
 */
export function Stagger({ children, staggerDelay = 0.1, initialDelay = 0, direction = "up", distance = 20, duration = 0.5, className = "", threshold = 0.1, as: Component = "div" }: StaggerProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>(threshold);

  // Convert children to array to enable staggering
  const childrenArray = React.Children.toArray(children);

  // Calculate direction offset
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
        return {};
      default:
        return { y: distance };
    }
  };

  // Container variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  // Child variants
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
      {React.Children.map(childrenArray, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
