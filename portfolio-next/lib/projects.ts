export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string[];
  category: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'A.XIS',
    description: 'Plataforma de gestion de tareas conectada con Obsidian. Transformar notas, proyectos y tareas en un sistema centralizado de ejecucion personal y profesional.',
    link: 'https://github.com/gpb-codes/axis',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS'],
    category: 'fullstack',
    featured: true,
  },
  {
    id: 2,
    title: 'DevSactum',
    description: 'Sistema de gestion de conocimiento tecnico para desarrolladores. Convertir documentacion, aprendizaje y experiencia tecnica en conocimiento reutilizable y escalable.',
    link: 'https://github.com/gpb-codes/devsactum',
    tags: ['React', 'FastAPI', 'PostgreSQL'],
    category: 'ai',
    featured: true,
  },
  {
    id: 3,
    title: 'Forge',
    description: 'Workspace inteligente para desarrolladores y creadores. Centralizar proyectos, documentacion, automatizacion y agentes IA en una unica plataforma.',
    link: 'https://github.com/gpb-codes/forge',
    tags: ['Next.js', 'PostgreSQL', 'RAG', 'Agentes IA'],
    category: 'fullstack',
    featured: false,
  },
  {
    id: 4,
    title: 'Drakkar Labs',
    description: 'Laboratorio de desarrollo donde diseno y construyo productos enfocados en productividad, automatizacion, IA y herramientas para desarrolladores.',
    link: 'https://github.com/gpb-codes',
    tags: ['TypeScript', 'AI', 'DevOps'],
    category: 'devops',
    featured: false,
  },
];

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
