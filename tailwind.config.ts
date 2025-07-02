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
                'background-rgb': 'rgb(var(--background-rgb))',
                'foreground': 'var(--foreground)',
                'foreground-rgb': 'rgb(var(--foreground-rgb))',
                'primary': 'var(--primary)',
                'primary-rgb': 'rgb(var(--primary-rgb))',
                'primary-foreground': 'var(--primary-foreground)',
                'secondary': 'var(--secondary)',
                'secondary-foreground': 'var(--secondary-foreground)',
                'accent': 'var(--accent)',
                'accent-rgb': 'rgb(var(--accent-rgb))',
                'accent-foreground': 'var(--accent-foreground)',
                'muted': 'var(--muted)',
                'muted-foreground': 'var(--muted-foreground)',
                'card': 'var(--card)',
                'card-rgb': 'rgb(var(--card-rgb))',
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
                'wave': 'wave 6s ease-in-out infinite',
                'drawer': 'drawer 0.3s ease-in-out',
                'theme-transition': 'theme-transition 0.3s ease-in-out',
                'color-shift': 'color-shift 0.5s ease-in-out'
            },
            keyframes: {
                'blob': {
                    '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
                    '50%': { transform: 'scale(1.1) translate(10px, -10px)' }
                },
                'wave': {
                    '0%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(-2%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                'drawer': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' }
                },
                'theme-transition': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                'color-shift': {
                    '0%': { opacity: '0.8' },
                    '50%': { opacity: '1' },
                    '100%': { opacity: '0.8' }
                }
            }
        }
    },
    plugins: []
} satisfies Config
