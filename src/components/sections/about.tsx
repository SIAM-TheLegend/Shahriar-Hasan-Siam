"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">Passionate about creating digital experiences that make a difference</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full max-w-md rounded-2xl border-8 border-border mx-auto relative">
            <Image src="/developer-working-on-laptop-line-art.png" alt="Developer working" fill={true} className="object-cover" />
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground">I'm a passionate full-stack developer with 4+ years of experience building scalable web applications using the MERN stack. I love turning complex problems into simple, beautiful, and intuitive solutions.</p>

            <div>
              <Card className="border-primary/20">
                <CardContent className="px-6 py-px">
                  <h3 className="font-semibold mb-3 text-primary">Quick Facts</h3>
                  <ul className="space-y-2 text-sm">
                    {["🎓 Computer Science Graduate", "💼 4+ Years Professional Experience", "🌍 Based in Narsingdi, Dhaka, Bangladesh", "☕ Coffee Enthusiast & Problem Solver"].map((fact, index) => (
                      <li key={index}>{fact}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
