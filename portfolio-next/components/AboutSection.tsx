'use client';

import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';

export default function AboutSection() {
  const { lang } = useLang();
  const l = lang === 'en' ? 'en' : 'es';

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{l === 'en' ? 'About' : 'Sobre mi'}</p>
          <h2 className="section-title">
            {l === 'en' ? 'Building with purpose' : 'Construyendo con proposito'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-8" />
        </AnimeWrapper>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <AnimeWrapper delay={100} className="md:col-span-3">
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>
                {l === 'en'
                  ? "I'm a Software Engineer who turns complex problems into clean, scalable solutions. My stack is precision-crafted: NestJS and Go on the backend, Next.js and TailwindCSS on the frontend, with MySQL powering the data layer."
                  : 'Soy Ingeniero Informatico que convierte problemas complejos en soluciones limpias y escalables. Mi stack esta disenado con precision: NestJS y Go en el backend, Next.js y TailwindCSS en el frontend, con MySQL en la capa de datos.'}
              </p>
              <p>
                {l === 'en'
                  ? 'I believe great software is built at the intersection of solid architecture, clean code, and user-centric design. Whether an AI agent, a productivity tool, or a full SaaS platform, I bring the same rigor and passion.'
                  : 'Creo que el gran software se construye en la interseccion de arquitectura solida, codigo limpio y diseno centrado en el usuario. Ya sea un agente de IA, una herramienta de productividad o una plataforma SaaS, pongo el mismo rigor y pasion.'}
              </p>
              <p>
                {l === 'en'
                  ? 'Currently exploring multi-agent systems, advanced RAG pipelines, and distributed architectures for local AI inference.'
                  : 'Actualmente explorando sistemas multi-agente, pipelines RAG avanzados y arquitecturas distribuidas para inferencia de IA local.'}
              </p>
            </div>
          </AnimeWrapper>

          <AnimeWrapper delay={200} className="md:col-span-2">
            <div className="card space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono mb-1">
                  {l === 'en' ? 'Location' : 'Ubicacion'}
                </p>
                <p className="text-sm font-medium">Santiago, Chile</p>
              </div>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono mb-1">
                  {l === 'en' ? 'Focus' : 'Enfoque'}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(l === 'en'
                    ? ['Full Stack', 'AI Systems', 'Automation', 'Product Design', 'DevOps']
                    : ['Full Stack', 'Sistemas de IA', 'Automatizacion', 'Diseno de Producto', 'DevOps']
                  ).map((f) => (
                    <span key={f} className="tag">{f}</span>
                  ))}
                </div>
              </div>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono mb-1">
                  {l === 'en' ? 'Values' : 'Valores'}
                </p>
                <ul className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                  {(l === 'en'
                    ? ['Clean code over clever code', 'Automate everything repetitive', 'Learn by building', 'Open source by default']
                    : ['Codigo limpio sobre codigo ingenioso', 'Automatizar todo lo repetitivo', 'Aprender construyendo', 'Open source por defecto']
                  ).map((v) => (
                    <li key={v} className="flex items-center gap-2">
                      <svg width="4" height="4" viewBox="0 0 4 4" fill="#6366f1"><circle cx="2" cy="2" r="2" /></svg>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimeWrapper>
        </div>
      </div>
    </section>
  );
}
