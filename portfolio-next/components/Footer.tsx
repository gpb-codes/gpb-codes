'use client';

import { useLang } from '@/context/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="py-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
            &copy; {new Date().getFullYear()} Gabriel Pedreros &mdash; {lang === 'en' ? 'Built with Next.js + TailwindCSS' : 'Hecho con Next.js + TailwindCSS'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
            {lang === 'en' ? 'Always building' : 'Siempre construyendo'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
