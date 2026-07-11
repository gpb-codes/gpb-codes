'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useLang } from '@/context/LanguageContext';

const STACK = [
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'NestJS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
  { name: 'Go', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'TailwindCSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
];

const TYPING_ROLES = {
  en: ['Full Stack Developer', 'Backend Engineer', 'AI Enthusiast', 'Open Source Contributor'],
  es: ['Desarrollador Full Stack', 'Ingeniero Backend', 'Entusiasta de IA', 'Contribuidor Open Source'],
};

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-2xl md:text-3xl font-black text-[#1a1a2e] dark:text-white">
      {count}{suffix}
    </span>
  );
}

function TypingEffect({ texts, lang }: { texts: string[]; lang: 'en' | 'es' }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
          if (charIndex + 1 === currentText.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span className="text-[#6366f1]">
      {displayText}
      <span className="animate-pulse text-[#6366f1]">|</span>
    </span>
  );
}

export default function HeroSection() {
  const { lang } = useLang();
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [githubStats, setGithubStats] = useState({ repos: 0, followers: 0, stars: 0 });

  useEffect(() => {
    fetch('https://api.github.com/users/gpb-codes')
      .then((r) => r.json())
      .then((data) => {
        setGithubStats({
          repos: data.public_repos || 0,
          followers: data.followers || 0,
          stars: 0,
        });
      })
      .catch(() => {});

    fetch('https://api.github.com/users/gpb-codes/repos?per_page=100&sort=updated')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const totalStars = data.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
          setGithubStats((prev) => ({ ...prev, stars: totalStars }));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const opts = (d: number) => ({ opacity: [0, 1], translateY: [15, 0], duration: 600, delay: d, easing: 'easeOutExpo' as const });
    if (tagRef.current) anime({ targets: tagRef.current, ...opts(0) });
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      anime({ targets: chars, opacity: [0, 1], translateY: [40, 0], duration: 700, delay: anime.stagger(50, { start: 300 }), easing: 'easeOutExpo' });
    }
    if (subtitleRef.current) anime({ targets: subtitleRef.current, ...opts(900) });
    if (ctaRef.current) {
      const btns = ctaRef.current.querySelectorAll('.cta-btn');
      anime({ targets: btns, opacity: [0, 1], translateY: [15, 0], duration: 500, delay: anime.stagger(150, { start: 1100 }), easing: 'easeOutExpo' });
    }
    if (stackRef.current) anime({ targets: stackRef.current, ...opts(1500) });
    if (statsRef.current) anime({ targets: statsRef.current, ...opts(1800) });
  }, []);

  const title = 'Gabriel Pedreros';
  const badge = lang === 'en' ? 'Software Engineer' : 'Ingeniero Informatico';
  const highlight = lang === 'en' ? 'build products' : 'construyo productos';
  const sub = lang === 'en' ? 'that solve real problems' : 'que resuelven problemas reales';
  const viewProjects = lang === 'en' ? 'View Projects' : 'Ver Proyectos';
  const getInTouch = lang === 'en' ? 'Get in touch' : 'Contactame';
  const techLabel = lang === 'en' ? 'Tech' : 'Tecnologias';
  const reposLabel = lang === 'en' ? 'Repos' : 'Repositorios';
  const followersLabel = lang === 'en' ? 'Followers' : 'Seguidores';
  const starsLabel = lang === 'en' ? 'Stars' : 'Estrellas';

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 md:pt-24 relative overflow-hidden">
      <div className="container-main w-full">
        <div className="max-w-3xl">
          <div ref={tagRef} className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#6366f1]/20 bg-[#6366f1]/5 rounded-full text-[#6366f1] text-xs font-medium mb-6" style={{ opacity: 0 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
            {badge}
          </div>

          <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-5">
            {title.split('').map((ch, i) => (
              <span key={i} className="char" style={{ opacity: 0, display: ch === ' ' ? 'inline' : 'inline-block' }}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
            <br />
            <TypingEffect texts={TYPING_ROLES[lang]} lang={lang} />
          </h1>

          <p ref={subtitleRef} className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl mb-8" style={{ opacity: 0 }}>
            {lang === 'en' ? (
              <>Full Stack Developer crafting robust backend systems with <span className="text-[#1a1a2e] dark:text-white font-medium">NestJS</span> and <span className="text-[#1a1a2e] dark:text-white font-medium">Go</span>, blazing-fast frontends with <span className="text-[#1a1a2e] dark:text-white font-medium">Next.js</span> and <span className="text-[#1a1a2e] dark:text-white font-medium">TailwindCSS</span>, and data layers powered by <span className="text-[#1a1a2e] dark:text-white font-medium">MySQL</span>.</>
            ) : (
              <>Full Stack Developer creando backends robustos con <span className="text-[#1a1a2e] dark:text-white font-medium">NestJS</span> y <span className="text-[#1a1a2e] dark:text-white font-medium">Go</span>, frontends ultra-rapidos con <span className="text-[#1a1a2e] dark:text-white font-medium">Next.js</span> y <span className="text-[#1a1a2e] dark:text-white font-medium">TailwindCSS</span>, y capas de datos con <span className="text-[#1a1a2e] dark:text-white font-medium">MySQL</span>.</>
            )}
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-10">
            <a href="#projects" className="btn-primary cta-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              {viewProjects}
            </a>
            <a href="#contact" className="btn-outline cta-btn">{getInTouch}</a>
          </div>

          <div ref={statsRef} className="flex items-center gap-8 mb-10" style={{ opacity: 0 }}>
            <div className="flex flex-col items-center">
              <AnimatedCounter target={githubStats.repos} />
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono mt-1">{reposLabel}</span>
            </div>
            <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800" />
            <div className="flex flex-col items-center">
              <AnimatedCounter target={githubStats.followers} />
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono mt-1">{followersLabel}</span>
            </div>
            <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800" />
            <div className="flex flex-col items-center">
              <AnimatedCounter target={githubStats.stars} suffix="+" />
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono mt-1">{starsLabel}</span>
            </div>
          </div>

          <div ref={stackRef} className="flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">{techLabel}</span>
            <div className="flex gap-3">
              {STACK.map((s) => (
                <div key={s.name} className="group relative">
                  <img src={s.src} alt={s.name} width={22} height={22} loading="lazy" className="opacity-40 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-neutral-400 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
