import { motion, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  animationType?: "character" | "word" | "line";
  delay?: number;
  staggerDuration?: number;
  duration?: number;
  threshold?: number;
  as?: React.ElementType;
}

/**
 * AnimatedText component for animating text reveal character by character or word by word
 */
export function AnimatedText({ text, className = "", textClassName = "", animationType = "word", delay = 0, staggerDuration = 0.03, duration = 0.5, threshold = 0.1, as: Component = "h2" }: AnimatedTextProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>(threshold);

  // Split the text according to animation type
  const splitText = () => {
    switch (animationType) {
      case "character":
        return text.split("");
      case "word":
        return text.split(" ");
      case "line":
        return text.split("\n");
      default:
        return text.split(" ");
    }
  };

  // Get the items to animate
  const items = splitText();

  // Define animation variants
  const containerVariants: Variants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  // Animation for each element
  const itemVariants: Variants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.2, 0.65, 0.3, 0.9], // Custom easing
      },
    },
  };

  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={isInView ? "visible" : "hidden"} aria-label={text} variants={containerVariants}>
      <Component className={textClassName}>
        {items.map((item, index) => (
          <motion.span key={index} className="inline-block" variants={itemVariants} style={{ marginRight: animationType === "character" ? "0" : "0.25em" }}>
            {item}
            {animationType === "character" && index < items.length - 1 ? "" : " "}
          </motion.span>
        ))}
      </Component>
    </motion.div>
  );
}
