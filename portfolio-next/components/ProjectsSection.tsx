'use client';

import { useEffect, useState } from 'react';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string;
  category: string;
  featured: boolean;
  created_at: string;
}

const cats = [
  { key: 'all', en: 'All', es: 'Todos' },
  { key: 'fullstack', en: 'Full Stack', es: 'Full Stack' },
  { key: 'ai', en: 'AI', es: 'IA' },
  { key: 'frontend', en: 'Frontend', es: 'Frontend' },
  { key: 'devops', en: 'DevOps', es: 'DevOps' },
];

export default function ProjectsSection() {
  const { lang } = useLang();
  const [active, setActive] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CL', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return s;
    }
  };

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

        <AnimeWrapper delay={50}>
          <div className="flex flex-wrap gap-2 mb-10">
            {cats.map((c) => (
              <button
                key={c.key}
                onClick={() => { setActive(c.key); setExpanded(null); }}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  active === c.key
                    ? 'bg-[#1a1a2e] dark:bg-white text-white dark:text-[#1a1a2e]'
                    : 'bg-neutral-100 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/50'
                }`}
              >
                {c[lang]}
              </button>
            ))}
          </div>
        </AnimeWrapper>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#6366f1]/30 border-t-[#6366f1] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-neutral-500 text-center py-20">{lang === 'en' ? 'No projects yet.' : 'Aun no hay proyectos.'}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p, i) => {
              const isOpen = expanded === p.id;
              return (
                <AnimeWrapper key={p.id} delay={100 + i * 50} type="scale">
                  <div className="card group flex flex-col h-full cursor-pointer" onClick={() => setExpanded(isOpen ? null : p.id)}>
                    <div className={`${isOpen ? 'hidden' : 'flex'} flex-col h-full`}>
                      <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-[#6366f1]/5 via-[#6366f1]/10 to-transparent dark:from-[#6366f1]/10 dark:via-[#6366f1]/5 dark:to-transparent border border-neutral-200 dark:border-neutral-800 mb-4 flex items-center justify-center overflow-hidden">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#6366f1]/40 group-hover:text-[#6366f1]/70 group-hover:scale-110 transition-all duration-500">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-1.5 group-hover:text-[#6366f1] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {p.tags.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 3).map((t) => (
                          <span key={t} className="tag text-[10px]">{t}</span>
                        ))}
                        {p.tags.split(',').filter(Boolean).length > 3 && (
                          <span className="text-[10px] text-neutral-400">+{p.tags.split(',').filter(Boolean).length - 3}</span>
                        )}
                      </div>
                    </div>

                    <div className={`${isOpen ? 'flex' : 'hidden'} flex-col h-full`}>
                      <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-1">{p.title}</h3>
                      <p className="text-xs text-neutral-400 font-mono mb-3">{formatDate(p.created_at)}</p>
                      <div className={isOpen ? 'animate-fade-in' : ''}>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                          {p.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (
                            <span key={t} className="tag text-[10px]">{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono mb-4">
                          <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">{p.category}</span>
                          {p.featured && <span className="px-2 py-0.5 bg-[#6366f1]/10 text-[#6366f1] rounded">Featured</span>}
                        </div>
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
