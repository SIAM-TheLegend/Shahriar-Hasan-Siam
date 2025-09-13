"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

const featuredProjects: Project[] = [
  {
    title: "Realtime Chat Platform",
    description: "A scalable MERN chat app with websockets, message persistence, and optimistic UI updates.",
    tech: ["Next.js", "Node.js", "Socket.IO", "MongoDB", "TailwindCSS"],
    liveUrl: "https://example.com/chat",
    sourceUrl: "https://github.com/username/realtime-chat",
  },
  {
    title: "E-commerce Dashboard",
    description: "Admin dashboard with analytics, order management, and product catalogs. Modular and extensible.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "tRPC", "Shadcn UI"],
    liveUrl: "https://example.com/ecommerce-dashboard",
    sourceUrl: "https://github.com/username/ecommerce-dashboard",
  },
  {
    title: "AI Content Assistant",
    description: "AI-assisted content planner with prompt templates, versioning, and collaboration features.",
    tech: ["Next.js", "Edge Functions", "OpenAI", "Redis", "Zod"],
    liveUrl: "https://example.com/ai-assistant",
    sourceUrl: "https://github.com/username/ai-content-assistant",
  },
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ y: 12, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, ease: "easeOut" }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">A selection of recent work that highlights my focus on performance, DX, and clean architecture</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div key={project.title} initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: "easeOut", delay: 0.04 * index }}>
              <Card className="h-full border-foreground/10">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Media placeholder with subtle accent border */}
                    <div className="aspect-video w-full rounded-lg border border-dashed border-foreground/15 bg-gradient-to-br from-muted to-background" />

                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded-md border border-foreground/10 bg-background">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      {project.liveUrl ? (
                        <Button asChild size="sm">
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            View Live
                          </Link>
                        </Button>
                      ) : null}
                      {project.sourceUrl ? (
                        <Button asChild size="sm" variant="outline">
                          <Link href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                            Source
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
