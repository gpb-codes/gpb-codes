import { query } from './db';

export interface Post {
  id: number;
  title_en: string;
  title_es: string;
  content_en: string;
  content_es: string;
  excerpt_en: string;
  excerpt_es: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAllPosts(): Promise<Post[]> {
  return (await query('SELECT * FROM blog_posts ORDER BY created_at DESC')) as Post[];
}

export async function getPublishedPosts(): Promise<Post[]> {
  return (await query('SELECT * FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC')) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = (await query('SELECT * FROM blog_posts WHERE slug = ?', [slug])) as Post[];
  return rows[0] || null;
}

export async function getPostById(id: number): Promise<Post | null> {
  const rows = (await query('SELECT * FROM blog_posts WHERE id = ?', [id])) as Post[];
  return rows[0] || null;
}

export async function createPost(data: {
  title_en: string;
  title_es: string;
  content_en: string;
  content_es: string;
  excerpt_en: string;
  excerpt_es: string;
  slug: string;
  published: boolean;
}) {
  return await query(
    `INSERT INTO blog_posts (title_en, title_es, content_en, content_es, excerpt_en, excerpt_es, slug, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.title_en, data.title_es, data.content_en, data.content_es, data.excerpt_en, data.excerpt_es, data.slug, data.published]
  );
}

export async function updatePost(id: number, data: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>) {
  const fields = Object.keys(data);
  if (!fields.length) return;
  const set = fields.map((f) => `${f} = ?`).join(', ');
  const values = fields.map((f) => (data as any)[f]);
  await query(`UPDATE blog_posts SET ${set} WHERE id = ?`, [...values, id]);
}

export async function deletePost(id: number) {
  await query('DELETE FROM blog_posts WHERE id = ?', [id]);
}
