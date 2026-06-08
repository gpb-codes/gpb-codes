'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function Header() {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV = [
    { label: lang === 'en' ? 'Work' : 'Trabajo', href: '#work' },
    { label: lang === 'en' ? 'Projects' : 'Proyectos', href: '#projects' },
    { label: lang === 'en' ? 'About' : 'Sobre mi', href: '#about' },
    { label: lang === 'en' ? 'Blog' : 'Blog', href: '/blog' },
    { label: lang === 'en' ? 'Contact' : 'Contacto', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 dark:bg-[#0a0a0f]/70 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        <a
          href="/"
          className="font-mono font-bold text-lg tracking-tight text-[#1a1a2e] dark:text-white hover:text-[#6366f1] dark:hover:text-[#6366f1] transition-colors"
        >
          GP<span className="text-[#6366f1]">.</span>
        </a>

        <nav className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:h-screen max-md:bg-white dark:max-md:bg-[#0a0a0f] max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-8 max-md:transition-all max-md:duration-300 max-md:z-40 ${open ? 'max-md:flex' : 'max-md:hidden'} flex items-center gap-6`}>
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-[#1a1a2e] dark:hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#6366f1] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 w-8 h-8 flex items-center justify-center text-neutral-700 dark:text-neutral-300"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-5 h-[2px] bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <span className={`block w-5 h-[2px] bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
