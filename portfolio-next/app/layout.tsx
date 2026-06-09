import type { Metadata } from 'next';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Gabriel Pedreros | Ingeniero Informatico',
  description:
    'Full Stack Developer especializado en NestJS, Next.js, Golang y TailwindCSS. Construyo productos digitales, automatizaciones y soluciones de IA.',
  keywords: 'gabriel pedreros, full stack developer, nestjs, next.js, golang, tailwindcss, portfolio',
  openGraph: {
    title: 'Gabriel Pedreros | Portfolio',
    description: 'Ingeniero Informatico & Full Stack Developer',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
