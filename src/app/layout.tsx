import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({
    weight: ['500', '700'],
    subsets: ['latin'],
    variable: '--font-heading'
});

export const metadata: Metadata = {
    metadataBase: new URL('https://duncan-nguyen.github.io'),
    title: 'NGUYEN QUANG DUNG | AI/ML Engineer',
    description: 'Portfolio of Nguyen Quang Dung — AI/ML Engineer specializing in Agentic AI, LLM/SLM Fine-tuning, and Physics-Informed ML.',
    keywords: 'Nguyen Quang Dung, AI Engineer, ML Engineer, Agentic AI, Physics-Informed ML, NLP, LLM, Portfolio',
    openGraph: {
        type: 'website',
        url: 'https://duncan-nguyen.github.io/',
        title: 'NGUYEN QUANG DUNG | AI/ML Engineer',
        description: 'AI/ML Engineer specializing in Agentic AI, LLM/SLM Fine-tuning, and Physics-Informed Machine Learning.',
        images: [{ url: 'https://duncan-nguyen.github.io/images/og-image.jpg' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NGUYEN QUANG DUNG | AI/ML Engineer',
        description: 'AI/ML Engineer specializing in Agentic AI, LLM/SLM Fine-tuning, and Physics-Informed Machine Learning.',
        images: ['https://duncan-nguyen.github.io/images/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://duncan-nguyen.github.io/',
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Nguyen Quang Dung",
        "jobTitle": "AI/ML Engineer",
        "url": "https://duncan-nguyen.github.io",
        "sameAs": [
            "https://linkedin.com/in/-duncan-nguyen",
            "https://github.com/nqdhocai"
        ]
    };

    return (
        <html lang="en" suppressHydrationWarning className={`scroll-smooth ${jakarta.variable} ${outfit.variable}`}>
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="font-sans antialiased bg-[#F9FAFB] dark:bg-[#121212] text-brand-charcoal dark:text-gray-200 pt-20 transition-colors duration-300">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
