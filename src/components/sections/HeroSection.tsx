"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AnimatedText, FadeIn, SlideIn } from "@/components/ui/animations";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionProps } from "./SectionProps";

/**
 * HeroSection component
 * Displays an animated hero section with interactive background elements
 * Features text reveal animations, profile image, and mouse-responsive background
 */
export function HeroSection({ withTransition = false, withParallax = false, activeSection, threshold = 0.1 }: SectionProps) {
  // Mouse movement tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax transform values for background elements
  const backgroundX = useTransform(mouseX, [-300, 300], [20, -20]);
  const backgroundY = useTransform(mouseY, [-300, 300], [20, -20]);

  // Update mouse position for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      mouseX.set(e.clientX - rect.left - centerX);
      mouseY.set(e.clientY - rect.top - centerY);
    }
  };

  // Reset mouse position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Check if reduced motion is preferred
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion setting
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Add listener for changes to the preference
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <Section id="home" fullHeight withTransition={withTransition} withParallax={withParallax} activeSection={activeSection} threshold={threshold}>
      <Container>
        <div ref={containerRef} className="relative flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-8 sm:py-12" onMouseMove={!prefersReducedMotion ? handleMouseMove : undefined} onMouseLeave={!prefersReducedMotion ? handleMouseLeave : undefined}>
          {/* Background Elements - Responsive to mouse movement */}
          <motion.div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={!prefersReducedMotion ? { x: backgroundX, y: backgroundY } : undefined}>
            {/* Optimized background elements for mobile - smaller and less blurred */}
            <div className="absolute top-20 left-10 sm:left-20 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-primary/5 blur-2xl sm:blur-3xl" />
            <div className="absolute bottom-40 right-10 sm:right-20 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-primary/10 blur-2xl sm:blur-3xl" />
            <div className="absolute top-1/3 right-1/3 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-secondary/5 blur-xl sm:blur-2xl" />
          </motion.div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-0">
            {/* Left Column - Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <FadeIn delay={0.4}>
                <p className="text-primary font-medium mb-2 sm:mb-3">Hello, I&apos;m</p>
              </FadeIn>

              <AnimatedText text="Shahriar Hasan Siam" as="h1" animationType="word" className="mb-1 sm:mb-2" textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" delay={0.6} staggerDuration={0.08} />

              <AnimatedText text="Frontend Developer & UI/UX Designer" as="h2" animationType="word" className="mb-4 sm:mb-6" textClassName="text-lg sm:text-xl md:text-2xl text-muted-foreground" delay={1.2} staggerDuration={0.05} />

              <SlideIn direction="up" delay={1.8} className="mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                <p className="text-sm sm:text-base text-muted-foreground">I build beautiful, interactive, and high-performance web experiences with modern technologies and best practices.</p>
              </SlideIn>

              <FadeIn delay={2.2}>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link href="#projects">
                    <Button size="default" className="text-sm sm:text-base">
                      View My Work
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button size="default" variant="outline" className="text-sm sm:text-base">
                      Contact Me
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Profile Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-6 sm:mb-8 lg:mb-0">
              <FadeIn delay={0.8}>
                <motion.div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background shadow-lg" whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 mix-blend-overlay z-10" />
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Shahriar Hasan Siam - Frontend Developer & UI/UX Designer" fill sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px" style={{ objectFit: "cover" }} priority className="z-0" />
                </motion.div>
              </FadeIn>
            </div>
          </div>

          {/* Scroll Indicator - Smaller and more mobile-friendly positioning */}
          <motion.div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 0.8 }}>
            <p className="text-xs text-muted-foreground mb-1 sm:mb-2">Scroll to explore</p>
            <motion.div
              animate={!prefersReducedMotion ? { y: [0, 10, 0] } : undefined}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
