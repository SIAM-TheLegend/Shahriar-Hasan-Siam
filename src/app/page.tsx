import { FadeIn, SlideIn } from "@/components/ui/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Paragraph, Lead } from "@/components/ui/typography";
import { HeroSection, AboutSection } from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <Section id="projects">
        <SlideIn className="flex flex-col items-center justify-center text-center">
          <Heading as="h2">My Projects</Heading>
          <Paragraph className="mt-6 max-w-2xl" muted>
            This is a placeholder for the projects section. Here we will showcase various projects with details, images, and links.
          </Paragraph>
        </SlideIn>
      </Section>

      {/* Skills Section */}
      <Section id="skills" background="muted">
        <SlideIn className="flex flex-col items-center justify-center text-center">
          <Heading as="h2">My Skills</Heading>
          <Paragraph className="mt-6 max-w-2xl" muted>
            This is a placeholder for the skills section. Here we will display technical skills, tools, and technologies with visual representations.
          </Paragraph>
        </SlideIn>
      </Section>

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
