"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FileDown, ChevronRight } from "lucide-react";
import { AnimatedText, FadeIn, SlideIn, Stagger, StaggerItem } from "@/components/ui/animations";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";
import { SectionProps } from "./SectionProps";

// Timeline data representing professional history
const timelineData = [
  {
    year: "2023",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Ltd.",
    description: "Led development of multiple high-traffic web applications using Next.js and React.",
  },
  {
    year: "2021",
    title: "UI/UX Designer & Developer",
    company: "Creative Solutions Inc.",
    description: "Designed and developed user interfaces for enterprise-level applications.",
  },
  {
    year: "2019",
    title: "Frontend Developer",
    company: "Digital Creators Agency",
    description: "Built responsive websites and web applications using modern JavaScript frameworks.",
  },
  {
    year: "2017",
    title: "Web Development Intern",
    company: "Web Wizards Studio",
    description: "Assisted in developing websites and learned fundamental web technologies.",
  },
];

/**
 * AboutSection component
 * Displays personal introduction, professional timeline, and downloadable resume
 * Features animated text reveals and interactive timeline entries
 */
export function AboutSection({ withTransition = false, withParallax = false, activeSection, threshold = 0.1 }: SectionProps) {
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <Section id="about" background="muted" withTransition={withTransition} withParallax={withParallax} activeSection={activeSection} threshold={threshold}>
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText text="About Me" as="h2" animationType="word" className="mb-6" textClassName="text-3xl md:text-4xl lg:text-5xl font-bold" delay={0.2} staggerDuration={0.08} />

          <SlideIn direction="up" delay={0.4} className="mb-8">
            <Paragraph muted className="text-lg md:text-xl leading-relaxed">
              I&apos;m a passionate frontend developer and UI/UX designer focused on creating beautiful, interactive, and high-performance web experiences with modern technologies.
            </Paragraph>
          </SlideIn>
        </div>

        {/* About Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Image & Bio */}
          <FadeIn delay={0.2} className="order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden border border-border shadow-xl mb-8">
              <div className="aspect-[4/3] relative">
                <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Shahriar Hasan Siam working on web development" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} className="transition-all duration-500 hover:scale-105" />
              </div>
            </div>

            <SlideIn direction="up" delay={0.4}>
              <Paragraph className="mb-4">With over 5 years of experience in web development, I specialize in creating modern, responsive, and performant websites and applications that provide exceptional user experiences.</Paragraph>

              <Paragraph muted>My expertise includes frontend frameworks like React and Next.js, modern CSS with Tailwind, animation libraries like Framer Motion, and responsive design principles. I&apos;m passionate about creating accessible, user-friendly interfaces that balance beautiful design with technical performance.</Paragraph>
            </SlideIn>
          </FadeIn>

          {/* Right Column - Timeline */}
          <div ref={timelineRef} className="order-1 lg:order-2">
            <Heading as="h3" className="text-xl md:text-2xl font-semibold mb-8">
              Professional Journey
            </Heading>

            <div className="relative border-l border-primary/20 pl-8">
              <Stagger list={true} className="space-y-8" animateOnMount={false}>
                {timelineData.map((item, index) => (
                  <StaggerItem key={item.year} index={index} variant="fadeUp">
                    {/* Timeline point */}
                    <div className="absolute -left-10 mt-1.5 w-3 h-3 rounded-full bg-primary/80 shadow-glow-sm"></div>

                    {/* Timeline Year */}
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">{item.year}</span>

                    {/* Timeline Content */}
                    <motion.div
                      className="p-4 rounded-lg bg-card hover:shadow-md transition-shadow duration-300"
                      whileHover={{
                        y: -5,
                        x: 5,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="text-primary text-sm mb-2">{item.company}</p>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>

        {/* Resume Download */}
        <FadeIn delay={0.3} className="text-center">
          <div className="inline-block p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <Heading as="h3" className="text-xl mb-3">
              Interested in my experience?
            </Heading>
            <Paragraph muted className="mb-5">
              Download my resume to learn more about my skills and experience.
            </Paragraph>

            <Button size="lg" asChild>
              <motion.a href="/resume.pdf" download className="inline-flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <FileDown className="w-5 h-5" />
                Download Resume
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
