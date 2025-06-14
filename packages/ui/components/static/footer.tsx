"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatedLogo } from "../logos/animated";
import { GradientButton } from "../buttons/gradient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, we would send this to an API
      console.log("Subscribing email:", email);
      setSubscribed(true);
      setEmail("");
      // Reset the subscribed state after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container max-w-screen-2xl py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <AnimatedLogo size="md" />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Discover the best Discord bots and servers to enhance your Discord
              experience. Your one-stop destination for everything Discord.
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="https://discord.gg/infinity-list"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Join our Discord server"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/infinity-list"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/infinity-list"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Visit our GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
            </div>
          </div>          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">Resources</h3>
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
                href="/top"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Top Lists
              </Link>
              <Link
                href="/new"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                New Additions
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">Developers</h3>
              <Link
                href="/docs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/api"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                API
              </Link>
              <Link
                href="/docs/widgets"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Widgets
              </Link>
              <Link
                href="/status"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Status
              </Link>
              <Link
                href="/webhooks"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Webhooks
              </Link>
            </div>            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">Company</h3>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/careers"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/partners"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Partners
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">Legal</h3>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/guidelines"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Guidelines
              </Link>
              <Link
                href="/dmca"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                DMCA
              </Link>
            </div>
          </div>
        </div>        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ByteBrush Studios. All rights reserved.
            </p>
            <a href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </a>
            <a href="/accessibility" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Accessibility
            </a>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Do Not Sell My Info
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              Infinity List is not affiliated with Discord Inc.
            </p>
            <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-primary to-accent animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
