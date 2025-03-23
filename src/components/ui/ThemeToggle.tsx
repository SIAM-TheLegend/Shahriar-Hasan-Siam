import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/**
 * ThemeToggle component for switching between light and dark mode
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button type="button" onClick={toggleTheme} className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-colors ${isDark ? "text-slate-100" : "text-slate-900"} ${className}`} whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} title={`Switch to ${isDark ? "light" : "dark"} mode`} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>
      <div className="relative">
        <motion.div initial={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }} animate={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex items-center justify-center">
          <Sun className="h-5 w-5" />
        </motion.div>
        <motion.div initial={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }} animate={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex items-center justify-center">
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>
    </motion.button>
  );
}
