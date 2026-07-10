'use client';

import { useState } from 'react';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';
import { projects, type Project } from '@/lib/projects';

const catLabels: Record<string, { en: string; es: string }> = {
  all: { en: 'All', es: 'Todos' },
  fullstack: { en: 'Full Stack', es: 'Full Stack' },
  ai: { en: 'AI', es: 'IA' },
  frontend: { en: 'Frontend', es: 'Frontend' },
  backend: { en: 'Backend', es: 'Backend' },
  devops: { en: 'DevOps', es: 'DevOps' },
  mobile: { en: 'Mobile', es: 'Movil' },
  other: { en: 'Other', es: 'Otros' },
};

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'in-progress': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  archived: 'bg-neutral-500/10 text-neutral-500 dark:text-neutral-400',
};

const statusLabels: Record<string, { en: string; es: string }> = {
  completed: { en: 'Completed', es: 'Completado' },
  'in-progress': { en: 'In Progress', es: 'En Progreso' },
  archived: { en: 'Archived', es: 'Archivado' },
};

function EmptyState({ lang }: { lang: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#6366f1]/60">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-2">
        {lang === 'en' ? 'No projects yet' : 'Aun no hay proyectos'}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
        {lang === 'en'
          ? 'Add your projects to data/projects.json to see them here.'
          : 'Agrega tus proyectos en data/projects.json para verlos aqui.'}
      </p>
      <code className="mt-4 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/60 rounded-lg text-xs font-mono text-neutral-500 dark:text-neutral-400">
        portfolio-next/data/projects.json
      </code>
    </div>
  );
}

export default function ProjectsSection() {
  const { lang } = useLang();
  const [active, setActive] = useState('all');
  const [expanded, setExpanded] = useState<number | null>(null);

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{lang === 'en' ? 'Projects' : 'Proyectos'}</p>
          <h2 className="section-title">
            {lang === 'en' ? "Things I've built" : 'Lo que he construido'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-6" />
        </AnimeWrapper>

        {projects.length > 0 && (
          <AnimeWrapper delay={50}>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setActive(c); setExpanded(null); }}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    active === c
                      ? 'bg-[#1a1a2e] dark:bg-white text-white dark:text-[#1a1a2e]'
                      : 'bg-neutral-100 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/50'
                  }`}
                >
                  {catLabels[c]?.[lang as 'en' | 'es'] ?? c}
                </button>
              ))}
            </div>
          </AnimeWrapper>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 && <EmptyState lang={lang} />}

          {filtered.map((p, i) => {
            const isOpen = expanded === p.id;
            return (
              <AnimeWrapper key={p.id} delay={100 + i * 50} type="scale">
                <div
                  className="card group flex flex-col h-full cursor-pointer"
                  onClick={() => setExpanded(isOpen ? null : p.id)}
                >
                  {/* Collapsed view */}
                  <div className={`${isOpen ? 'hidden' : 'flex'} flex-col h-full`}>
                    <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-[#6366f1]/5 via-[#6366f1]/10 to-transparent dark:from-[#6366f1]/10 dark:via-[#6366f1]/5 dark:to-transparent border border-neutral-200 dark:border-neutral-800 mb-4 flex items-center justify-center overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#6366f1]/40 group-hover:text-[#6366f1]/70 group-hover:scale-110 transition-all duration-500">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white group-hover:text-[#6366f1] transition-colors">
                        {p.title}
                      </h3>
                      {p.featured && (
                        <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-[#6366f1]/10 text-[#6366f1] rounded">
                          {lang === 'en' ? 'Featured' : 'Destacado'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                      {lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="tag text-[10px]">{t}</span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="text-[10px] text-neutral-400">+{p.tags.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Expanded view */}
                  <div className={`${isOpen ? 'flex' : 'hidden'} flex-col h-full`}>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white">{p.title}</h3>
                      {p.featured && (
                        <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-[#6366f1]/10 text-[#6366f1] rounded">
                          {lang === 'en' ? 'Featured' : 'Destacado'}
                        </span>
                      )}
                    </div>

                    <div className={isOpen ? 'animate-fade-in' : ''}>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                        {lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags.map((t) => (
                          <span key={t} className="tag text-[10px]">{t}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono mb-4">
                        <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">
                          {catLabels[p.category]?.[lang as 'en' | 'es'] ?? p.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded ${statusColors[p.status]}`}>
                          {statusLabels[p.status]?.[lang as 'en' | 'es'] ?? p.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6366f1] hover:underline"
                          >
                            {lang === 'en' ? 'View project' : 'Ver proyecto'}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                          </a>
                        )}
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-[#6366f1] transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimeWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
