'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

interface Post {
  id: number;
  title_en: string;
  title_es: string;
  content_en: string;
  content_es: string;
  slug: string;
  created_at: string;
}

export default function PostPage() {
  const { lang } = useLang();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => setPost(data?.id ? data : null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#6366f1]/30 border-t-[#6366f1] rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0f] flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-500">{lang === 'en' ? 'Post not found' : 'Articulo no encontrado'}</p>
        <Link href="/blog" className="text-sm text-[#6366f1] hover:underline">&larr; {lang === 'en' ? 'Back to blog' : 'Volver al blog'}</Link>
      </div>
    );
  }

  const formatDate = (s: string) => new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CL', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0f]">
      <div className="container-main py-24 md:py-32">
        <Link href="/blog" className="text-xs text-neutral-400 hover:text-[#6366f1] transition-colors font-mono mb-8 inline-block">
          &larr; {lang === 'en' ? 'Back to blog' : 'Volver al blog'}
        </Link>

        <article className="max-w-2xl">
          <p className="text-xs text-neutral-400 font-mono mb-3">
            {formatDate(post.created_at)}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a2e] dark:text-white mb-8">
            {lang === 'en' ? post.title_en : (post.title_es || post.title_en)}
          </h1>
          <div className="prose prose-sm dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
            {lang === 'en' ? post.content_en : (post.content_es || post.content_en)}
          </div>
        </article>
      </div>
    </div>
  );
}
