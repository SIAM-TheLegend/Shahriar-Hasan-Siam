import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <FeaturedProjects />
      <Contact />
    </div>
  );
}
