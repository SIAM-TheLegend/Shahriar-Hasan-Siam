import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxEffectProps {
  /**
   * The content to apply the parallax effect to
   */
  children: ReactNode;

  /**
   * Direction of parallax movement ('up', 'down', 'left', 'right')
   */
  direction?: "up" | "down" | "left" | "right";

  /**
   * Speed of the parallax effect (0-1), where higher values mean more movement
   * Use smaller values for subtle effects
   */
  speed?: number;

  /**
   * CSS classes to apply to the container
   */
  className?: string;

  /**
   * Whether to disable the effect on mobile devices for better performance
   */
  disableOnMobile?: boolean;
}

/**
 * Creates a parallax scrolling effect that moves elements at different speeds
 * than the main scrolling content, adding a sense of depth
 */
export function ParallaxEffect({ children, direction = "up", speed = 0.3, className, disableOnMobile = true }: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldParallax, setShouldParallax] = useState(true);

  // Detect mobile devices on mount
  useEffect(() => {
    if (disableOnMobile) {
      const checkMobile = () => {
        setShouldParallax(window.innerWidth >= 768);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, [disableOnMobile]);

  // Get scroll progress of this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate distance to move (as percentage of viewport height)
  const distance = 20 * speed;

  // Create transform values based on direction
  const yUp = useTransform(scrollYProgress, [0, 1], [`${distance}%`, `${-distance}%`]);
  const yDown = useTransform(scrollYProgress, [0, 1], [`${-distance}%`, `${distance}%`]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [`${distance}%`, `${-distance}%`]);
  const xRight = useTransform(scrollYProgress, [0, 1], [`${-distance}%`, `${distance}%`]);
  const zero = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  // Determine which transform to use based on direction
  let transform: { x?: MotionValue<string>; y?: MotionValue<string> } = {};

  switch (direction) {
    case "up":
      transform = { y: yUp };
      break;
    case "down":
      transform = { y: yDown };
      break;
    case "left":
      transform = { x: xLeft };
      break;
    case "right":
      transform = { x: xRight };
      break;
    default:
      transform = { y: zero };
  }

  return (
    <motion.div ref={ref} className={cn("overflow-hidden", className)} style={shouldParallax ? transform : undefined} transition={{ type: "tween", ease: "linear" }}>
      {children}
    </motion.div>
  );
}
