    'use client'

    import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

    type Theme = 'dark' | 'light'

    export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme | null
        const initialTheme: Theme = saved === 'light' ? 'light' : 'dark'

        document.documentElement.classList.remove('light')
        if (initialTheme === 'light') {
        document.documentElement.classList.add('light')
        }

        setTheme(initialTheme)
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

        document.documentElement.classList.remove('light')
        if (nextTheme === 'light') {
        document.documentElement.classList.add('light')
        }

        localStorage.setItem('theme', nextTheme)
        setTheme(nextTheme)
    }

    if (!mounted) return null

    return (
        <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="nav-glow flex h-11 w-11 items-center justify-center rounded-xl text-main"
        >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
    }