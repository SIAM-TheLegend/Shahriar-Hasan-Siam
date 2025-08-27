"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"

export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.",
      image: "/notion-style-line-art-ecommerce-shopping-cart-mini.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates, team collaboration, and progress tracking.",
      image: "/notion-style-line-art-task-management-checklist-mi.png",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description:
        "Beautiful weather application with location-based forecasts, interactive maps, and data visualization.",
      image: "/notion-style-line-art-weather-dashboard-cloud-sun-.png",
      technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Blog Platform",
      description: "Modern blogging platform with markdown support, SEO optimization, and content management system.",
      image: "/notion-style-line-art-blog-writing-article-minimal.png",
      technologies: ["Next.js", "MDX", "Prisma", "Vercel"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={itemVariants}>
            Featured Projects
          </motion.h2>
          <motion.p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance" variants={itemVariants}>
            A showcase of my recent work and personal projects
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={cardVariants} whileHover="hover" custom={index}>
              <Card className={`group overflow-hidden ${project.featured ? "border-primary/20" : ""}`}>
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    variants={imageVariants}
                    whileHover="hover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: 0.2, duration: 0.5 },
                        }}
                        viewport={{ once: true }}
                      >
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                          {project.featured && (
                            <motion.div
                              className="inline-block ml-2"
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{
                                opacity: 1,
                                scale: 1,
                                transition: { delay: 0.4, duration: 0.3 },
                              }}
                              viewport={{ once: true }}
                            >
                              <Badge variant="secondary" className="text-xs">
                                Featured
                              </Badge>
                            </motion.div>
                          )}
                        </CardTitle>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.3, duration: 0.5 },
                        }}
                        viewport={{ once: true }}
                      >
                        <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
                      </motion.div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.4,
                        },
                      },
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <motion.div key={tech} variants={badgeVariants} whileHover="hover">
                        <Badge variant="outline" className="text-xs cursor-default">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.5, duration: 0.5 },
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div className="flex-1" variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </motion.div>
                    <motion.div className="flex-1" variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.6 },
          }}
          viewport={{ once: true }}
        >
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
