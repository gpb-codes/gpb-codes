import { query } from './db';

export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string;
  category: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const table = 'projects';

export async function getAllProjects(): Promise<Project[]> {
  return (await query(`SELECT * FROM ${table} ORDER BY featured DESC, created_at DESC`)) as Project[];
}

export async function getProjectById(id: number): Promise<Project | null> {
  const rows = (await query(`SELECT * FROM ${table} WHERE id = ?`, [id])) as Project[];
  return rows[0] || null;
}

export async function createProject(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { title, description, link, tags, category, featured } = data;
  const res = await query(
    `INSERT INTO ${table} (title, description, link, tags, category, featured) VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, link, tags, category, featured ?? false]
  );
  return res;
}

export async function updateProject(id: number, data: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) {
  const fields = Object.keys(data);
  if (!fields.length) return;
  const set = fields.map((f) => `${f} = ?`).join(', ');
  const values = fields.map((f) => (data as any)[f]);
  await query(`UPDATE ${table} SET ${set} WHERE id = ?`, [...values, id]);
}

export async function deleteProject(id: number) {
  await query(`DELETE FROM ${table} WHERE id = ?`, [id]);
}
