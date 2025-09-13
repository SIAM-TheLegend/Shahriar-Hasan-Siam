"use client";

import { useState, useTransition, createContext, useContext } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isPending: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial = saved ?? "light";
    document.documentElement.classList.toggle("dark", initial === "dark");
    return initial;
  });
  const [isPending, startTransition] = useTransition();

  const toggleTheme = () => {
    type DocumentWithViewTransition = Document & {
      startViewTransition?: (callback: () => void) => void;
    };
    const doc = document as DocumentWithViewTransition;

    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      startTransition(() => {
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
      });
    };

    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme, isPending }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
