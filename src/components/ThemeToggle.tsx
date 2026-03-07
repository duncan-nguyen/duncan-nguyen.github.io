'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-300 dark:border-white/50 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black">
                <span className="opacity-0">T</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-300 dark:border-white/50 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'dark' ? (
                <Sun size={18} className="transition-transform rotate-0 scale-100" />
            ) : (
                <Moon size={18} className="transition-transform rotate-0 scale-100" />
            )}
        </button>
    );
}
