'use client';

import { useState, useEffect, useRef } from 'react';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

interface GitHubRepo {
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  Go: '#00add8',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  'C++': '#f34b7d',
  C: '#555555',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4f5d95',
  Swift: '#ffac45',
  Kotlin: '#a97bff',
  Dart: '#00b4ab',
  Lua: '#000080',
  SQL: '#e38c00',
  Markdown: '#083fa1',
};

function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function GitHubStats() {
  const { lang } = useLang();
  const [stats, setStats] = useState<GitHubUser | null>(null);
  const [langMap, setLangMap] = useState<Record<string, number>>({});
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/gpb-codes'),
          fetch('https://api.github.com/users/gpb-codes/repos?per_page=100&sort=updated'),
        ]);

        if (userRes.ok) {
          const user: GitHubUser = await userRes.json();
          setStats(user);
        }

        if (reposRes.ok) {
          const repos: GitHubRepo[] = await reposRes.json();
          const langs: Record<string, number> = {};
          let stars = 0;
          let forks = 0;

          repos.forEach((repo) => {
            if (!repo.fork) {
              stars += repo.stargazers_count;
              forks += repo.forks_count;
              if (repo.language) {
                langs[repo.language] = (langs[repo.language] || 0) + 1;
              }
            }
          });

          setLangMap(langs);
          setTotalStars(stars);
          setTotalForks(forks);
        }
      } catch {
        // API error — silently ignore
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const accountAge = stats
    ? Math.floor(
        (Date.now() - new Date(stats.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
      )
    : 0;

  const totalLangRepos = Object.values(langMap).reduce((a, b) => a + b, 0);
  const sortedLangs = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const statCards = [
    {
      label: t.github?.repos?.[lang] ?? 'Repos',
      value: stats?.public_repos ?? 0,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
    },
    {
      label: t.github?.stars?.[lang] ?? 'Stars',
      value: totalStars,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.935.15 1.313.917 1.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      label: t.github?.forks?.[lang] ?? 'Forks',
      value: totalForks,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      ),
    },
    {
      label: t.github?.followers?.[lang] ?? 'Followers',
      value: stats?.followers ?? 0,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-5 animate-pulse">
                <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-3" />
                <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-16 mb-2" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{t.github?.label?.[lang] ?? 'GitHub'}</p>
          <h2 className="section-title">
            {t.github?.title?.[lang] ?? 'GitHub Stats'}
          </h2>
          <div className="w-16 h-1 bg-[#6366f1] rounded-full mt-3 mb-8" />
        </AnimeWrapper>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <AnimeWrapper key={i} delay={i * 80}>
              <div className="card p-5 text-center group hover:border-[#6366f1]/30 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#6366f1]/10 text-[#6366f1] mb-3 group-hover:bg-[#6366f1]/20 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {stat.label}
                </div>
              </div>
            </AnimeWrapper>
          ))}
        </div>

        {sortedLangs.length > 0 && (
          <AnimeWrapper delay={200}>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {t.github?.languages?.[lang] ?? 'Languages'}
              </h3>

              <div className="w-full h-3 rounded-full overflow-hidden flex bg-neutral-100 dark:bg-neutral-800 mb-5">
                {sortedLangs.map(([lang, count]) => {
                  const pct = (count / totalLangRepos) * 100;
                  const color = LANGUAGE_COLORS[lang] || '#6b7280';
                  return (
                    <div
                      key={lang}
                      className="h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                      title={`${lang}: ${pct.toFixed(0)}%`}
                    />
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                {sortedLangs.map(([lang, count]) => {
                  const pct = (count / totalLangRepos) * 100;
                  const color = LANGUAGE_COLORS[lang] || '#6b7280';
                  return (
                    <div key={lang} className="flex items-center gap-2 text-sm">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-neutral-700 dark:text-neutral-300">{lang}</span>
                      <span className="text-neutral-400 dark:text-neutral-500">
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimeWrapper>
        )}

        {accountAge > 0 && (
          <AnimeWrapper delay={300}>
            <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-500">
              {lang === 'en'
                ? `GitHub member for ${accountAge} years`
                : `Miembro de GitHub por ${accountAge} años`}
            </div>
          </AnimeWrapper>
        )}
      </div>
    </section>
  );
}
