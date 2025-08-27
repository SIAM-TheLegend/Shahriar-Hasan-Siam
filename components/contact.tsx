"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      x: 10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.2,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

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
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={itemVariants}>
            Get In Touch
          </motion.h2>
          <motion.p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance" variants={itemVariants}>
            Let's discuss your next project or just say hello
          </motion.p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <motion.h3
                className="text-xl font-semibold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                viewport={{ once: true }}
              >
                Let's Connect
              </motion.h3>
              <motion.p
                className="text-muted-foreground leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3, duration: 0.5 },
                }}
                viewport={{ once: true }}
              >
                I'm always interested in hearing about new opportunities, interesting projects, or just having a chat about technology and development.
              </motion.p>
            </div>

            <motion.div
              className="space-y-4"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.4,
                  },
                },
              }}
            >
              {[
                { icon: Mail, title: "Email", value: "siamshahriarhasan@gmail.com" },
                { icon: Phone, title: "Phone", value: "+880 1972-005986" },
                { icon: MapPin, title: "Location", value: "Narsingdi, Dhaka, Bangladesh" },
              ].map((contact, index) => (
                <motion.div key={contact.title} className="flex items-center gap-4 cursor-pointer" variants={contactItemVariants} whileHover="hover">
                  <motion.div
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
                    whileHover={{
                      backgroundColor: "hsl(var(--primary) / 0.2)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.div variants={iconVariants} whileHover="hover">
                      <contact.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <p className="font-medium">{contact.title}</p>
                    <p className="text-muted-foreground">{contact.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={formVariants}>
            <Card className="overflow-hidden">
              <CardHeader>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: true }}
                >
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} whileFocus="focus" transition={{ delay: 0.3 }}>
                    <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  </motion.div>
                  <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} whileFocus="focus" transition={{ delay: 0.4 }}>
                    <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  </motion.div>
                  <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} whileFocus="focus" transition={{ delay: 0.5 }}>
                    <Textarea name="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleChange} required />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.6, duration: 0.5 },
                    }}
                    viewport={{ once: true }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-16 pt-8 border-t border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.7, duration: 0.6 },
          }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">© 2024 Shahriar Hasan Siam. Built with Next.js and Tailwind CSS.</p>
        </motion.div>
      </div>
    </section>
  );
}
