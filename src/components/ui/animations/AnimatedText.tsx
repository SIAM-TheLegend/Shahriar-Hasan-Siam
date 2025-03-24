"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { textRevealVariants } from "./variants";

interface AnimatedTextProps extends HTMLMotionProps<"div"> {
  /**
   * The text to animate. Can be a string or an array of strings for multi-line text.
   */
  text: string | string[];
  /**
   * Whether to animate each word separately
   */
  animateWords?: boolean;
  /**
   * The threshold value for the intersection observer (0-1)
   */
  threshold?: number;
  /**
   * The margin around the root element for intersection observer
   */
  rootMargin?: string;
  /**
   * Whether to animate on mount instead of scroll
   */
  animateOnMount?: boolean;
}

/**
 * A component that animates text with a reveal effect
 * Uses consistent animation timing and easing from variants
 */
export function AnimatedText({ text, animateWords = false, threshold = 0.1, rootMargin = "0px", animateOnMount = false, ...props }: AnimatedTextProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>(threshold, rootMargin);

  // Convert text to array if it's a string
  const textArray = Array.isArray(text) ? text : [text];

  return (
    <motion.div ref={ref} initial="hidden" animate={animateOnMount || isInView ? "visible" : "hidden"} variants={textRevealVariants} {...props}>
      {textArray.map((line, lineIndex) => (
        <div key={lineIndex} className="overflow-hidden">
          <motion.div variants={textRevealVariants}>
            {animateWords
              ? line.split(" ").map((word, wordIndex) => (
                  <motion.span key={wordIndex} className="inline-block" variants={textRevealVariants}>
                    {word}
                    {wordIndex !== line.split(" ").length - 1 && "\u00A0"}
                  </motion.span>
                ))
              : line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
