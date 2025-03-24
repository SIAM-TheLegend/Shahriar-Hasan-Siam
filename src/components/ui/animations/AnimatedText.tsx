"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { useScrollAnimation, ScrollAnimationOptions } from "@/hooks/useScrollAnimation";
import { textRevealVariants } from "./variants";
import { ReactNode } from "react";

interface AnimatedTextProps extends HTMLMotionProps<"div">, Omit<ScrollAnimationOptions, "animateOnMount"> {
  /**
   * The text to animate. Can be a string or an array of strings for multi-line text.
   */
  text: string | string[];

  /**
   * Animation type - choose whether to animate by character, word, or line
   */
  animationType?: "character" | "word" | "line";

  /**
   * Duration of each staggered element
   */
  staggerDuration?: number;

  /**
   * Custom CSS class name for the text elements
   */
  textClassName?: string;

  /**
   * HTML tag to use for the text (h1, h2, p, etc.)
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

  /**
   * Custom delay for the animation in seconds
   */
  delay?: number;

  /**
   * Whether to animate on mount instead of scroll
   */
  animateOnMount?: boolean;
}

/**
 * A component that animates text with a staggered reveal effect
 * Splits text into characters, words, or lines for animation
 */
export function AnimatedText({ text, animationType = "character", staggerDuration = 0.03, textClassName = "", as: Component = "div", threshold, rootMargin, once = true, amount, delay = 0, animateOnMount = false, ...props }: AnimatedTextProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    rootMargin,
    once,
    amount,
    animateOnMount,
  });

  // Process text based on animation type
  const processText = () => {
    // Convert to array of lines if it's a string
    const lines = Array.isArray(text) ? text : [text];

    return lines.map((line, lineIndex) => {
      // Split line into words or characters based on animation type
      if (animationType === "line") {
        return (
          <div key={`line-${lineIndex}`} className="relative overflow-hidden">
            <motion.div
              className={textClassName}
              custom={lineIndex}
              variants={{
                hidden: { y: "100%" },
                visible: (i) => ({
                  y: 0,
                  transition: {
                    delay: delay + i * staggerDuration,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  },
                }),
              }}
            >
              {line}
            </motion.div>
          </div>
        );
      }

      const words = line.split(" ");

      if (animationType === "word") {
        return (
          <div key={`line-${lineIndex}`} className="flex flex-wrap">
            {words.map((word, wordIndex) => (
              <div key={`word-${lineIndex}-${wordIndex}`} className="relative overflow-hidden mr-1 mb-1">
                <motion.span
                  className={textClassName}
                  custom={lineIndex + wordIndex * 0.1}
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: (i) => ({
                      y: 0,
                      opacity: 1,
                      transition: {
                        delay: delay + i * staggerDuration,
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1.0],
                      },
                    }),
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        );
      }

      // Character animation (default)
      return (
        <div key={`line-${lineIndex}`} className="flex flex-wrap">
          {words.map((word, wordIndex) => (
            <div key={`word-${lineIndex}-${wordIndex}`} className="mr-1 mb-1 flex">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`char-${lineIndex}-${wordIndex}-${charIndex}`}
                  className={textClassName}
                  custom={lineIndex * words.length + wordIndex * word.length + charIndex}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: delay + i * staggerDuration,
                        duration: 0.2,
                        ease: [0.25, 0.1, 0.25, 1.0],
                      },
                    }),
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      );
    });
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={container} {...props}>
      <Component>{processText()}</Component>
    </motion.div>
  );
}
