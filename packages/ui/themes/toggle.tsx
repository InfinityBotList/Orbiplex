"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function EnhancedThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  
  // When mounted, we can show the toggle
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  const themeOptions = [
    { name: "light", icon: <Sun className="h-4 w-4" />, label: "Light" },
    { name: "dark", icon: <Moon className="h-4 w-4" />, label: "Dark" },
    { name: "system", icon: <Monitor className="h-4 w-4" />, label: "System" },
  ];

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-md w-10 h-10 bg-background hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 p-1 z-50 bg-card border border-border rounded-lg shadow-lg w-48"
            >
              {themeOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    setTheme(option.name);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors",
                    theme === option.name 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted"
                  )}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {theme === option.name && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </button>
              ))}
              
              <div className="border-t border-border mt-1 pt-1">
                <div className="px-3 py-2 text-xs text-muted-foreground">
                  Theme will apply to all pages
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
