"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { DevTools } from "@/components/ui/DevTools";
import { Heading } from "@/components/ui/typography";
import { getCurrentScreenSize } from "@/utils/responsiveTesting";
import { ChevronLeft } from "lucide-react";

/**
 * Mobile Testing Page
 *
 * This page is specifically designed to test mobile responsiveness.
 * It includes various components and layouts to test on different screen sizes.
 */
export default function MobileTestPage() {
  const [currentSize, setCurrentSize] = useState("Loading...");

  useEffect(() => {
    const updateSize = () => {
      setCurrentSize(getCurrentScreenSize());
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <>
      {/* Enable responsive debug tools */}
      <DevTools showResponsiveTools={true} />

      <Container>
        <Section className="mb-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-flex items-center text-primary hover:underline mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>

            <Heading as="h1">Mobile Responsiveness Test</Heading>

            <div className="p-4 bg-muted rounded-lg mb-6">
              <p className="font-mono">
                Current screen size: <strong>{currentSize}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="p-4 bg-card border rounded-lg shadow-sm">
                  <Heading as="h3" className="mb-2">
                    Card {item}
                  </Heading>
                  <p className="text-muted-foreground mb-4">This is a test card to check grid layout responsiveness.</p>
                  <Button size="sm">Action</Button>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="mb-8">
          <Heading as="h2" className="mb-4">
            Responsive Layout Tests
          </Heading>

          <div className="mb-6 p-4 border rounded-lg">
            <Heading as="h3" className="mb-2">
              Flex Direction Test
            </Heading>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">Flex Item 1</div>
              <div className="flex-1 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">Flex Item 2</div>
              <div className="flex-1 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">Flex Item 3</div>
            </div>
          </div>

          <div className="mb-6 p-4 border rounded-lg">
            <Heading as="h3" className="mb-2">
              Container Padding Test
            </Heading>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="h-32 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">Content Block</div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="h-32 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">Content Block</div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="h-32 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">Content Block</div>
              </div>
            </div>
          </div>
        </Section>

        <Section className="mb-8">
          <Heading as="h2" className="mb-4">
            Typography Scale Test
          </Heading>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Heading 1</h1>
              <p className="text-muted-foreground">4xl → 5xl → 6xl</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Heading 2</h2>
              <p className="text-muted-foreground">3xl → 4xl → 5xl</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-2xl md:text-3xl font-bold">Heading 3</h3>
              <p className="text-muted-foreground">2xl → 3xl</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-base md:text-lg max-w-prose">This is a paragraph with responsive text size. The font size increases slightly on larger screens to improve readability while maintaining a comfortable reading experience on mobile devices.</p>
              <p className="text-muted-foreground">base → lg</p>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
