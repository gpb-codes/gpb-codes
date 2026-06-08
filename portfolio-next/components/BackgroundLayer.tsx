'use client';

import { useState, useEffect } from 'react';

const MINIO_URL = 'http://localhost:9000/portfolio/wallpaper.webp';

export default function BackgroundLayer() {
  const [src, setSrc] = useState<string>('/wallpaper.webp');

  useEffect(() => {
    const img = new Image();
    img.onload = () => setSrc(MINIO_URL);
    img.onerror = () => {};
    img.src = MINIO_URL;
  }, []);

  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.06,
      }}
    />
  );
}
