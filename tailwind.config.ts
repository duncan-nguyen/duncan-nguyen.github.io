import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    charcoal: '#1a1a1a',
                    blue: '#0048ad',
                    softGray: '#f9f9f9',
                    border: '#e5e5e5',
                    dark: '#111111'
                }
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                heading: ['var(--font-heading)', 'sans-serif'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
