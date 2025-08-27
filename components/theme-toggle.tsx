"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false); // Default to light theme

  useEffect(() => {
    // Resolve saved theme; default to light when absent
    const savedTheme = localStorage.getItem("theme");
    const isSavedDark = savedTheme === "dark";

    setIsDark(isSavedDark);
    document.documentElement.classList.toggle("dark", isSavedDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;

    const switchTheme = () => {
      setIsDark(newTheme);
      document.documentElement.classList.toggle("dark", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    // Check if View Transitions API is supported
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        switchTheme();
      });
    } else {
      // Fallback for browsers that don't support the API
      switchTheme();
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 h-9 p-0" aria-label="Toggle theme">
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
