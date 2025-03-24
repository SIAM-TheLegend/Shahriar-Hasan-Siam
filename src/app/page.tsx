import { FadeIn, SlideIn } from "@/components/ui/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Paragraph, Lead } from "@/components/ui/typography";
import { HeroSection, AboutSection, ProjectsSection, SkillsSection, TestimonialsSection } from "@/components/sections";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
