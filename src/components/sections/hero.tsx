"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteLinks } from "@/lib/site";

export function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-muted/30 pt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <Image src="/developer-coding-line-art.png" alt="Developer Avatar" width={200} height={200} className="mx-auto mb-6 rounded-full border-2 border-primary/20" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
          Hi, I'm <span className="text-primary">Shahriar Hasan Siam</span>
        </h1>

        <div className="mb-8 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-foreground text-balance">Full-Stack MERN Developer crafting modern web experiences with clean code and thoughtful design</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div>
            <Button size="lg" className="min-w-[140px]">
              <a href="#">View My Work</a>
            </Button>
          </div>
          <div>
            <Button variant="outline" size="lg" className="min-w-[140px] bg-transparent">
              <a href="#">Download CV</a>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-12">
          {/* Social Links: GitHub, LinkedIn, Email */}
          <div>
            <Button asChild variant="ghost" size="icon" className="rounded-full border-2 border-foreground/15 shadow-lg">
              <Link href={siteLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div>
            <Button asChild variant="ghost" size="icon" className="rounded-full border-2 border-foreground/15 shadow-lg">
              <Link href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div>
            <Button asChild variant="ghost" size="icon" className="rounded-full border-2 border-foreground/15 shadow-lg">
              <Link href={`mailto:${siteLinks.email}`} aria-label="Send email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <Button variant="ghost" size="icon" onClick={scrollToAbout} className="rounded-full">
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
