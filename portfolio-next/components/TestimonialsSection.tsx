'use client';

import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';

const TESTIMONIALS = {
  en: [
    {
      quote: 'Gabriel delivered a robust backend architecture that scaled effortlessly. His deep understanding of NestJS and microservices was evident from day one.',
      author: 'Carlos Mendez',
      role: 'CTO, TechFlow',
    },
    {
      quote: 'Working with Gabriel on our AI agent was a game-changer. He designed the RAG pipeline and integrated it with WhatsApp flawlessly.',
      author: 'Ana Silva',
      role: 'Product Manager, DataSync',
    },
    {
      quote: 'Gabriel brings both precision and creativity. His Next.js frontends are fast, accessible, and beautiful. Highly recommend.',
      author: 'Diego Rojas',
      role: 'Lead Designer, PixelStudio',
    },
  ],
  es: [
    {
      quote: 'Gabriel entrego una arquitectura backend robusta que escalo sin esfuerzo. Su profundo conocimiento de NestJS y microservicios fue evidente desde el primer dia.',
      author: 'Carlos Mendez',
      role: 'CTO, TechFlow',
    },
    {
      quote: 'Trabajar con Gabriel en nuestro agente de IA fue transformador. Diseno el pipeline RAG y lo integro con WhatsApp a la perfeccion.',
      author: 'Ana Silva',
      role: 'Product Manager, DataSync',
    },
    {
      quote: 'Gabriel combina precision y creatividad. Sus frontends en Next.js son rapidos, accesibles y hermosos. Altamente recomendado.',
      author: 'Diego Rojas',
      role: 'Lead Designer, PixelStudio',
    },
  ],
};

export default function TestimonialsSection() {
  const { lang } = useLang();
  const testimonials = TESTIMONIALS[lang];

  return (
    <section className="py-20 md:py-28">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{lang === 'en' ? 'Testimonials' : 'Testimonios'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'What people say' : 'Lo que dicen de mi'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-12" />
        </AnimeWrapper>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <AnimeWrapper key={i} delay={100 + i * 100}>
              <div className="card flex flex-col h-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#6366f1]/30 mb-4">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-auto">
                  <p className="text-sm font-semibold text-[#1a1a2e] dark:text-white">{t.author}</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">{t.role}</p>
                </div>
              </div>
            </AnimeWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
