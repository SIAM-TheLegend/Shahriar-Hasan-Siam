"use client";

import { useState, useEffect } from "react";
import { FadeIn, SlideIn } from "@/components/ui/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Paragraph, Lead } from "@/components/ui/typography";
import { HeroSection, AboutSection, ProjectsSection, SkillsSection, TestimonialsSection } from "@/components/sections";
import { ContactSection } from "@/components/sections/ContactSection";
import { useSectionTransition } from "@/hooks/useSectionTransition";

// Section IDs for navigation and transitions
const sectionIds = ["home", "about", "projects", "skills", "testimonials", "contact"];

export default function Home() {
  // Use the section transition hook to manage transitions
  const { activeSection, isTransitioning } = useSectionTransition({
    sectionIds,
    transitionDelay: 300,
  });

  return (
    <>
      {/* Hero Section */}
      <HeroSection withTransition={true} withParallax={true} activeSection={activeSection} />

      {/* About Section */}
      <AboutSection withTransition={true} activeSection={activeSection} />

      {/* Projects Section */}
      <ProjectsSection withTransition={true} activeSection={activeSection} />

      {/* Skills Section */}
      <SkillsSection withTransition={true} activeSection={activeSection} />

      {/* Testimonials Section */}
      <TestimonialsSection withTransition={true} activeSection={activeSection} />

      {/* Contact Section */}
      <ContactSection withTransition={true} activeSection={activeSection} />
    </>
  );
}
