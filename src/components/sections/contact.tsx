"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

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

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">Let's discuss your next project or just say hello</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">I'm always interested in hearing about new opportunities, interesting projects, or just having a chat about technology and development.</p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email", value: "siamshahriarhasan@gmail.com" },
                { icon: Phone, title: "Phone", value: "+880 1972-005986" },
                { icon: MapPin, title: "Location", value: "Narsingdi, Dhaka, Bangladesh" },
              ].map((contact, index) => (
                <div key={contact.title} className="flex items-center gap-4 cursor-pointer">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <contact.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{contact.title}</p>
                    <p className="text-muted-foreground">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card className="overflow-hidden">
              <CardHeader>
                <div>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <Textarea name="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleChange} required />
                  </div>
                  <div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground">© 2024 Shahriar Hasan Siam. Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </section>
  );
}
