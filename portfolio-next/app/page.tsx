import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false });
const BackgroundLayer = dynamic(() => import('@/components/BackgroundLayer'), { ssr: false });
const WhatsAppChat = dynamic(() => import('@/components/WhatsAppChat'), { ssr: false });
const GitHubRepos = dynamic(() => import('@/components/GitHubRepos'), { ssr: false });
const GitHubStats = dynamic(() => import('@/components/GitHubStats'), { ssr: false });
const InteractiveStack = dynamic(() => import('@/components/InteractiveStack'), { ssr: false });
const CertificationsSection = dynamic(() => import('@/components/CertificationsSection'), { ssr: false });
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <BackgroundLayer />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <InteractiveStack />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <GitHubRepos />
        <GitHubStats />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppChat />
      <ScrollToTop />
    </>
  );
}
