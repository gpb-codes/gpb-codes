'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimeWrapper from './AnimeWrapper';
import { useLang } from '@/context/LanguageContext';

interface Post {
  id: number;
  title_en: string;
  title_es: string;
  excerpt_en: string;
  excerpt_es: string;
  slug: string;
  created_at: string;
}

export default function BlogPreviewSection() {
  const { lang } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts?published=true')
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => {});
  }, []);

  if (!posts.length) return null;

  const formatDate = (s: string) => {
    try { return new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CL', { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch { return s; }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container-main">
        <AnimeWrapper>
          <p className="section-label">{lang === 'en' ? 'Blog' : 'Blog'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Latest posts' : 'Ultimos articulos'}<span className="text-[#6366f1]">.</span>
          </h2>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4 mb-10" />
        </AnimeWrapper>

        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <AnimeWrapper key={post.id} delay={100 + i * 100}>
              <Link href={`/blog/${post.slug}`} className="card block card-hover h-full">
                <p className="text-[11px] text-neutral-400 font-mono mb-2">{formatDate(post.created_at)}</p>
                <h3 className="font-semibold text-[#1a1a2e] dark:text-white mb-2">
                  {lang === 'en' ? post.title_en : (post.title_es || post.title_en)}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                  {lang === 'en' ? (post.excerpt_en || post.excerpt_es) : (post.excerpt_es || post.excerpt_en)}
                </p>
              </Link>
            </AnimeWrapper>
          ))}
        </div>

        <AnimeWrapper delay={200}>
          <div className="text-center mt-8">
            <Link href="/blog" className="btn-outline text-xs">
              {lang === 'en' ? 'View all posts' : 'Ver todos los articulos'}
            </Link>
          </div>
        </AnimeWrapper>
      </div>
    </section>
  );
}
