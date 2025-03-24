"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { Heading, Paragraph } from "../ui/typography";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FadeIn, SlideIn, Stagger, AnimatedText } from "../ui/animations";
import { Project, ProjectTag, projects, projectTags } from "@/constants/projects";

// Animation variants for the project cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Animation variants for the project tags
const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function ProjectsSection() {
  const [selectedTag, setSelectedTag] = useState<ProjectTag | "All">("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects when tag selection changes
  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.tags.includes(selectedTag)));
    }
  }, [selectedTag]);

  // Handle project selection for detailed view
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsDetailView(true);
  };

  // Handle back button in detailed view
  const handleBack = () => {
    setIsDetailView(false);
    setSelectedProject(null);
  };

  return (
    <Section id="projects">
      <Container className="space-y-10">
        <SlideIn>
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Heading as="h2">My Projects</Heading>
            <Paragraph className="max-w-2xl" muted>
              Here are some of my recent projects. Each project represents a unique challenge and learning experience.
            </Paragraph>
          </div>
        </SlideIn>

        {/* Project Tags Filter */}
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <motion.button variants={tagVariants} custom={0} initial="hidden" animate="visible" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === "All" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`} onClick={() => setSelectedTag("All")}>
              All
            </motion.button>
            {projectTags.map((tag, i) => (
              <motion.button key={tag} variants={tagVariants} custom={i + 1} initial="hidden" animate="visible" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`} onClick={() => setSelectedTag(tag)}>
                {tag}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Project Grid or Detailed View */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {!isDetailView ? (
            // Project Grid View with Staggered Animation
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div key={project.id} custom={index} variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -5 }} className="overflow-hidden">
                  <Card className="h-full flex flex-col cursor-pointer overflow-hidden group transition-all duration-300" onClick={() => handleProjectSelect(project)}>
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 z-10" />
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="h-full w-full relative">
                        <div className="relative w-full h-full bg-muted">
                          {/* This would be a real image in production */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-muted-foreground/40">Project Image</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                        {project.featured && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Featured</span>}
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.summary}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && <span className="text-xs bg-secondary/50 px-2 py-1 rounded-full">+{project.tags.length - 3}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t">
                        <span className="text-xs text-muted-foreground">
                          {new Date(project.completedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                        <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            // Detailed Project View
            selectedProject && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="space-y-8">
                <Button variant="ghost" onClick={handleBack} className="mb-4 group flex items-center gap-2">
                  <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-all" />
                  <span>Back to all projects</span>
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3 space-y-6">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <div className="relative w-full h-full bg-muted">
                        {/* This would be a real image in production */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-muted-foreground/40">Project Image</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Heading as="h3">{selectedProject.title}</Heading>
                      <Paragraph>{selectedProject.description}</Paragraph>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Project Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Completed</span>
                            <span className="text-sm">
                              {new Date(selectedProject.completedAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 pt-4">
                        {selectedProject.demoUrl && (
                          <Button variant="default" asChild className="w-full justify-between">
                            <Link href={selectedProject.demoUrl} target="_blank">
                              <span>Live Demo</span>
                              <ExternalLink size={16} />
                            </Link>
                          </Button>
                        )}
                        {selectedProject.githubUrl && (
                          <Button variant="outline" asChild className="w-full justify-between">
                            <Link href={selectedProject.githubUrl} target="_blank">
                              <span>View Code</span>
                              <Github size={16} />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
