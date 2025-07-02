'use client'

import React from 'react'
import { ThemeProvider } from '../themes/provider'
import { ColorSchemeProvider } from '../themes/color-schemes/provider'
import { QueryProvider } from './query-provider'

interface ProvidersProps {
    children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <QueryProvider>
            <ThemeProvider>
                <ColorSchemeProvider>{children}</ColorSchemeProvider>
            </ThemeProvider>
        </QueryProvider>
    )
}
