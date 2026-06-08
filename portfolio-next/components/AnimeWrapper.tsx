'use client';

import { useEffect, useRef, ReactNode } from 'react';
import anime from 'animejs';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: 'fade' | 'slide' | 'scale' | 'stagger';
}

export default function AnimeWrapper({ children, className, delay = 0, type = 'slide' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '0';

          const props: Record<string, any> = {
            targets: el,
            opacity: [0, 1],
            duration: 800,
            delay,
            easing: 'easeOutExpo',
          };

          if (type === 'slide') props.translateY = [30, 0];
          else if (type === 'scale') props.scale = [0.95, 1];
          else if (type === 'stagger') {
            props.translateY = [20, 0];
            props.delay = anime.stagger(60, { start: delay });
          }

          anime(props);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, type]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0, willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}
