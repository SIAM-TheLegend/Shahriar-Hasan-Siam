"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { Heading, Paragraph, Lead } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { AnimatedText, FadeIn, SlideIn, Stagger, StaggerItem } from "@/components/ui/animations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { SectionProps } from "./SectionProps";

// Form schema with Zod validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(500, { message: "Message cannot exceed 500 characters" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

// Social media links
const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/yourusername" },
  { name: "GitHub", icon: Github, url: "https://github.com/yourusername" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/yourusername" },
];

// Contact info items
const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, label: "Location", value: "New York, NY", href: "https://maps.google.com/?q=New+York,+NY" },
];

/**
 * Social media link component with animation
 */
const SocialLink = ({ icon: Icon, url, name }: { icon: any; url: string; name: string }) => {
  return (
    <motion.a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label={name}>
      <Icon className="w-5 h-5" />
    </motion.a>
  );
};

/**
 * Contact info item component with animation
 */
const ContactInfoItem = ({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href: string }) => {
  return (
    <FadeIn>
      <motion.a href={href} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors" whileHover={{ y: -5 }}>
        <div className="mt-1 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{label}</h3>
          <p className="text-muted-foreground">{value}</p>
        </div>
      </motion.a>
    </FadeIn>
  );
};

/**
 * Contact Form component with animations and validation
 */
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      setIsSuccess(false);
      setIsError(false);

      // Make an API call to send the email
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      console.log("Form submission successful:", result);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FadeIn delay={0.2}>
      <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Stagger list={true} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StaggerItem variant="fadeUp" index={0}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <Input placeholder="Your name" {...field} />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </StaggerItem>

                <StaggerItem variant="fadeUp" index={1}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <Input placeholder="your.email@example.com" type="email" {...field} />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </StaggerItem>
              </div>

              <StaggerItem variant="fadeUp" index={2}>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                          <Input placeholder="What is this regarding?" {...field} />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </StaggerItem>

              <StaggerItem variant="fadeUp" index={3}>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                          <Textarea placeholder="Please include all relevant details..." className="min-h-[120px]" {...field} />
                        </motion.div>
                      </FormControl>
                      <FormDescription>Your message will be sent directly to my inbox. I typically respond within 24-48 hours.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </StaggerItem>

              <StaggerItem variant="fadeUp" index={4}>
                <Button type="submit" className="w-full" disabled={isSubmitting} variant={isSuccess ? "secondary" : isError ? "destructive" : "default"}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Send className="w-4 h-4" />
                      </motion.div>
                      Sending...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Message Sent
                    </span>
                  ) : isError ? (
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      Error Sending
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </StaggerItem>
            </Stagger>
          </form>
        </Form>
      </div>
    </FadeIn>
  );
};

/**
 * Main ContactSection component
 * Displays a contact form with animations and validation
 */
export function ContactSection({ withTransition = false, withParallax = false, activeSection, threshold = 0.1 }: SectionProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <Section id="contact" withTransition={withTransition} withParallax={withParallax} activeSection={activeSection} threshold={threshold}>
      <Container>
        <div className="flex flex-col gap-20">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <SlideIn direction="down">
              <AnimatedText text="Get In Touch" as="h2" animationType="word" className="mb-4" textClassName="text-3xl md:text-4xl font-bold" />
            </SlideIn>
            <FadeIn delay={0.2}>
              <Lead>Have a project in mind or want to discuss potential opportunities? Feel free to reach out.</Lead>
            </FadeIn>
          </div>

          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info & Social Links */}
            <div className="flex flex-col gap-8">
              <Stagger delay={0.1}>
                <div className="space-y-6">
                  <Heading as="h3" className="text-xl font-semibold">
                    Contact Information
                  </Heading>
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <ContactInfoItem key={`contact-${index}`} icon={item.icon} label={item.label} value={item.value} href={item.href} />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <Heading as="h3" className="text-xl font-semibold">
                    Connect On Social Media
                  </Heading>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((link, index) => (
                      <SocialLink key={`social-${index}`} icon={link.icon} url={link.url} name={link.name} />
                    ))}
                  </div>
                </div>
              </Stagger>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
