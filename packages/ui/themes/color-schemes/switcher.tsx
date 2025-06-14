"use client";

import { useColorScheme } from "./provider";
import { cn } from "@/lib/utils";
import { Check, Palette } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ColorSwatch = {
  name: "purple" | "blue" | "green" | "pink" | "orange" | "teal" | "cyan" | "red" | "indigo" | "crimson";
  color: string;
  accent: string;
};

const colorSwatches: ColorSwatch[] = [
  { name: "cyan", color: "#06b6d4", accent: "#2dd4bf" },
  { name: "teal", color: "#14b8a6", accent: "#2dd4bf" },
  { name: "blue", color: "#3b82f6", accent: "#60a5fa" },
  { name: "purple", color: "#8467fa", accent: "#bd63f9" },
  { name: "green", color: "#10b981", accent: "#34d399" },
  { name: "pink", color: "#ec4899", accent: "#f472b6" },
  { name: "orange", color: "#f97316", accent: "#fb923c" },
  { name: "red", color: "#ef4444", accent: "#f87171" },
  { name: "indigo", color: "#6366f1", accent: "#818cf8" },
  { name: "crimson", color: "#dc2626", accent: "#e96363" },
];

export function ColorSchemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-md w-10 h-10 bg-background hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Change color scheme"
      >
        <Palette className="w-5 h-5" />
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
              initial={{ opacity: 0, y: -5, scale: 0.95 }}              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 p-2 z-50 bg-card border border-border rounded-lg shadow-lg w-64 grid grid-cols-5 gap-2"
            >
              {colorSwatches.map((swatch) => (
                <button
                  key={swatch.name}
                  onClick={() => {
                    setColorScheme(swatch.name);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-center w-full h-10 rounded-md transition-all",
                    colorScheme === swatch.name
                      ? "ring-2 ring-ring" 
                      : "hover:ring-2 hover:ring-border"
                  )}
                  style={{
                    background: `linear-gradient(135deg, ${swatch.color}, ${swatch.accent})`,
                  }}
                  aria-label={`Switch to ${swatch.name} theme`}
                >
                  {colorScheme === swatch.name && (
                    <Check className="w-4 h-4 text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
