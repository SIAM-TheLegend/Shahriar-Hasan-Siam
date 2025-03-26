"use client";

import { useState } from "react";
import { FadeIn, SlideIn, Stagger, StaggerItem, StaggerGrid, StaggerGridItem } from "@/components/ui/animations";
import { AnimationTester } from "@/components/ui/debug/AnimationTester";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * A page for testing animations on different device sizes
 * This is meant for development use only
 */
export default function TestAnimationsPage() {
  const [showAnimations, setShowAnimations] = useState(true);

  // Toggle animations to test re-mounting
  const resetAnimations = () => {
    setShowAnimations(false);
    setTimeout(() => setShowAnimations(true), 100);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-8">
      {/* Animation Tester UI */}
      <AnimationTester />

      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Animation Test Page</h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">Test how animations perform across different device sizes. Use the device simulator in the top right corner.</p>
          <Button onClick={resetAnimations}>Reset Animations</Button>
        </header>

        {showAnimations && (
          <>
            <section className="space-y-8">
              <h2 className="text-2xl font-bold">Fade In Animations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FadeIn className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Basic Fade In</h3>
                  <p className="text-muted-foreground">Default timing and threshold</p>
                </FadeIn>

                <FadeIn delay={0.3} className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Delayed Fade In</h3>
                  <p className="text-muted-foreground">With 0.3s delay</p>
                </FadeIn>

                <FadeIn duration={1.2} className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Slow Fade In</h3>
                  <p className="text-muted-foreground">With 1.2s duration</p>
                </FadeIn>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-2xl font-bold">Slide In Animations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SlideIn direction="up" className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Slide Up</h3>
                  <p className="text-muted-foreground">Default slide distance</p>
                </SlideIn>

                <SlideIn direction="down" className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Slide Down</h3>
                  <p className="text-muted-foreground">Default slide distance</p>
                </SlideIn>

                <SlideIn direction="left" className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Slide Left</h3>
                  <p className="text-muted-foreground">Default slide distance</p>
                </SlideIn>

                <SlideIn direction="right" className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Slide Right</h3>
                  <p className="text-muted-foreground">Default slide distance</p>
                </SlideIn>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-2xl font-bold">Stagger Animations</h2>
              <Stagger className="bg-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Staggered Children</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <StaggerItem key={item} className="bg-background p-4 rounded-md">
                      <h4 className="font-medium">Item {item}</h4>
                      <p className="text-sm text-muted-foreground">Staggered entry</p>
                    </StaggerItem>
                  ))}
                </div>
              </Stagger>
            </section>

            <section className="space-y-8">
              <h2 className="text-2xl font-bold">Stagger Grid Animations</h2>
              <div>
                <h3 className="text-lg font-medium mb-4">Sequence Pattern</h3>
                <StaggerGrid columns={3} pattern="sequence" gap={4}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <StaggerGridItem key={item} className="bg-card p-4 rounded-md">
                      <h4 className="font-medium">Item {item}</h4>
                      <p className="text-sm text-muted-foreground">Sequence pattern</p>
                    </StaggerGridItem>
                  ))}
                </StaggerGrid>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Rows Pattern</h3>
                <StaggerGrid columns={3} pattern="rows" gap={4}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <StaggerGridItem key={item} className="bg-card p-4 rounded-md">
                      <h4 className="font-medium">Item {item}</h4>
                      <p className="text-sm text-muted-foreground">Rows pattern</p>
                    </StaggerGridItem>
                  ))}
                </StaggerGrid>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Columns Pattern</h3>
                <StaggerGrid columns={3} pattern="columns" gap={4}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <StaggerGridItem key={item} className="bg-card p-4 rounded-md">
                      <h4 className="font-medium">Item {item}</h4>
                      <p className="text-sm text-muted-foreground">Columns pattern</p>
                    </StaggerGridItem>
                  ))}
                </StaggerGrid>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
