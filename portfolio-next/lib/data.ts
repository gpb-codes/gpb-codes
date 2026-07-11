import skillsData from '@/data/skills.json';
import experienceData from '@/data/experience.json';
import testimonialsData from '@/data/testimonials.json';
import heroData from '@/data/hero.json';
import aboutData from '@/data/about.json';
import contactData from '@/data/contact.json';
import socialsData from '@/data/socials.json';
import type { Lang } from './translations';

export interface SkillItem {
  name: string;
  icon: string;
  desc: { en: string; es: string };
}

export interface SkillCategory {
  categoryKey: string;
  label: { en: string; es: string };
  icon: string;
  items: SkillItem[];
}

export interface Experience {
  period: { en: string; es: string };
  role: { en: string; es: string };
  company: { en: string; es: string };
  desc: { en: string; es: string };
  tags?: string[];
}

export interface Testimonial {
  quote: { en: string; es: string };
  author: string;
  role: { en: string; es: string };
}

export interface HeroData {
  stack: { name: string; src: string }[];
  name: string;
  desc: { en: string; es: string };
}

export interface AboutData {
  location: string;
  focus: { en: string[]; es: string[] };
  values: { en: string[]; es: string[] };
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  email: string;
  whatsapp: string;
}

export const skills: SkillCategory[] = skillsData as SkillCategory[];
export const experience: Experience[] = experienceData as Experience[];
export const testimonials: Testimonial[] = testimonialsData as Testimonial[];
export const hero: HeroData = heroData as HeroData;
export const about: AboutData = aboutData as AboutData;
export const contactLinks: ContactLink[] = contactData as ContactLink[];
export const socials: Socials = socialsData as Socials;

export function getLocalized(data: { en: string; es: string }, lang: Lang): string {
  return data[lang] ?? data.en;
}

export function getLocalizedArray(data: { en: string[]; es: string[] }, lang: Lang): string[] {
  return data[lang] ?? data.en;
}
