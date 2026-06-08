'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

interface Post {
  id: number;
  title_en: string;
  title_es: string;
  excerpt_en: string;
  excerpt_es: string;
  slug: string;
  published: boolean;
  created_at: string;
}

export default function BlogPage() {
  const { lang } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts?published=true')
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d) ? d : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (s: string) => new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0f]">
      <div className="container-main py-24 md:py-32">
        <Link href="/" className="text-xs text-neutral-400 hover:text-[#6366f1] transition-colors font-mono mb-8 inline-block">
          &larr; {lang === 'en' ? 'Back to home' : 'Volver al inicio'}
        </Link>

        <div className="mb-12">
          <p className="section-label">{lang === 'en' ? 'Blog' : 'Blog'}</p>
          <h1 className="section-title">
            {lang === 'en' ? 'Thoughts and insights' : 'Ideas y reflexiones'}<span className="text-[#6366f1]">.</span>
          </h1>
          <div className="h-1 w-12 bg-[#6366f1] rounded-full mt-4" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#6366f1]/30 border-t-[#6366f1] rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-sm text-neutral-500">{lang === 'en' ? 'No posts yet.' : 'Aun no hay articulos.'}</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card block card-hover"
              >
                <h2 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-2">
                  {lang === 'en' ? post.title_en : (post.title_es || post.title_en)}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
                  {lang === 'en' ? (post.excerpt_en || post.excerpt_es) : (post.excerpt_es || post.excerpt_en)}
                </p>
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span>{formatDate(post.created_at)}</span>
                  <span className="text-[#6366f1]">{lang === 'en' ? 'Read more' : 'Leer mas'} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
