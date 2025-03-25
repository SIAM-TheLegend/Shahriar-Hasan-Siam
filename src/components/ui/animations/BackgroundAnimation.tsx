import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface BackgroundAnimationProps {
  /**
   * Number of animated elements to create
   */
  particleCount?: number;

  /**
   * Whether to use more complex animations (may impact performance on mobile)
   */
  highPerformance?: boolean;

  /**
   * CSS classes to apply to the container
   */
  className?: string;

  /**
   * Z-index for positioning
   */
  zIndex?: number;
}

/**
 * Creates a subtle animated background effect with floating particles
 * Automatically adjusts based on theme and reduces animation complexity on mobile
 */
export function BackgroundAnimation({ particleCount = 15, highPerformance = false, className, zIndex = -10 }: BackgroundAnimationProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect window size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
      checkMobile();
    };

    // Initial update
    updateDimensions();

    // Update on resize
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Reduce complexity for mobile
  const effectiveParticleCount = isMobile ? Math.min(8, particleCount) : particleCount;
  const effectiveComplexity = isMobile ? false : highPerformance;

  // Generate random particles
  const particles = Array.from({ length: effectiveParticleCount }).map((_, i) => {
    // Random initial position
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Random size between 5px and 30px
    const size = Math.floor(Math.random() * 25) + 5;

    // Random opacity between 0.03 and 0.08
    const opacity = Math.random() * 0.05 + 0.03;

    // Random animation duration between 20s and 40s
    const duration = Math.random() * 20 + 20;

    // Random rotation for complex animations
    const rotate = effectiveComplexity ? Math.random() * 360 : 0;

    return { id: i, x, y, size, opacity, duration, rotate };
  });

  return (
    <div ref={containerRef} className={cn("fixed inset-0 overflow-hidden pointer-events-none", className)} style={{ zIndex }} aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn("absolute rounded-full", theme === "dark" ? "bg-primary/10" : "bg-primary/5")}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: effectiveComplexity ? [0, 180, 360] : 0,
            scale: effectiveComplexity ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
