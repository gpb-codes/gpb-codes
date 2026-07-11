'use client';

import { useState } from 'react';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import CERTIFICATIONS_DATA from '@/data/certifications.json';

export type Certification = (typeof CERTIFICATIONS_DATA)[number];

const CATEGORY_LABELS: Record<string, { en: string; es: string }> = {
  cloud: { en: 'Cloud', es: 'Nube' },
  programming: { en: 'Programming', es: 'Programacion' },
  ai: { en: 'AI & ML', es: 'IA y ML' },
  devops: { en: 'DevOps', es: 'DevOps' },
  general: { en: 'General', es: 'General' },
};

const CATEGORY_COLORS: Record<string, string> = {
  cloud: '#FF9900',
  programming: '#3178c6',
  ai: '#76b900',
  devops: '#2496ED',
  general: '#6366f1',
};

export default function CertificationsSection() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Object.keys(CATEGORY_LABELS).filter((cat) =>
    CERTIFICATIONS_DATA.some((c) => c.category === cat)
  );

  const filtered = activeCategory
    ? CERTIFICATIONS_DATA.filter((c) => c.category === activeCategory)
    : CERTIFICATIONS_DATA;

  return (
    <section id="certifications" className="py-20 md:py-28">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{t.certifications?.label?.[lang] ?? 'Certifications'}</p>
          <h2 className="section-title">
            {t.certifications?.title?.[lang] ?? 'Continuous learning.'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-8" />
        </AnimeWrapper>

        <AnimeWrapper delay={80}>
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 border ${
                !activeCategory
                  ? 'bg-[#6366f1] text-white border-transparent'
                  : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
              }`}
            >
              {t.certifications?.all?.[lang] ?? 'All'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'border-transparent text-white'
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                }`}
                style={activeCategory === cat ? { backgroundColor: CATEGORY_COLORS[cat] } : {}}
              >
                {CATEGORY_LABELS[cat][lang]}
              </button>
            ))}
          </div>
        </AnimeWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cert, i) => (
            <AnimeWrapper key={cert.id} delay={i * 60} type="stagger">
              <div className="group card h-full flex flex-col hover:border-[#6366f1]/30 dark:hover:border-[#6366f1]/30 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${CATEGORY_COLORS[cert.category]}15` }}
                  >
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#1a1a2e] dark:text-white group-hover:text-[#6366f1] transition-colors leading-snug">
                      {cert.name[lang]}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 mb-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {cert.date}
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[cert.category]}15`,
                      color: CATEGORY_COLORS[cert.category],
                    }}
                  >
                    {CATEGORY_LABELS[cert.category][lang]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800/50">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="tag text-[10px]">
                      {skill}
                    </span>
                  ))}
                </div>

                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#6366f1] hover:underline"
                  >
                    {t.certifications?.view_credential?.[lang] ?? 'View credential'}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
              </div>
            </AnimeWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
