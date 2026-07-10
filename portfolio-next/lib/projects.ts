import projectsData from '@/data/projects.json';

export interface Project {
  id: number;
  title: string;
  description: string;
  descriptionEn?: string;
  link: string;
  repo?: string;
  image?: string;
  tags: string[];
  category: 'fullstack' | 'ai' | 'frontend' | 'backend' | 'devops' | 'mobile' | 'other';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'archived';
  startDate?: string;
  endDate?: string;
}

export const projects: Project[] = projectsData as Project[];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getCategories(): string[] {
  const cats = new Set(projects.map((p) => p.category));
  return ['all', ...Array.from(cats)];
}
