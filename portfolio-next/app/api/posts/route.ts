import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getPublishedPosts, getPostBySlug, createPost } from '@/lib/posts';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(post);
    }
    const published = searchParams.get('published');
    const data = published === 'true' ? await getPublishedPosts() : await getAllPosts();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title_en || !body.slug) {
      return NextResponse.json({ error: 'title_en and slug are required' }, { status: 400 });
    }
    await createPost({
      title_en: body.title_en,
      title_es: body.title_es || '',
      content_en: body.content_en || '',
      content_es: body.content_es || '',
      excerpt_en: body.excerpt_en || '',
      excerpt_es: body.excerpt_es || '',
      slug: body.slug,
      published: body.published ?? true,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
