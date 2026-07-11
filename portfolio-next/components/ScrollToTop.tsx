'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scroll}
      className={`fixed bottom-6 left-6 z-50 w-11 h-11 rounded-xl bg-white dark:bg-[#12121a] border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 shadow-lg hover:-translate-y-0.5 hover:text-[#6366f1] hover:border-[#6366f1]/50 hover:shadow-[#6366f1]/10 transition-all duration-300 flex items-center justify-center ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
