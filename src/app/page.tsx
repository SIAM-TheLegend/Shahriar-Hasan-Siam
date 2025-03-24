import { FadeIn, SlideIn } from "@/components/ui/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Paragraph, Lead } from "@/components/ui/typography";
import { HeroSection, AboutSection, ProjectsSection, SkillsSection, TestimonialsSection } from "@/components/sections";

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
      <Section id="contact">
        <SlideIn className="flex flex-col items-center justify-center text-center">
          <Heading as="h2">Contact Me</Heading>
          <Paragraph className="mt-6 max-w-2xl" muted>
            This is a placeholder for the contact section. Here we will add a contact form and other ways to get in touch.
          </Paragraph>
        </SlideIn>
      </Section>
    </>
  );
}
