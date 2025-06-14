/**
 * ============================================================
 * @name Orbiplex
 * @descroption The sleek, stylish, modern and powerful listing platform.
 * @copyright Copyright (C) 2025 ByteBrush Studios.
 * @license AGPL-3.0
 * ============================================================
 */

import '@byteui/styles/bg-gradients.css'
import '@byteui/styles/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@byteui/themes/provider'
import { ThemeInitializer } from '@byteui/themes/initializer'
import { ColorSchemeProvider } from '@byteui/themes/color-schemes/provider'

import { siteConfig } from '@byteconfigs/site.cfg'
import { keywords } from '@byteutils/constants/keywords'
import ModernHeader from '@/packages/ui/components/static/headerr'
import Footer from '@/packages/ui/components/static/footer'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: {
        default: siteConfig.metaTitle,
        template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    openGraph: {
        siteName: siteConfig.name,
        description: siteConfig.description,
        creators: ['@CodeMeAPixel'],
        images: '/og-image.png',
        locale: 'en_US',
        url: siteConfig.url
    },
    twitter: {
        title: siteConfig.name,
        card: 'summary_large_image',
        creator: '@ByteBrushStudios',
        description: siteConfig.description,
        images: '/og-image.png',
        site: siteConfig.url
    },
    keywords: keywords,
    icons: { icon: '/favicon.ico' }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                function getTheme() {
                  const storedTheme = localStorage.getItem('theme')
                  if (storedTheme) return storedTheme
                  
                  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
                  return prefersLight ? 'light' : 'dark'
                }
                
                document.documentElement.classList.add(getTheme())
              })()
            `
                    }}
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <ColorSchemeProvider defaultColorScheme="purple">
                        <ThemeInitializer />
                        <div className="flex flex-col min-h-screen">
                            <ModernHeader />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                    </ColorSchemeProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
