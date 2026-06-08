'use client';

import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';

const EXPERIENCE = [
  {
    period: { en: '2025 - Present', es: '2025 - Presente' },
    role: { en: 'Practicante', es: 'Practicante' },
    company: { en: 'Oystech.lat / LAB.IA', es: 'Oystech.lat / LAB.IA' },
    desc: {
      en: 'Developing internal automation tools and AI solutions. Working with modern web technologies and learning production-grade software engineering practices.',
      es: 'Desarrollando herramientas de automatizacion interna y soluciones de IA. Trabajando con tecnologias web modernas y aprendiendo practicas de ingenieria de software en produccion.',
    },
  },
];

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
                    <span className="text-xs font-mono text-[#6366f1] font-medium tracking-wide">{exp.period[lang]}</span>
                    <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mt-1">{exp.role[lang]}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 mb-3">{exp.company[lang]}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{exp.desc[lang]}</p>
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
