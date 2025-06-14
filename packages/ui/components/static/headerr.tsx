'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bot, Server, Book, Plus, ChevronDown } from 'lucide-react'
import { AnimatedLogo } from '../logos/animated'
import { ThemeMenu } from '../../themes/menu'
import { cn } from '@byteutils/functions/cn'

export default function ModernHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    // Track scroll for header transparency
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
        setActiveDropdown(null)
    }

    // Navigation links with dropdown support
    const navLinks = [
        {
            name: 'Bots',
            href: '/bots',
            icon: Bot,
            hasDropdown: true,
            dropdownItems: [
                { name: 'Featured Bots', href: '/bots/featured' },
                { name: 'New Arrivals', href: '/bots/new' },
                { name: 'Top Voted', href: '/bots/top' },
                { name: 'Categories', href: '/bots/categories' }
            ]
        },
        {
            name: 'Servers',
            href: '/servers',
            icon: Server,
            hasDropdown: true,
            dropdownItems: [
                { name: 'Featured Servers', href: '/servers/featured' },
                { name: 'Growing Communities', href: '/servers/growing' },
                { name: 'Browse by Topic', href: '/servers/topics' }
            ]
        },
        {
            name: 'Documentation',
            href: '/docs',
            icon: Book,
            hasDropdown: false
        }
    ]

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled || isMenuOpen
                    ? 'bg-gradient-to-b from-background to-card border-b border-border/20 shadow-sm'
                    : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo - Fixed nested Links */}
                    <div className="flex items-center gap-2">
                        <AnimatedLogo size="md" withText={!isScrolled || window.innerWidth >= 640} />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        {navLinks.map(link => (
                            <div key={link.name} className="relative group">
                                {link.hasDropdown ? (
                                    <>
                                        <button
                                            className="flex items-center gap-1.5 px-3 py-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors hover:bg-muted/50"
                                            onClick={() => toggleDropdown(link.name)}
                                        >
                                            <link.icon size={16} className="opacity-70" />
                                            <span className="font-medium">{link.name}</span>
                                            <ChevronDown
                                                size={14}
                                                className={cn(
                                                    'transition-transform duration-200',
                                                    activeDropdown === link.name ? 'transform rotate-180' : ''
                                                )}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {activeDropdown === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-1 w-48 rounded-xl overflow-hidden bg-background border border-border shadow-lg"
                                                >
                                                    <div className="py-1.5">
                                                        {link.dropdownItems.map(item => (
                                                            <Link
                                                                key={item.name}
                                                                href={item.href}
                                                                className="block px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                                                                onClick={closeMenu}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-1.5 px-3 py-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors hover:bg-muted/50"
                                        onClick={closeMenu}
                                    >
                                        <link.icon size={16} className="opacity-70" />
                                        <span className="font-medium">{link.name}</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Desktop CTA and Theme Menu */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeMenu />

                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50 rounded-lg"
                        >
                            Log In
                        </Link>

                        <Link
                            href="/add"
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 transition-all duration-300 hover:gap-2.5 group shadow-md hover:shadow-primary/20"
                        >
                            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span>Add Your Bot</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeMenu />
                        <button
                            className="p-2 rounded-md hover:bg-muted/30 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMenuOpen ? (
                                <X size={24} className="text-foreground" />
                            ) : (
                                <Menu size={24} className="text-foreground" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-card/98 backdrop-blur-xl border-t border-border/20"
                    >
                        <div className="container mx-auto px-4 py-6">
                            <nav className="flex flex-col space-y-1.5">
                                {navLinks.map(link => (
                                    <div key={link.name}>
                                        {link.hasDropdown ? (
                                            <>
                                                <button
                                                    className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/70 transition-colors"
                                                    onClick={() => toggleDropdown(link.name)}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <link.icon size={18} className="text-primary" />
                                                        <span className="font-medium">{link.name}</span>
                                                    </div>
                                                    <ChevronDown
                                                        size={16}
                                                        className={cn(
                                                            'transition-transform duration-200 text-muted-foreground',
                                                            activeDropdown === link.name ? 'transform rotate-180' : ''
                                                        )}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {activeDropdown === link.name && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="ml-6 mt-1 pl-4 border-l border-primary/20"
                                                        >
                                                            {link.dropdownItems.map(item => (
                                                                <Link
                                                                    key={item.name}
                                                                    href={item.href}
                                                                    className="block py-2.5 pl-2 text-muted-foreground hover:text-primary transition-colors"
                                                                    onClick={closeMenu}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="flex items-center gap-2.5 py-3 px-4 rounded-lg hover:bg-muted/70 transition-colors"
                                                onClick={closeMenu}
                                            >
                                                <link.icon size={18} className="text-primary" />
                                                <span className="font-medium">{link.name}</span>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Mobile CTA */}
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <Link
                                    href="/login"
                                    className="py-3 text-center text-muted-foreground border border-border/50 rounded-lg hover:bg-muted/50 transition-colors font-medium"
                                    onClick={closeMenu}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/add"
                                    className="py-3 text-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md"
                                    onClick={closeMenu}
                                >
                                    Add Bot
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
