'use client';

import { useState, useRef, useEffect } from 'react';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';

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

const ORBIT_SIZES: Record<number, number> = {
  1: 140,
  2: 230,
  3: 310,
};

const ORBIT_SPEEDS: Record<number, number> = {
  1: 60,
  2: 45,
  3: 30,
};

export default function InteractiveStack() {
  const { lang } = useLang();
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Map<number, { x: number; y: number }>>(new Map());

  useEffect(() => {
    let raf: number;
    const animate = () => {
      if (!isPaused) {
        const now = Date.now();
        const newPositions = new Map<number, { x: number; y: number }>();
        TECH_ORBIT.forEach((tech) => {
          const radius = ORBIT_SIZES[tech.orbit];
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
  }, [isPaused]);

  const filteredTech = selectedCategory
    ? TECH_ORBIT.filter((t) => t.category === selectedCategory)
    : TECH_ORBIT;

  return (
    <section id="stack" className="py-20 md:py-28 bg-neutral-50/50 dark:bg-[#0d0d14]/50">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{lang === 'en' ? 'Tech Stack' : 'Stack Tecnologico'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Tools I use.' : 'Herramientas que uso.'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-8" />
        </AnimeWrapper>

        <AnimeWrapper delay={100}>
          <div className="flex flex-wrap gap-2 mb-10">
            {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'border-transparent text-white'
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
                }`}
                style={selectedCategory === cat ? { backgroundColor: color } : {}}
              >
                {cat === 'backend' ? 'Backend' : cat === 'frontend' ? 'Frontend' : cat === 'data' ? 'Data & AI' : 'DevOps'}
              </button>
            ))}
          </div>
        </AnimeWrapper>

        <div className="relative mx-auto" style={{ maxWidth: 680 }}>
          <div
            ref={containerRef}
            className="relative mx-auto cursor-crosshair"
            style={{ width: 680, height: 340 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => { setIsPaused(false); setHoveredTech(null); }}
          >
            {/* Orbit rings */}
            {[1, 2, 3].map((orbit) => (
              <div
                key={orbit}
                className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-neutral-200 dark:border-neutral-800"
                style={{
                  width: ORBIT_SIZES[orbit] * 2,
                  height: ORBIT_SIZES[orbit] * 0.8,
                  marginLeft: -ORBIT_SIZES[orbit],
                  marginTop: -ORBIT_SIZES[orbit] * 0.4,
                  opacity: selectedCategory ? 0.3 : 0.6,
                  transition: 'opacity 0.3s',
                }}
              />
            ))}

            {/* Center core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#6366f1]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
            </div>

            {/* Tech nodes */}
            {filteredTech.map((tech) => {
              const key = tech.angle + tech.orbit * 1000;
              const pos = positions.get(key);
              if (!pos) return null;

              return (
                <div
                  key={`${tech.name}-${tech.orbit}-${tech.angle}`}
                  className={`absolute z-20 transition-all duration-300 ${
                    hoveredTech && hoveredTech.name !== tech.name ? 'opacity-20 scale-90' : 'opacity-100'
                  } ${selectedCategory && tech.category !== selectedCategory ? 'opacity-10 scale-75' : ''}`}
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'left, top',
                  }}
                >
                  <button
                    className="group relative"
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <div
                      className="w-11 h-11 md:w-13 md:h-13 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        backgroundColor: `${tech.color}15`,
                        boxShadow: hoveredTech?.name === tech.name ? `0 0 20px ${tech.color}30` : 'none',
                      }}
                    >
                      <img src={tech.icon} alt={tech.name} width={24} height={24} className="pointer-events-none" />
                    </div>
                    {hoveredTech?.name === tech.name && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1a1a2e] dark:bg-white text-white dark:text-[#1a1a2e] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl z-30">
                        {tech.name}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a2e] dark:bg-white rotate-45" />
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

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
                return (
                  <line
                    key={t.name}
                    x1={`calc(50% + ${pos1.x}px)`}
                    y1={`calc(50% + ${pos1.y}px)`}
                    x2={`calc(50% + ${pos2.x}px)`}
                    y2={`calc(50% + ${pos2.y}px)`}
                    stroke={CATEGORY_COLORS[hoveredTech.category]}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                );
              })}
          </svg>
        </div>
      </div>
    </section>
  );
}
