"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heading, Paragraph, Lead } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { AnimatedText, FadeIn, SlideIn, Stagger } from "@/components/ui/animations";
import { testimonials } from "@/constants/testimonials";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionProps } from "./SectionProps";

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
  activeIndex: number;
}

/**
 * TestimonialCard component for displaying individual testimonials with animations
 */
const TestimonialCard = ({ testimonial, isActive, activeIndex }: TestimonialCardProps) => {
  return (
    <motion.div className={cn("flex flex-col bg-card rounded-xl p-6 shadow-lg border border-border w-full max-w-xl mx-auto", isActive ? "opacity-100" : "opacity-0 pointer-events-none absolute")} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      {/* Quote Symbol */}
      <div className="mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" className="text-primary/20">
          <path fill="currentColor" d="M14.4 24H8c0-6.627 5.373-12 12-12v4c-4.418 0-8 3.582-8 8h2.4a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4H4.8a2.4 2.4 0 0 1-2.4-2.4v-7.2A2.4 2.4 0 0 1 4.8 24h9.6Zm24 0H32c0-6.627 5.373-12 12-12v4c-4.418 0-8 3.582-8 8h2.4a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4h-9.6a2.4 2.4 0 0 1-2.4-2.4v-7.2a2.4 2.4 0 0 1 2.4-2.4h9.6Z" />
        </svg>
      </div>

      {/* Testimonial Content */}
      <div className="mb-6">
        <Paragraph className="italic">{testimonial.content}</Paragraph>
      </div>

      {/* Rating Stars */}
      {testimonial.rating && (
        <div className="flex mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("w-5 h-5", i < testimonial.rating! ? "text-yellow-500 fill-yellow-500" : "text-muted")} />
          ))}
        </div>
      )}

      {/* Author Information */}
      <div className="flex items-center mt-auto">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border border-border">
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">{testimonial.avatar ? <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="(max-width: 768px) 48px, 48px" className="object-cover" priority={activeIndex === 0} /> : testimonial.name.charAt(0)}</div>
        </div>
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Navigation button component for testimonial carousel
 */
interface NavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const NavButton = ({ direction, onClick }: NavButtonProps) => {
  return (
    <motion.button className="w-12 h-12 rounded-full flex items-center justify-center bg-card shadow-md border border-border focus:outline-none focus:ring-2 focus:ring-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClick} aria-label={direction === "left" ? "Previous testimonial" : "Next testimonial"}>
      {direction === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </motion.button>
  );
};

/**
 * Dots indicator component for testimonial carousel
 */
interface DotsIndicatorProps {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}

const DotsIndicator = ({ count, active, onSelect }: DotsIndicatorProps) => {
  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          className={cn("w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary", {
            "bg-primary": i === active,
            "bg-primary/20": i !== active,
          })}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(i)}
          aria-label={`Go to testimonial ${i + 1}`}
        />
      ))}
    </div>
  );
};

/**
 * TestimonialsSection component
 * Displays animated testimonial carousel with navigation controls
 */
export function TestimonialsSection({ withTransition = false, withParallax = false, activeSection, threshold = 0.1 }: SectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>();

  // Handle automatic testimonial rotation
  useEffect(() => {
    if (autoplayEnabled && isInView) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000); // 6 second rotation
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplayEnabled, isInView]);

  // Pause autoplay when user interacts with carousel
  const handleManualNavigation = (newIndex: number) => {
    setAutoplayEnabled(false);
    setActiveIndex(newIndex);

    // Re-enable autoplay after 10 seconds of inactivity
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };

  const goToPrevious = () => {
    handleManualNavigation((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    handleManualNavigation((activeIndex + 1) % testimonials.length);
  };

  return (
    <Section id="testimonials" withTransition={withTransition} withParallax={withParallax} activeSection={activeSection} threshold={threshold}>
      <div className="mb-16 text-center">
        <SlideIn direction="down">
          <AnimatedText text="Client Testimonials" as="h2" animationType="word" className="mb-4" textClassName="text-3xl md:text-4xl font-bold" />
        </SlideIn>
        <FadeIn delay={0.2} className="max-w-2xl mx-auto">
          <Lead>What clients and colleagues have to say about my work</Lead>
        </FadeIn>
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-4">
        {/* Testimonial Cards */}
        <div className="relative min-h-[320px] md:min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} isActive={index === activeIndex} activeIndex={activeIndex} />
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex justify-between items-center">
          {/* Left Navigation Button */}
          <NavButton direction="left" onClick={goToPrevious} />

          {/* Dots Indicator */}
          <DotsIndicator count={testimonials.length} active={activeIndex} onSelect={handleManualNavigation} />

          {/* Right Navigation Button */}
          <NavButton direction="right" onClick={goToNext} />
        </div>
      </div>
    </Section>
  );
}
