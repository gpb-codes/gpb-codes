'use client';

import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';
import experienceData from '@/data/experience.json';

const EXPERIENCE = experienceData as Array<{
  period: { en: string; es: string };
  role: { en: string; es: string };
  company: { en: string; es: string };
  desc: { en: string; es: string };
  tags?: string[];
}>;

export default function ExperienceSection() {
  const { lang } = useLang();

  return (
    <section id="experience" className="py-20 md:py-28 bg-neutral-50/50 dark:bg-[#0d0d14]/50">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{lang === 'en' ? 'Experience' : 'Experiencia'}</p>
          <h2 className="section-title">
            {lang === 'en' ? "Where I've worked" : 'Donde he trabajado'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-12" />
        </AnimeWrapper>

        <div className="relative">
          <div className="hidden md:block absolute left-[7px] top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800" />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <AnimeWrapper key={i} delay={100 + i * 100}>
                <div className="relative pl-0 md:pl-8">
                  <div className="hidden md:block absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-[#6366f1] bg-white dark:bg-[#0a0a0f] z-10" />
                  <div className="card">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 mb-1">
                      <span className="text-xs font-mono text-[#6366f1] font-medium tracking-wide">{exp.period[lang]}</span>
                      <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{exp.company[lang]}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mt-1">{exp.role[lang]}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mt-2 mb-3">{exp.desc[lang]}</p>
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="tag text-[10px]">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimeWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
