'use client';

import { useState } from 'react';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const SKILLS = [
  {
    categoryKey: 'backend',
    label: { en: 'Backend', es: 'Backend' },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    ),
    items: [
      { name: 'NestJS', icon: `${DEVICON_BASE}/nestjs/nestjs-original.svg`, desc: { en: 'Modular monoliths, microservices, REST & GraphQL APIs with built-in dependency injection.', es: 'Monolitos modulares, microservicios, APIs REST y GraphQL con inyeccion de dependencias incorporada.' } },
      { name: 'Go', icon: `${DEVICON_BASE}/go/go-original.svg`, desc: { en: 'High-performance APIs, CLI tools, concurrent systems with goroutines and channels.', es: 'APIs de alto rendimiento, herramientas CLI, sistemas concurrentes con goroutines y canales.' } },
      { name: 'Node.js', icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg`, desc: { en: 'Event-driven architecture, real-time apps, streams, and serverless functions.', es: 'Arquitectura dirigida por eventos, apps en tiempo real, streams y funciones serverless.' } },
    ],
  },
  {
    categoryKey: 'frontend',
    label: { en: 'Frontend', es: 'Frontend' },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
    ),
    items: [
      { name: 'Next.js', icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg`, desc: { en: 'App Router, SSR, ISR, full-stack apps with server components and API routes.', es: 'App Router, SSR, ISR, apps full-stack con server components y API routes.' } },
      { name: 'React', icon: `${DEVICON_BASE}/react/react-original.svg`, desc: { en: 'SPAs, hooks, context, component libraries, and state management.', es: 'SPAs, hooks, context, librerias de componentes y manejo de estado.' } },
      { name: 'TailwindCSS', icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`, desc: { en: 'Utility-first responsive design, custom design systems, dark mode, animations.', es: 'Diseno responsive utility-first, sistemas de diseno personalizados, modo oscuro, animaciones.' } },
      { name: 'TypeScript', icon: `${DEVICON_BASE}/typescript/typescript-original.svg`, desc: { en: 'Type-safe code with generics, advanced patterns, and full IDE support.', es: 'Codigo type-safe con genericos, patrones avanzados y soporte completo de IDE.' } },
    ],
  },
  {
    categoryKey: 'mobile',
    label: { en: 'Mobile', es: 'Desarrollo Movil' },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
    ),
    items: [
      { name: 'Flutter', icon: `${DEVICON_BASE}/flutter/flutter-original.svg`, desc: { en: 'Cross-platform apps for Android, iOS, Web, Windows, macOS and Linux.', es: 'Aplicaciones multiplataforma para Android, iOS, Web, Windows, macOS y Linux.' } },
      { name: 'Dart', icon: `${DEVICON_BASE}/dart/dart-original.svg`, desc: { en: 'Modern language for building performant cross-platform applications.', es: 'Lenguaje moderno para desarrollar aplicaciones multiplataforma de alto rendimiento.' } },
      { name: 'Android', icon: `${DEVICON_BASE}/android/android-original.svg`, desc: { en: 'Android SDK integration, permissions, notifications and native features.', es: 'Integracion con Android SDK, permisos, notificaciones y caracteristicas nativas.' } },
    ],
  },
  {
    categoryKey: 'devops',
    label: { en: 'Cloud & DevOps', es: 'Cloud y DevOps' },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
    ),
    items: [
      { name: 'Docker', icon: `${DEVICON_BASE}/docker/docker-original.svg`, desc: { en: 'Containerization, multi-stage builds, Docker Compose, and container orchestration.', es: 'Contenerizacion, builds multi-etapa, Docker Compose y orquestacion de contenedores.' } },
      { name: 'GitHub Actions', icon: `${DEVICON_BASE}/github/github-original.svg`, desc: { en: 'CI/CD pipelines, automated testing, deployment automation, and workflow orchestration.', es: 'Pipelines CI/CD, testing automatizado, automatizacion de depliegues y orquestacion de workflows.' } },
      { name: 'Cloudflare', icon: `${DEVICON_BASE}/cloudflare/cloudflare-original.svg`, desc: { en: 'Pages, Workers, DNS management, CDN, DDoS protection, and edge functions.', es: 'Pages, Workers, gestion de DNS, CDN, proteccion DDoS y funciones edge.' } },
      { name: 'Git', icon: `${DEVICON_BASE}/git/git-original.svg`, desc: { en: 'Version control, collaborative workflows, and source code management.', es: 'Control de versiones, flujos colaborativos y gestion del codigo fuente.' } },
      { name: 'Linux', icon: `${DEVICON_BASE}/linux/linux-original.svg`, desc: { en: 'Arch Linux, shell scripting, server administration, and development environments.', es: 'Arch Linux, scripting shell, administracion de servidores y entornos de desarrollo.' } },
    ],
  },
  {
    categoryKey: 'data-ai',
    label: { en: 'Data & AI', es: 'Datos e IA' },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
    ),
    items: [
      { name: 'PostgreSQL', icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg`, desc: { en: 'Advanced SQL, JSONB, indexing, full-text search and pgvector.', es: 'SQL avanzado, JSONB, indexacion, busqueda de texto completo y pgvector.' } },
      { name: 'MySQL', icon: `${DEVICON_BASE}/mysql/mysql-original.svg`, desc: { en: 'Relational databases, optimization and transactional systems.', es: 'Bases de datos relacionales, optimizacion y sistemas transaccionales.' } },
      { name: 'Redis', icon: `${DEVICON_BASE}/redis/redis-original.svg`, desc: { en: 'Caching, queues, pub/sub and in-memory data storage.', es: 'Cache, colas, pub/sub y almacenamiento en memoria.' } },
      { name: 'RAG & AI', icon: `${DEVICON_BASE}/python/python-original.svg`, desc: { en: 'LLMs, RAG, AI agents, embeddings, and intelligent automation.', es: 'LLMs, RAG, agentes de IA, embeddings y automatizacion inteligente.' } },
    ],
  },
];

function SkillIcon({ name, icon, desc, lang, active, onClick }: {
  name: string; icon: string; desc: { en: string; es: string }; lang: 'en' | 'es'; active: boolean; onClick: () => void;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          active
            ? 'bg-[#6366f1]/10 text-[#6366f1]'
            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
        }`}
      >
        <img src={icon} alt={name} width={20} height={20} className="shrink-0" />
        {name}
      </button>
      {active && (
        <div className="px-3 pb-3 pt-1.5 text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed animate-fade-in">
          {desc[lang]}
        </div>
      )}
    </div>
  );
}

export default function SkillsSection() {
  const { lang } = useLang();
  const [active, setActive] = useState<string | null>(null);

  const toggle = (name: string) => setActive(active === name ? null : name);

  return (
    <section id="work" className="py-20 md:py-28 bg-neutral-50/50 dark:bg-[#0d0d14]/50">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{lang === 'en' ? 'Expertise' : 'Experiencia'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Craft & stack' : 'Habilidades y stack'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-12" />
        </AnimeWrapper>

        <div className="grid md:grid-cols-2 gap-5">
          {SKILLS.map((cat) => (
            <AnimeWrapper key={cat.categoryKey} delay={100}>
              <div className="card">
                <h3 className="flex items-center gap-2 text-[#6366f1] text-xs uppercase tracking-widest font-mono mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                  {cat.icon}
                  {cat.label[lang]}
                </h3>
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                  {cat.items.map((skill) => (
                    <SkillIcon
                      key={skill.name}
                      {...skill}
                      lang={lang}
                      active={active === skill.name}
                      onClick={() => toggle(skill.name)}
                    />
                  ))}
                </div>
              </div>
            </AnimeWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
