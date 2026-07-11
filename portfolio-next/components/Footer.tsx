'use client';

import { useLang } from '@/context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const NAV_LINKS = [
  { href: '#hero', label: { en: 'Home', es: 'Inicio' } },
  { href: '#about', label: { en: 'About', es: 'Sobre mi' } },
  { href: '#work', label: { en: 'Skills', es: 'Habilidades' } },
  { href: '#experience', label: { en: 'Experience', es: 'Experiencia' } },
  { href: '#projects', label: { en: 'Projects', es: 'Proyectos' } },
  { href: '#contact', label: { en: 'Contact', es: 'Contacto' } },
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/gpb-codes',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 12.675.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.975.105-.75.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gabriel-pedreros-995935364',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#0a0a0f]/50">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a2e] dark:text-white mb-3">Gabriel Pedreros</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
              {lang === 'en'
                ? 'Full Stack Developer building robust systems and beautiful interfaces.'
                : 'Desarrollador Full Stack construyendo sistemas robustos e interfaces hermosas.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono mb-3">
              {lang === 'en' ? 'Navigation' : 'Navegacion'}
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-[#6366f1] dark:hover:text-[#6366f1] transition-colors duration-200">
                    {link.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono mb-3">
              {lang === 'en' ? 'Connect' : 'Conectar'}
            </h4>
            <div className="flex gap-3 mb-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-[#6366f1]/10 hover:text-[#6366f1] transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <LanguageToggle />
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
            &copy; {new Date().getFullYear()} Gabriel Pedreros &mdash; {lang === 'en' ? 'Built with Next.js + TailwindCSS' : 'Hecho con Next.js + TailwindCSS'}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
              {lang === 'en' ? 'Always building' : 'Siempre construyendo'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
