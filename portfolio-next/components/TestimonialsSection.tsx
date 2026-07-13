'use client';

import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import TESTIMONIALS_DATA from '@/data/testimonials.json';

interface Testimonial {
  id: number;
  quote: { en: string; es: string };
  author: string;
  role: { en: string; es: string };
}

const TESTIMONIALS: Testimonial[] = TESTIMONIALS_DATA as Testimonial[];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getAvatarColor(name: string) {
  const colors = [
    ['#6366f1', '#818cf8'],
    ['#8b5cf6', '#a78bfa'],
    ['#ec4899', '#f472b6'],
    ['#06b6d4', '#22d3ee'],
    ['#f59e0b', '#fbbf24'],
    ['#10b981', '#34d399'],
    ['#ef4444', '#f87171'],
  ];
  const idx = hashCode(name) % colors.length;
  return colors[idx];
}

export default function TestimonialsSection() {
  const { lang } = useLang();

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{t.testimonials?.label?.[lang] ?? 'Testimonials'}</p>
          <h2 className="section-title">
            {t.testimonials?.title?.[lang] ?? 'What people say'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-12" />
        </AnimeWrapper>

        {TESTIMONIALS.length === 0 ? (
          <AnimeWrapper delay={80}>
            <p className="text-center text-neutral-400 dark:text-neutral-500 text-sm py-12">
              {t.testimonials?.empty?.[lang] ?? 'No testimonials yet.'}
            </p>
          </AnimeWrapper>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => {
              const [c1, c2] = getAvatarColor(item.author);
              return (
                <AnimeWrapper key={item.id} delay={100 + i * 100}>
                  <div className="group relative bg-white dark:bg-[#12121a] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/5 dark:hover:shadow-[#6366f1]/5 hover:-translate-y-1 hover:border-[#6366f1]/20 dark:hover:border-[#6366f1]/20">
                    {/* Decorative gradient corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6366f1]/5 to-transparent rounded-tr-2xl rounded-bl-full pointer-events-none" />

                    {/* Quote icon */}
                    <div className="relative mb-5">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#6366f1]/10 group-hover:bg-[#6366f1]/15 transition-colors duration-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#6366f1]">
                          <path d="M10 8c-1.1 0-2 .9-2 2v4h4v-4H8c0-1.1.9-2 2-2V6c-2.2 0-4 1.8-4 4v8h8v-8c0-1.1-.9-2-2-2z" fill="currentColor" opacity="0.3" />
                          <path d="M20 8c-1.1 0-2 .9-2 2v4h4v-4h-4c0-1.1.9-2 2-2V6c-2.2 0-4 1.8-4 4v8h8v-8c0-1.1-.9-2-2-2z" fill="currentColor" opacity="0.6" />
                        </svg>
                      </div>
                    </div>

                    {/* Quote text */}
                    <p className="text-sm md:text-[13px] text-neutral-600 dark:text-neutral-400 leading-[1.75] mb-6 flex-1 relative">
                      &ldquo;{item.quote[lang]}&rdquo;
                    </p>

                    {/* Author info */}
                    <div className="flex items-center gap-3 pt-5 border-t border-neutral-100 dark:border-neutral-800/80">
                      {/* Avatar */}
                      <div
                        className="relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                      >
                        {getInitials(item.author)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1a1a2e] dark:text-white truncate">{item.author}</p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate mt-0.5">{item.role[lang]}</p>
                      </div>
                    </div>
                  </div>
                </AnimeWrapper>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
