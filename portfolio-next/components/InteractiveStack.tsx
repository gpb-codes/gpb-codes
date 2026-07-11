'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

interface TechItem {
  name: string;
  icon: string;
  color: string;
  category: string;
  orbit: number;
  angle: number;
}

const TECH_ORBIT: TechItem[] = [
  { name: 'NestJS', icon: `${DEVICON_BASE}/nestjs/nestjs-original.svg`, color: '#e0234e', category: 'backend', orbit: 1, angle: 0 },
  { name: 'Go', icon: `${DEVICON_BASE}/go/go-original.svg`, color: '#00ADD8', category: 'backend', orbit: 1, angle: 72 },
  { name: 'Next.js', icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg`, color: '#ffffff', category: 'frontend', orbit: 1, angle: 144 },
  { name: 'React', icon: `${DEVICON_BASE}/react/react-original.svg`, color: '#61DAFB', category: 'frontend', orbit: 1, angle: 216 },
  { name: 'TypeScript', icon: `${DEVICON_BASE}/typescript/typescript-original.svg`, color: '#3178c6', category: 'frontend', orbit: 1, angle: 288 },
  { name: 'MySQL', icon: `${DEVICON_BASE}/mysql/mysql-original.svg`, color: '#4479A1', category: 'data', orbit: 2, angle: 0 },
  { name: 'Docker', icon: `${DEVICON_BASE}/docker/docker-original.svg`, color: '#2496ED', category: 'devops', orbit: 2, angle: 60 },
  { name: 'Node.js', icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg`, color: '#339933', category: 'backend', orbit: 2, angle: 120 },
  { name: 'TailwindCSS', icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`, color: '#06B6D4', category: 'frontend', orbit: 2, angle: 180 },
  { name: 'PostgreSQL', icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg`, color: '#4169E1', category: 'data', orbit: 2, angle: 240 },
  { name: 'GitHub Actions', icon: `${DEVICON_BASE}/github/github-original.svg`, color: '#2088FF', category: 'devops', orbit: 2, angle: 300 },
  { name: 'Cloudflare', icon: `${DEVICON_BASE}/cloudflare/cloudflare-original.svg`, color: '#F38020', category: 'devops', orbit: 3, angle: 0 },
  { name: 'Python', icon: `${DEVICON_BASE}/python/python-original.svg`, color: '#3776AB', category: 'data', orbit: 3, angle: 90 },
  { name: 'Linux', icon: `${DEVICON_BASE}/linux/linux-original.svg`, color: '#FCC624', category: 'devops', orbit: 3, angle: 180 },
  { name: 'Git', icon: `${DEVICON_BASE}/git/git-original.svg`, color: '#F05032', category: 'devops', orbit: 3, angle: 270 },
];

const CATEGORY_COLORS: Record<string, string> = {
  backend: '#e0234e',
  frontend: '#3178c6',
  data: '#4479A1',
  devops: '#2088FF',
};

const CATEGORY_LABELS: Record<string, { en: string; es: string }> = {
  backend: { en: 'Backend', es: 'Backend' },
  frontend: { en: 'Frontend', es: 'Frontend' },
  data: { en: 'Data & AI', es: 'Datos & IA' },
  devops: { en: 'DevOps', es: 'DevOps' },
};

const ORBIT_SPEEDS: Record<number, number> = { 1: 60, 2: 45, 3: 30 };

function getOrbitRadii(width: number) {
  const scale = Math.min(width / 680, 1);
  return { 1: 140 * scale, 2: 230 * scale, 3: 310 * scale };
}

export default function InteractiveStack() {
  const { lang } = useLang();
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(680);
  const [positions, setPositions] = useState<Map<number, { x: number; y: number }>>(new Map());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const orbitRadii = getOrbitRadii(containerWidth);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      if (!isPaused) {
        const now = Date.now();
        const newPositions = new Map<number, { x: number; y: number }>();
        TECH_ORBIT.forEach((tech) => {
          const radius = orbitRadii[tech.orbit as keyof typeof orbitRadii];
          const speed = ORBIT_SPEEDS[tech.orbit];
          const currentAngle = tech.angle + (now / (speed * 100)) % 360;
          const rad = (currentAngle * Math.PI) / 180;
          newPositions.set(tech.angle + tech.orbit * 1000, {
            x: Math.cos(rad) * radius,
            y: Math.sin(rad) * radius * 0.4,
          });
        });
        setPositions(newPositions);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, orbitRadii]);

  const filteredTech = selectedCategory
    ? TECH_ORBIT.filter((t) => t.category === selectedCategory)
    : TECH_ORBIT;

  const nodeSize = isMobile ? 36 : 44;

  return (
    <section id="stack" className="py-16 md:py-28 bg-neutral-50/50 dark:bg-[#0d0d14]/50">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{t.stack?.label?.[lang] ?? 'Tech Stack'}</p>
          <h2 className="section-title">
            {t.stack?.title?.[lang] ?? 'Tools I use.'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-6 md:mb-8" />
        </AnimeWrapper>

        <AnimeWrapper delay={100}>
          <div className="flex flex-wrap gap-2 mb-6 md:mb-10">
            {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-3 md:px-4 py-1.5 md:py-2 text-xs font-medium rounded-lg transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'border-transparent text-white'
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
                }`}
                style={selectedCategory === cat ? { backgroundColor: color } : {}}
              >
                {CATEGORY_LABELS[cat]?.[lang] ?? cat}
              </button>
            ))}
          </div>
        </AnimeWrapper>

        {/* 3D Orbit Container */}
        <div
          ref={containerRef}
          className="relative mx-auto overflow-hidden"
          style={{
            width: '100%',
            height: isMobile ? 220 : 340,
            perspective: isMobile ? 400 : 600,
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { setIsPaused(false); setHoveredTech(null); }}
        >
          {/* Glow backdrop */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{
              width: isMobile ? 160 : 280,
              height: isMobile ? 80 : 140,
              background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            }}
          />

          {/* Orbit rings with 3D perspective */}
          {[1, 2, 3].map((orbit) => {
            const r = orbitRadii[orbit as keyof typeof orbitRadii];
            return (
              <div
                key={orbit}
                className="absolute left-1/2 top-1/2 rounded-full border border-dashed transition-all duration-500"
                style={{
                  width: r * 2,
                  height: r * 0.8,
                  marginLeft: -r,
                  marginTop: -r * 0.4,
                  borderColor: selectedCategory
                    ? 'rgba(99,102,241,0.1)'
                    : `rgba(99,102,241,${0.08 + orbit * 0.06})`,
                  boxShadow: !selectedCategory
                    ? `0 0 ${8 + orbit * 4}px rgba(99,102,241,${0.03 + orbit * 0.02})`
                    : 'none',
                  transform: `rotateX(15deg) rotateZ(${isMobile ? 0 : 2}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              />
            );
          })}

          {/* Center core with 3D glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: isMobile ? 44 : 56,
                height: isMobile ? 44 : 56,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 30px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.15)',
              }}
            >
              <svg width={isMobile ? 18 : 24} height={isMobile ? 18 : 24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          </div>

          {/* Tech nodes with 3D transforms */}
          {filteredTech.map((tech) => {
            const key = tech.angle + tech.orbit * 1000;
            const pos = positions.get(key);
            if (!pos) return null;
            const isHovered = hoveredTech?.name === tech.name;
            const dimmed = (hoveredTech && !isHovered) || (selectedCategory && tech.category !== selectedCategory);

            return (
              <div
                key={`${tech.name}-${tech.orbit}-${tech.angle}`}
                className="absolute z-20 transition-all duration-300"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: `translate(-50%, -50%) scale3d(${dimmed ? 0.75 : 1}, ${dimmed ? 0.75 : 1}, ${dimmed ? 0.75 : 1})`,
                  opacity: dimmed ? (selectedCategory && tech.category !== selectedCategory ? 0.1 : 0.2) : 1,
                  willChange: 'left, top, transform',
                }}
              >
                <button
                  className="group relative"
                  onMouseEnter={() => setHoveredTech(tech)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div
                    className="rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      width: nodeSize,
                      height: nodeSize,
                      backgroundColor: `${tech.color}15`,
                      boxShadow: isHovered
                        ? `0 0 24px ${tech.color}50, 0 4px 12px ${tech.color}20`
                        : `0 2px 8px rgba(0,0,0,0.1)`,
                      transform: isHovered ? 'translateZ(10px)' : 'none',
                    }}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      width={isMobile ? 18 : 22}
                      height={isMobile ? 18 : 22}
                      className="pointer-events-none"
                    />
                  </div>

                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1a1a2e] dark:bg-white text-white dark:text-[#1a1a2e] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl z-30">
                      {tech.name}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a2e] dark:bg-white rotate-45" />
                    </div>
                  )}
                </button>
              </div>
            );
          })}

          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            {hoveredTech && filteredTech
              .filter((t) => t.category === hoveredTech.category && t.name !== hoveredTech.name)
              .map((t) => {
                const key1 = hoveredTech.angle + hoveredTech.orbit * 1000;
                const key2 = t.angle + t.orbit * 1000;
                const pos1 = positions.get(key1);
                const pos2 = positions.get(key2);
                if (!pos1 || !pos2) return null;
                const cx = containerWidth / 2;
                const cy = (isMobile ? 110 : 170);
                return (
                  <g key={t.name}>
                    <line
                      x1={cx + pos1.x}
                      y1={cy + pos1.y}
                      x2={cx + pos2.x}
                      y2={cy + pos2.y}
                      stroke={CATEGORY_COLORS[hoveredTech.category]}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.25"
                    />
                    <circle
                      cx={cx + pos2.x}
                      cy={cy + pos2.y}
                      r="2"
                      fill={CATEGORY_COLORS[hoveredTech.category]}
                      opacity="0.4"
                    />
                  </g>
                );
              })}
          </svg>
        </div>
      </div>
    </section>
  );
}
