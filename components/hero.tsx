"use client";

import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-muted/30 pt-20">
      <motion.div className="max-w-4xl mx-auto px-6 text-center" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.img
            src="/minimalist-line-art-developer-avatar-coding.png"
            alt="Developer Avatar"
            className="w-40 h-40 mx-auto mb-6 rounded-full border-2 border-primary/20"
            variants={avatarVariants}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.3 },
            }}
          />
        </motion.div>

        <motion.h1 className="text-4xl md:text-5xl font-bold text-balance mb-6" variants={itemVariants}>
          Hi, I'm <span className="text-primary">Shahriar Hasan Siam</span>
        </motion.h1>

        <motion.div className="mb-8 max-w-2xl mx-auto" variants={itemVariants}>
          <TextGenerateEffect words="Full-Stack MERN Developer crafting modern web experiences with clean code and thoughtful design" className="text-xl md:text-2xl text-foreground text-balance" duration={0.8} />
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="min-w-[140px]">
              <a href="https://www.revenuecpmgate.com/z9jyj4j7r?key=fb56f9c60a35881bac92e7254ced13cc">View My Work</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" className="min-w-[140px] bg-transparent">
              <a href="https://www.revenuecpmgate.com/z9jyj4j7r?key=fb56f9c60a35881bac92e7254ced13cc">Download CV</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center justify-center gap-6 mb-12" variants={itemVariants}>
          {[Github, Linkedin, Mail].map((Icon, index) => (
            <motion.div key={index} variants={socialVariants} whileHover="hover" whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon className="h-5 w-5" />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          animate={{
            y: [0, -10, 0],
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          <Button variant="ghost" size="icon" onClick={scrollToAbout} className="rounded-full">
            <ArrowDown className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
