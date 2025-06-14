"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatedLogo } from "@/components/ui/logos/animated";
import { ColorSchemeSwitcher } from "@/components/ui/themes/color-schemes/switcher";
import { EnhancedThemeToggle } from "@/components/ui/themes/toggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AnimatedLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/bots"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Bots
          </Link>
          <Link
            href="/servers"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Servers
          </Link>
          <Link
            href="/categories"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
        </nav>        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 border-r pr-4 mr-2 border-border/50">
            <EnhancedThemeToggle />
            <ColorSchemeSwitcher />
          </div>
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/add"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
          >
            Add Your Bot
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-muted-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              }
            />
          </svg>
        </button>        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden flex flex-col gap-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <BotSearchBar />
            </div>
            
            <Link
              href="/bots"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Bots
            </Link>
            <Link
              href="/servers"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Servers
            </Link>
            <Link
              href="/categories"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/docs"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            
            {/* Theme controls */}
            <div className="flex items-center justify-between gap-2 py-4 border-t border-b border-border">
              <span className="text-sm text-muted-foreground">Appearance</span>
              <div className="flex items-center gap-2">
                <EnhancedThemeToggle />
                <ColorSchemeSwitcher />
              </div>
            </div>
            
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/login"
                className="text-center text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/add"
                className="text-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Your Bot
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
