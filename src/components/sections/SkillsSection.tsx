"use client";

import { useState, useRef } from "react";
import { motion, useTransform, MotionValue, useSpring } from "framer-motion";
import { LayoutGroup, useScroll, useMotionValueEvent } from "framer-motion";
import { Heading, Paragraph, Lead } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { AnimatedText, FadeIn, SlideIn, Stagger } from "@/components/ui/animations";
import { skillsData } from "@/constants/skills";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Info } from "lucide-react";

/**
 * SkillBar component for displaying individual skill with progress bar
 */
interface SkillBarProps {
  name: string;
  proficiency: number;
  color?: string;
  description?: string;
  delay: number;
}

const SkillBar = ({ name, proficiency, color = "#6366f1", description, delay }: SkillBarProps) => {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);

  // Animated progress value
  const springConfig = { damping: 30, stiffness: 300 };
  const progress = useSpring(0, springConfig);

  // Update progress when in view
  if (isInView && progress.get() === 0) {
    progress.set(proficiency);
  }

  return (
    <motion.div ref={ref} className="mb-6 last:mb-0" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          {description && (
            <div className="relative">
              <Info size={16} className="text-muted-foreground cursor-help" />
              {isHovered && (
                <motion.div className="absolute z-50 left-6 -top-2 w-64 p-3 rounded-lg bg-card shadow-lg border border-border text-sm" initial={{ opacity: 0, scale: 0.95, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.2 }}>
                  {description}
                </motion.div>
              )}
            </div>
          )}
        </div>
        <span className="text-sm font-medium">{proficiency}%</span>
      </div>
      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: progress.get() ? `${progress.get()}%` : "0%",
            backgroundColor: color,
          }}
        />
      </div>
    </motion.div>
  );
};

/**
 * TechIcon component for displaying technology icons with hover effect
 */
interface TechIconProps {
  name: string;
  icon: string;
  color?: string;
  delay: number;
}

const TechIcon = ({ name, icon, color = "#6366f1", delay }: TechIconProps) => {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <motion.div ref={ref} className="flex flex-col items-center justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay }}>
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-2 bg-card border border-border"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        style={{
          backgroundColor: `${color}10`,
          borderColor: `${color}30`,
        }}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center">
          {/* Using a placeholder for icon display - in a real implementation, you'd use appropriate icon components */}
          <div className="text-2xl md:text-3xl" style={{ color: color }}>
            {icon.charAt(0).toUpperCase()}
          </div>
        </div>
      </motion.div>
      <span className="text-sm font-medium text-center">{name}</span>
    </motion.div>
  );
};

/**
 * SkillsSection component
 * Displays animated skill bars and technology icons
 * Features scroll-linked progress animation and interactive tooltips
 */
export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <Section id="skills" background="muted">
      <div ref={sectionRef} className="mb-16 text-center">
        <SlideIn direction="down">
          <AnimatedText text="Skills & Expertise" as="h2" animationType="word" className="mb-4" textClassName="text-3xl md:text-4xl font-bold" />
        </SlideIn>
        <FadeIn delay={0.2} className="max-w-2xl mx-auto">
          <Lead>My technical skills and proficiency levels across various domains</Lead>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Skill Bars Section */}
        <div>
          <SlideIn direction="up" className="mb-6">
            <Heading as="h3" className="text-2xl sm:text-3xl md:text-4xl">
              Professional Proficiency
            </Heading>
            <Paragraph muted className="mt-2">
              Technical expertise gained through professional work and personal projects
            </Paragraph>
          </SlideIn>

          <div className="space-y-12 mt-8">
            {skillsData.map((category, categoryIndex) => (
              <div key={category.name} className="relative">
                <SlideIn delay={categoryIndex * 0.1} direction="up">
                  <Heading as="h4" className="text-xl sm:text-2xl mb-4">
                    {category.name}
                  </Heading>
                </SlideIn>

                <div>
                  {category.skills.map((skill, index) => (
                    <SkillBar key={skill.name} name={skill.name} proficiency={skill.proficiency} color={skill.color} description={skill.description} delay={(categoryIndex + 1) * 0.1 + index * 0.1} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Icons Grid */}
        <div>
          <SlideIn direction="up" className="mb-6">
            <Heading as="h3" className="text-2xl sm:text-3xl md:text-4xl">
              Technologies & Tools
            </Heading>
            <Paragraph muted className="mt-2">
              Technologies and tools I use in my development workflow
            </Paragraph>
          </SlideIn>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 mt-8">{skillsData.flatMap((category) => category.skills.map((skill, index) => <TechIcon key={skill.name} name={skill.name} icon={skill.icon} color={skill.color} delay={0.2 + index * 0.1} />))}</div>
        </div>
      </div>
    </Section>
  );
}
