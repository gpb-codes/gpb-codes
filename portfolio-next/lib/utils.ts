export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export const WHATSAPP_NUMBER = '+56942544486';

export const FAQS = [
  {
    q: '¿Que tecnologias usas principalmente?',
    a: 'NestJS, Next.js, Go, TailwindCSS y MySQL.',
  },
  {
    q: '¿Tienes experiencia con inteligencia artificial?',
    a: 'Si, desarrollo agentes IA, sistemas RAG e integraciones con modelos locales y APIs.',
  },
  {
    q: '¿Aceptas proyectos freelance?',
    a: 'Si, estoy abierto a proyectos freelance y colaboraciones.',
  },
  {
    q: '¿Cual es tu disponibilidad horaria?',
    a: 'Trabajo en horario flexible, usualmente en horario GMT-3.',
  },
  {
    q: '¿Tienes experiencia en startups?',
    a: 'Si, he trabajado construyendo productos desde cero en entornos startup.',
  },
  {
    q: '¿Que proyectos has desarrollado?',
    a: 'He creado herramientas de productividad, asistentes IA, automatizaciones y SaaS experimentales.',
  },
];
