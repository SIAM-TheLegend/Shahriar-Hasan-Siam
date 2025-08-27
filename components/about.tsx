"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const factItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={itemVariants}>
            About Me
          </motion.h2>
          <motion.p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance" variants={itemVariants}>
            Passionate about creating digital experiences that make a difference
          </motion.p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
          <motion.div variants={imageVariants}>
            <motion.img
              src="/notion-style-line-art-developer-working-on-laptop-.png"
              alt="Developer working"
              className="w-full max-w-md rounded-2xl border-8 border-border mx-auto"
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 },
              }}
            />
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <TextGenerateEffect words="I'm a passionate full-stack developer with 4+ years of experience building scalable web applications using the MERN stack. I love turning complex problems into simple, beautiful, and intuitive solutions." className="text-lg leading-relaxed text-foreground" duration={0.6} triggerOnView={true} />

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-primary/20">
                <CardContent className="px-6 py-px">
                  <motion.h3
                    className="font-semibold mb-3 text-primary"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: true }}
                  >
                    Quick Facts
                  </motion.h3>
                  <motion.ul
                    className="space-y-2 text-sm"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.3,
                        },
                      },
                    }}
                  >
                    {["🎓 Computer Science Graduate", "💼 4+ Years Professional Experience", "🌍 Based in San Francisco, CA", "☕ Coffee Enthusiast & Problem Solver"].map((fact, index) => (
                      <motion.li key={index} variants={factItemVariants}>
                        {fact}
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
