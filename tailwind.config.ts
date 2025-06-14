import type { Config } from 'tailwindcss'

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                'background': 'var(--background)',
                'foreground': 'var(--foreground)',
                'primary': 'var(--primary)',
                'primary-foreground': 'var(--primary-foreground)',
                'secondary': 'var(--secondary)',
                'secondary-foreground': 'var(--secondary-foreground)',
                'accent': 'var(--accent)',
                'accent-foreground': 'var(--accent-foreground)',
                'muted': 'var(--muted)',
                'muted-foreground': 'var(--muted-foreground)',
                'card': 'var(--card)',
                'card-foreground': 'var(--card-foreground)',
                'border': 'var(--border)',
                'input': 'var(--input)'
            },
            borderRadius: {
                lg: '0.5rem',
                md: 'calc(0.5rem - 2px)',
                sm: 'calc(0.5rem - 4px)'
            },
            animation: {
                'blob-slow': 'blob 20s infinite ease-in-out',
                'wave': 'wave 6s ease-in-out infinite'
            },
            keyframes: {
                blob: {
                    '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
                    '50%': { transform: 'scale(1.1) translate(10px, -10px)' }
                },
                wave: {
                    '0%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(-2%)' },
                    '100%': { transform: 'translateX(0)' }
                }
            }
        }
    },
    plugins: []
} satisfies Config
