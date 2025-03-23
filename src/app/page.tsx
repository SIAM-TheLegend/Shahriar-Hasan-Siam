import { FadeIn } from "@/components/ui/animations";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <FadeIn className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Welcome to My Portfolio</h1>
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">This is a placeholder for the homepage content. We&apos;ll be implementing proper sections according to the development documentation.</p>
      </FadeIn>
    </div>
  );
}
