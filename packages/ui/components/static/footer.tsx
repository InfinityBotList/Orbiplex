import React from 'react'
import Link from 'next/link'
import { AnimatedLogo } from '../logos/animated'
import { GradientButton } from '../buttons/gradient'
import { FaDiscord, FaGit, FaTwitter } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background">
            <div className="container max-w-screen-2xl py-10 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <AnimatedLogo size="md" />
                        <p className="text-muted-foreground max-w-xs">
                            Discover the best Discord bots and servers to enhance your Discord experience. Your one-stop
                            destination for everything Discord.
                        </p>
                        <div className="flex gap-4 items-center">
                            <a
                                href="https://discord.gg/infinity-list"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Join our Discord server"
                            >
                                <FaDiscord className="w-6 h-6" />
                            </a>
                            <a
                                href="https://twitter.com/infinity-list"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Follow us on Twitter"
                            >
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a
                                href="https://github.com/infinity-list"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Visit our GitHub"
                            >
                                <FaGit className="w-6 h-6" />
                            </a>
                        </div>
                    </div>{' '}
                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
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
                            <Link href="/top" className="text-muted-foreground hover:text-foreground transition-colors">
                                Top Lists
                            </Link>
                            <Link href="/new" className="text-muted-foreground hover:text-foreground transition-colors">
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
                            <Link href="/api" className="text-muted-foreground hover:text-foreground transition-colors">
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
                        </div>{' '}
                        <div className="flex flex-col gap-2">
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
                </div>{' '}
                <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} ByteBrush Studios. All rights reserved.
                        </p>
                        <a
                            href="/sitemap.xml"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Sitemap
                        </a>
                        <a
                            href="/accessibility"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
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
    )
}
