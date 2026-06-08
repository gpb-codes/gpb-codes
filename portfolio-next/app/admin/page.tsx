'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: number; title: string; description: string; link: string; tags: string; category: string; featured: boolean; created_at: string;
}

interface Post {
  id: number; title_en: string; title_es: string; content_en: string; content_es: string; excerpt_en: string; excerpt_es: string; slug: string; published: boolean; created_at: string;
}

const EMPTY_PROJECT = { title: '', description: '', link: '', tags: '', category: 'fullstack', featured: false };
const EMPTY_POST = { title_en: '', title_es: '', content_en: '', content_es: '', excerpt_en: '', excerpt_es: '', slug: '', published: true };

const ADMIN_PW = 'admin123';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'projects' | 'posts'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pf, setPf] = useState(EMPTY_PROJECT);
  const [po, setPo] = useState(EMPTY_POST);
  const [editingP, setEditingP] = useState<number | null>(null);
  const [editingPo, setEditingPo] = useState<number | null>(null);
  const [msg, setMsg] = useState('');

  const fetchProjects = async () => { try { const r = await fetch('/api/projects'); setProjects(await r.json()); } catch { setMsg('Error fetching projects'); } };
  const fetchPosts = async () => { try { const r = await fetch('/api/posts'); setPosts(await r.json()); } catch { setMsg('Error fetching posts'); } };

  useEffect(() => { if (authed) { fetchProjects(); fetchPosts(); } }, [authed]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PW) setAuthed(true);
    else setMsg('Wrong password');
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pf.title) { setMsg('Title required'); return; }
    try {
      const method = editingP ? 'PUT' : 'POST';
      const url = editingP ? `/api/projects/${editingP}` : '/api/projects';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pf) });
      const d = await res.json();
      if (d.error) { setMsg(d.error); return; }
      setPf(EMPTY_PROJECT); setEditingP(null); setMsg(editingP ? 'Project updated!' : 'Project created!'); fetchProjects();
    } catch { setMsg('Error'); }
  };

  const editProject = (p: Project) => {
    setPf({ title: p.title, description: p.description, link: p.link, tags: p.tags, category: p.category, featured: p.featured });
    setEditingP(p.id); setTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setMsg('Project deleted'); fetchProjects();
  };

  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!po.title_en || !po.slug) { setMsg('Title (EN) and slug required'); return; }
    try {
      const method = editingPo ? 'PUT' : 'POST';
      const url = editingPo ? `/api/posts/${editingPo}` : '/api/posts';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(po) });
      const d = await res.json();
      if (d.error) { setMsg(d.error); return; }
      setPo(EMPTY_POST); setEditingPo(null); setMsg(editingPo ? 'Post updated!' : 'Post created!'); fetchPosts();
    } catch { setMsg('Error'); }
  };

  const editPost = (p: Post) => {
    setPo({ title_en: p.title_en, title_es: p.title_es, content_en: p.content_en, content_es: p.content_es, excerpt_en: p.excerpt_en, excerpt_es: p.excerpt_es, slug: p.slug, published: p.published });
    setEditingPo(p.id); setTab('posts'); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletePost = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setMsg('Post deleted'); fetchPosts();
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <form onSubmit={login} className="bg-[#12121a] border border-neutral-800 rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-xs text-neutral-500 mb-6">Enter password to manage</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 mb-4 focus:outline-none focus:border-[#6366f1]" />
          <button className="w-full btn-primary justify-center">Login</button>
          {msg && <p className="text-red-400 text-xs mt-3">{msg}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Manage</h1>
          <a href="/" className="text-xs text-neutral-500 hover:text-[#6366f1] transition-colors">View site</a>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('projects')} className={`px-5 py-2 text-xs font-medium rounded-xl transition-all ${tab === 'projects' ? 'bg-white text-[#1a1a2e]' : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700'}`}>Projects</button>
          <button onClick={() => setTab('posts')} className={`px-5 py-2 text-xs font-medium rounded-xl transition-all ${tab === 'posts' ? 'bg-white text-[#1a1a2e]' : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700'}`}>Blog Posts</button>
        </div>

        {tab === 'projects' && (
          <>
            <form onSubmit={saveProject} className="bg-[#12121a] border border-neutral-800 rounded-2xl p-6 mb-8 space-y-4">
              <h2 className="text-sm font-semibold text-neutral-300">{editingP ? 'Edit Project' : 'New Project'}</h2>
              <input value={pf.title} onChange={(e) => setPf({ ...pf, title: e.target.value })} placeholder="Project title *" className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]" />
              <textarea value={pf.description} onChange={(e) => setPf({ ...pf, description: e.target.value })} placeholder="Description" rows={3} className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1] resize-none" />
              <input value={pf.link} onChange={(e) => setPf({ ...pf, link: e.target.value })} placeholder="Project URL" className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]" />
              <input value={pf.tags} onChange={(e) => setPf({ ...pf, tags: e.target.value })} placeholder="Tags (comma-separated, e.g. Next.js, MySQL, AI)" className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]" />
              <div className="flex gap-4 items-center">
                <select value={pf.category} onChange={(e) => setPf({ ...pf, category: e.target.value })} className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#6366f1]">
                  <option value="fullstack">Full Stack</option><option value="ai">AI</option><option value="frontend">Frontend</option><option value="devops">DevOps</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
                  <input type="checkbox" checked={pf.featured} onChange={(e) => setPf({ ...pf, featured: e.target.checked })} className="accent-[#6366f1]" /> Featured
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="btn-primary text-xs">Save</button>
                {editingP && <button type="button" onClick={() => { setPf(EMPTY_PROJECT); setEditingP(null); }} className="btn-outline text-xs">Cancel</button>}
              </div>
            </form>
            <div className="space-y-3">
              {projects.length === 0 && <p className="text-sm text-neutral-500">No projects yet.</p>}
              {projects.map((p) => (
                <div key={p.id} className="bg-[#12121a] border border-neutral-800 rounded-xl p-5 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm truncate">{p.title}</h3>
                      {p.featured && <span className="text-[10px] px-2 py-0.5 bg-[#6366f1]/10 text-[#6366f1] rounded-full">Featured</span>}
                      <span className="text-[10px] text-neutral-500 px-2 py-0.5 bg-neutral-800 rounded-full">{p.category}</span>
                    </div>
                    {p.description && <p className="text-xs text-neutral-400 line-clamp-2 mb-2">{p.description}</p>}
                    <div className="flex flex-wrap gap-1">{p.tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (<span key={t} className="text-[10px] text-neutral-500 bg-neutral-800/50 px-2 py-0.5 rounded-full">{t}</span>))}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => editProject(p)} className="px-3 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">Edit</button>
                    <button onClick={() => deleteProject(p.id)} className="px-3 py-1.5 text-xs bg-red-900/30 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'posts' && (
          <>
            <form onSubmit={savePost} className="bg-[#12121a] border border-neutral-800 rounded-2xl p-6 mb-8 space-y-4">
              <h2 className="text-sm font-semibold text-neutral-300">{editingPo ? 'Edit Post' : 'New Post'}</h2>
              <div className="flex gap-3">
                <input value={po.title_en} onChange={(e) => setPo({ ...po, title_en: e.target.value })} placeholder="Title (EN) *" className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]" />
                <input value={po.title_es} onChange={(e) => setPo({ ...po, title_es: e.target.value })} placeholder="Title (ES)" className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]" />
              </div>
              <input value={po.slug} onChange={(e) => setPo({ ...po, slug: e.target.value })} placeholder="Slug (e.g. my-first-post)" className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]" />
              <div className="flex gap-3">
                <input value={po.excerpt_en} onChange={(e) => setPo({ ...po, excerpt_en: e.target.value })} placeholder="Excerpt (EN)" className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]" />
                <input value={po.excerpt_es} onChange={(e) => setPo({ ...po, excerpt_es: e.target.value })} placeholder="Excerpt (ES)" className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]" />
              </div>
              <textarea value={po.content_en} onChange={(e) => setPo({ ...po, content_en: e.target.value })} placeholder="Content (EN)" rows={6} className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1] resize-none font-mono text-xs" />
              <textarea value={po.content_es} onChange={(e) => setPo({ ...po, content_es: e.target.value })} placeholder="Content (ES)" rows={6} className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#6366f1] resize-none font-mono text-xs" />
              <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
                <input type="checkbox" checked={po.published} onChange={(e) => setPo({ ...po, published: e.target.checked })} className="accent-[#6366f1]" /> Published
              </label>
              <div className="flex gap-3 pt-2">
                <button className="btn-primary text-xs">Save</button>
                {editingPo && <button type="button" onClick={() => { setPo(EMPTY_POST); setEditingPo(null); }} className="btn-outline text-xs">Cancel</button>}
              </div>
              {msg && <p className="text-xs text-neutral-400">{msg}</p>}
            </form>
            <div className="space-y-3">
              {posts.length === 0 && <p className="text-sm text-neutral-500">No posts yet.</p>}
              {posts.map((p) => (
                <div key={p.id} className="bg-[#12121a] border border-neutral-800 rounded-xl p-5 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm truncate">{p.title_en}</h3>
                      {!p.published && <span className="text-[10px] px-2 py-0.5 bg-yellow-900/30 text-yellow-400 rounded-full">Draft</span>}
                    </div>
                    <p className="text-xs text-neutral-400 truncate">/{p.slug}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => editPost(p)} className="px-3 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">Edit</button>
                    <button onClick={() => deletePost(p.id)} className="px-3 py-1.5 text-xs bg-red-900/30 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
