import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryProvider } from '@/components/query-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokédex | Explore the World of Pokémon',
  description: 'A modern, interactive Pokédex built with Next.js, React, and Three.js. Explore all Pokémon with beautiful animations and 3D visuals.',
  keywords: ['Pokemon', 'Pokedex', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'Pokedex App' }],
  openGraph: {
    title: 'Pokédex | Explore the World of Pokémon',
    description: 'A modern, interactive Pokédex built with Next.js',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <div className="container py-6 md:py-10">{children}</div>
              </main>
              <Footer />
            </div>
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}