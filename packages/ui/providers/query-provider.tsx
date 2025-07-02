'use client'

import React, { useState } from 'react'
import { QueryClientProvider, queryClient } from '@byteutils/tanstack/react-query-client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type QueryProviderProps = {
    children: React.ReactNode
    enableDevTools?: boolean
}

export function QueryProvider({
    children,
    enableDevTools = process.env.NODE_ENV === 'development'
}: {
    children: React.ReactNode
}) {
    const [client] = useState(() => queryClient)

    return (
        <QueryClientProvider client={client}>
            {children}
            {enableDevTools && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    )
}
