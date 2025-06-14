/**
 * ============================================================
 * @name Orbiplex
 * @descroption The sleek, stylish, modern and powerful listing platform.
 * @copyright Copyright (C) 2025 ByteBrush Studios.
 * @license AGPL-3.0
 * ============================================================
 */

import "@byteui/styles/globals.css";
import "@byteui/styles/bg-gradients.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@byteui/themes/provider";
import { ThemeInitializer } from "@byteui/themes/initializer";
import { ColorSchemeProvider } from "@byteui/themes/color-schemes/provider";

import { siteConfig } from "@byteconfigs/site.cfg";
import { keywords } from "@byteutils/constants/keywords";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.metaTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    description: siteConfig.description,
    creators: ["@CodeMeAPixel"],
    images: "/og-image.png",
    locale: "en_US",
    url: siteConfig.url,

  },
  twitter: {
    title: siteConfig.name,
    card: "summary_large_image",
    creator: "@ByteBrushStudios",
    description: siteConfig.description,
    images: "/og-image.png",
    site: siteConfig.url,
  },
  keywords: keywords,
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ColorSchemeProvider defaultColorScheme="purple">
            <ThemeInitializer />
            {children}
          </ColorSchemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
