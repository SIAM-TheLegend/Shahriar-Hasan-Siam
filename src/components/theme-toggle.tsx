"use client";

import React from "react";
import { useTheme } from "@/lib/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { toggleTheme, isPending, theme } = useTheme();

  return (
    <Button variant="ghost" size="icon" aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={theme === "dark"} onClick={toggleTheme} disabled={isPending} className="rounded-full">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;
