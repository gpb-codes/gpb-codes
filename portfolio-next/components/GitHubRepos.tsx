'use client';

import { useState, useEffect } from 'react';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: { message: string; sha: string }[];
    action?: string;
    ref?: string;
    ref_type?: string;
  };
  created_at: string;
}

const GITHUB_USERNAME = 'gpb-codes';
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Go: '#00ADD8',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

export default function GitHubRepos() {
  const { lang } = useLang();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'repos' | 'activity'>('repos');

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=8&sort=updated&direction=desc`)
        .then((r) => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=10`)
        .then((r) => r.json()),
    ])
      .then(([reposData, eventsData]) => {
        if (Array.isArray(reposData)) {
          setRepos(reposData.filter((r: GitHubRepo) => !r.fork).slice(0, 6));
        }
        if (Array.isArray(eventsData)) {
          setEvents(eventsData.filter((e: GitHubEvent) => ['PushEvent', 'CreateEvent', 'PullRequestEvent'].includes(e.type)).slice(0, 5));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return lang === 'en' ? 'today' : 'hoy';
    if (days === 1) return lang === 'en' ? 'yesterday' : 'ayer';
    if (days < 30) return `${days}d`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo`;
    return `${Math.floor(months / 12)}y`;
  }

  function getEventText(event: GitHubEvent): string {
    const repoName = event.repo.name.replace(`${GITHUB_USERNAME}/`, '');
    switch (event.type) {
      case 'PushEvent': {
        const count = event.payload.commits?.length ?? 0;
        return lang === 'en'
          ? `Pushed ${count} commit${count > 1 ? 's' : ''} to ${repoName}`
          : `Push de ${count} commit${count > 1 ? 's' : ''} a ${repoName}`;
      }
      case 'CreateEvent':
        return lang === 'en'
          ? `Created ${event.payload.ref_type} ${event.payload.ref || ''} in ${repoName}`
          : `Creo ${event.payload.ref_type} ${event.payload.ref || ''} en ${repoName}`;
      case 'PullRequestEvent':
        return lang === 'en'
          ? `${event.payload.action} a pull request in ${repoName}`
          : `${event.payload.action} un pull request en ${repoName}`;
      default:
        return event.type;
    }
  }

  return (
    <section id="github" className="py-20 md:py-28">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">GitHub</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Open source & activity' : 'Open source y actividad'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-8" />
        </AnimeWrapper>

        <div className="flex gap-2 mb-5 md:mb-8">
          {(['repos', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#6366f1] text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {tab === 'repos' ? (lang === 'en' ? 'Repos' : 'Repositorios') : (lang === 'en' ? 'Activity' : 'Actividad')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-3" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3 mb-4" />
                <div className="flex gap-2">
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded-full w-16" />
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded-full w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'repos' ? (
          <div className="grid md:grid-cols-2 gap-4">
            {repos.map((repo, i) => (
              <AnimeWrapper key={repo.id} delay={i * 60} type="stagger">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block card hover:border-[#6366f1]/30 dark:hover:border-[#6366f1]/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white group-hover:text-[#6366f1] transition-colors">
                      {repo.name}
                    </h3>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-neutral-400 group-hover:text-[#6366f1] transition-colors mt-0.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  {repo.description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2 leading-relaxed">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: LANG_COLORS[repo.language] || '#6b7280' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/></svg>
                        {repo.forks_count}
                      </span>
                    )}
                    <span className="text-xs text-neutral-400 dark:text-neutral-600 ml-auto">
                      {timeAgo(repo.updated_at)}
                    </span>
                  </div>
                  {repo.topics.length > 0 && (
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span key={topic} className="tag text-[10px]">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </AnimeWrapper>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, i) => (
              <AnimeWrapper key={`${event.type}-${event.created_at}-${i}`} delay={i * 50} type="stagger">
                <div className="card flex items-center gap-4 py-4">
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    event.type === 'PushEvent' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : event.type === 'CreateEvent' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  }`}>
                    {event.type === 'PushEvent' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    ) : event.type === 'CreateEvent' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 truncate">
                      {getEventText(event)}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-0.5">
                      {timeAgo(event.created_at)}
                    </p>
                  </div>
                </div>
              </AnimeWrapper>
            ))}
          </div>
        )}

        <AnimeWrapper delay={200}>
          <div className="mt-8 text-center">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="16" height="16" alt="GitHub" className="dark:invert" />
              {lang === 'en' ? 'View all on GitHub' : 'Ver todo en GitHub'}
            </a>
          </div>
        </AnimeWrapper>
      </div>
    </section>
  );
}
