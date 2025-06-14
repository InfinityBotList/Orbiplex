"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * ThemeInitializer component ensures a smooth initial theme transition
 * by preventing a flash of unstyled content (FOUC) when the page loads
 */
export function ThemeInitializer() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Add custom CSS variables to document root dynamically for smooth color transitions
    const root = document.documentElement;

    // Add transition property to make color changes smooth
    root.style.setProperty(
      "transition", 
      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
    );

    // Handle system preference changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (theme === 'system') {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };
    
    darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
      // Remove transition properties when component unmounts to avoid transition issues
      root.style.removeProperty("transition");
    };
  }, [theme, setTheme]);

  return null;
}
